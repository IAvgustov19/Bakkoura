import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Linking, Platform } from 'react-native'
import RN from '../../components/RN';
import { GiftedChat, MessageImage } from 'react-native-gifted-chat';
import { RootStackParamList } from '../../types/navigation';
import { APP_ROUTES } from '../../navigation/routes';
import { observer } from 'mobx-react-lite';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidingView';
import { Images } from '../../assets';
import CustomActions from './components/CustomActions';
import AudioPlayer from './components/AudioPlayer';
import LinearGradient from 'react-native-linear-gradient';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import CustomMessage from './components/CustomBubble';
import { PlatfromView } from '../../components/PlatformView/PlatfromView';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { db } from '../../config/firebase';
import moment from 'moment';
import FileViewer from 'react-native-file-viewer';
import { windowWidth } from '../../utils/styles';
import { COLORS } from '../../utils/colors';
import VideoPlayer from './components/VideoPlayer';
import { uploadAudioToStorage, uploadDocumentToStorage, uploadMediaToStorage } from '../../services/firestoreService';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import functions from '@react-native-firebase/functions';
import { Timestamp } from "firebase/firestore";
import MessageActionSheet from './components/MessageAction';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
import 'react-native-console-time-polyfill'
import Image from './components/Image';
import { StackNavigationProp } from '@react-navigation/stack';
import useKeepScrollPosition from './components/hook';


type DialogScreenRouteProp = RouteProp<RootStackParamList, typeof APP_ROUTES.DIALOG_SCREEN>;
type NavigationProp = StackNavigationProp<RootStackParamList, APP_ROUTES.PROFILE_PAGE>;

const DialogScreen = () => {
    const route = useRoute<DialogScreenRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { id, name, avatar } = route.params;
    const currentUser = auth().currentUser;
    const [messages, setMessages] = useState([]);

    const [lastSeen, setLastSeen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newMessages, setNewMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState<{ [key: string]: boolean }>({});
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [actionSheetVisible, setActionSheetVisible] = useState(false);
    const [chatOpenedAt, setChatOpenedAt] = useState(null);
    const [editingMessage, setEditingMessage] = useState(null);
    const [inputText, setInputText] = useState('');
    const [selectedEditMessage, setSelectedEditMessage] = useState(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [roomId, setRoomId] = useState(null);
    const [lastVisibleMessage, setLastVisibleMessage] = useState(null);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const [allMessagesFetched, setAllMessagesFetched] = useState(false);
    const { containerRef } = useKeepScrollPosition([messages]);
    // const containerRef = useRef(null);


    useEffect(() => {
        const chatOpenedAt = new Date();
        setChatOpenedAt(chatOpenedAt);
    }, []);


    const onLongPressMessage = (context, message) => {
        console.log('tadaaa', context);

        setSelectedMessage(message);
        setActionSheetVisible(true);
        console.log('Long pressed message:', message);
    };

    const onSelect = async (action) => {
        setActionSheetVisible(false);
        if (!selectedMessage) return;

        switch (action) {
            case 'delete':
                try {
                    setMessages((previousMessages) =>
                        previousMessages.filter((message) => message._id !== selectedMessage._id)
                    );
                    await db.collection('Messages').doc(selectedMessage._id).delete();

                    console.log('Message deleted successfully!');
                } catch (error) {
                    console.error('Error deleting message:', error);
                }
                break;
            case 'edit':
                try {
                    const filteredMessages = messages.filter((message) => message._id === selectedMessage._id);
                    if (filteredMessages.length > 0) {
                        setSelectedEditMessage(filteredMessages?.[0])
                        setEditingMessage(filteredMessages[0].text);
                        setInputText(filteredMessages[0].text)
                        setEditing(true);
                    } else {
                        console.warn('Message not found for editing');
                    }
                } catch (error) {
                    console.error('Error setting editing message:', error);
                }
                break;
            case 'answer':
                break;
            case 'pin':
                break;
            case 'send':
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        console.log('editing', editingMessage);
    }, [editingMessage])

    const onReaction = (reaction) => {
        if (!selectedMessage) return;

        setMessages((previousMessages) =>
            previousMessages.map((message) =>
                message._id === selectedMessage._id
                    ? { ...message, reaction }
                    : message
            )
        );

        db.collection('Messages').doc(selectedMessage._id).update({
            reaction: reaction
        }).catch((error) => {
            console.error('Error updating reaction:', error);
        });
    };


    useEffect(() => {
        console.time('userRef');

        if (id && currentUser?.uid) {
            const userRef = db.collection('users').doc(currentUser?.uid);
            userRef.update({ openChatWith: id });

            return () => {
                userRef.update({ openChatWith: null });
            };
        }
        console.timeEnd('userRef');

    }, [id, currentUser?.uid]);

    useEffect(() => {
        console.time('deviceToken');

        const deviceToken = async () => {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            // console.log('tokentokentoken', token);

            const userDocRef = firestore().collection('users').doc(currentUser.uid);
            const userDoc = await userDocRef.get();
            const userData = userDoc.data();
            const existingTokens = userData?.deviceTokens || [];
            if (!existingTokens.includes(token)) {
                const updatedTokens = [...existingTokens, token];
                await userDocRef.update({
                    deviceTokens: updatedTokens,
                });
            }
        };
        deviceToken();
        console.timeEnd('deviceToken');

    }, []);

    async function sendNotification(tokens, title, body, senderId, chatId) {
        const sendNotification = functions().httpsCallable('sendNotification');
        try {
            const sendPromises = tokens.map(async (token) => {
                try {
                    const result = await sendNotification({
                        token: token,
                        title: title,
                        body: body,
                        senderId: senderId,
                        chatId: chatId,
                    });
                    return { token, success: true, result: result.data };
                } catch (error) {
                    return { token, success: false, error: error.message };
                }
            });
            const results = await Promise.all(sendPromises);
            results.forEach((result) => {
                if (result.success) {
                    // console.log(`Notification sent successfully to token ${result.token}:`, result.result);
                } else {
                    console.error(`Error sending notification to token ${result.token}:`, result.error);
                }
            });
        } catch (error) {
            console.error('Error sending notifications:', error);
        }
    }


    useEffect(() => {
        if (!id) {
            navigation.navigate(APP_ROUTES.MESSENGER as never);
            return;
        }
        const userRef = firestore().collection('users').doc(id);

        const unsubscribe = userRef.onSnapshot((snapshot) => {
            const userData = snapshot.data();
            if (userData?.lastSeen) {
                const lastSeenTimestamp = moment(userData.lastSeen.toDate());
                const now = moment();
                const isToday = lastSeenTimestamp.isSame(now, 'day');
                const isYesterday = lastSeenTimestamp.clone().add(1, 'day').isSame(now, 'day');
                let lastSeenFormatted;
                if (isToday) {
                    lastSeenFormatted = lastSeenTimestamp.format('HH:mm');
                } else if (isYesterday) {
                    lastSeenFormatted = lastSeenTimestamp.format('HH:mm');
                } else {
                    lastSeenFormatted = lastSeenTimestamp.format('MMMM DD, HH:mm');
                }
                const diffInMinutes = now.diff(lastSeenTimestamp, 'minutes');

                if (diffInMinutes < 2) {
                    setLastSeen('Online');
                } else if (diffInMinutes < 60) {
                    setLastSeen(`${diffInMinutes} minutes ago`);
                } else if (isToday) {
                    setLastSeen(`Today, ${lastSeenFormatted}`);
                } else if (isYesterday) {
                    setLastSeen(`Yesterday, ${lastSeenFormatted}`);
                } else {
                    setLastSeen(lastSeenFormatted);
                }
            } else {
                setLastSeen(null);
            }
        });
        return () => unsubscribe();
    }, [id]);


    // const fetchMessages = useCallback(async (roomId, startAfterDoc?) => {
    //     setLoading(true);

    //     let messagesQuery = db.collection('Messages')
    //         .where('roomId', '==', roomId)
    //         .orderBy('createdAt', 'desc')
    //         .limit(20);

    //     if (startAfterDoc) {
    //         messagesQuery = messagesQuery.startAfter(startAfterDoc);
    //     }

    //     try {
    //         const messagesSnapshot = await messagesQuery.get();

    //         if (!messagesSnapshot.empty) {
    //             const messagesArray = messagesSnapshot.docs.map(doc => {
    //                 const data = doc.data();
    //                 return {
    //                     _id: doc.id,
    //                     user: {
    //                         _id: data.senderId,
    //                         name: data.user?.name || 'Unknown',
    //                     },
    //                     text: data.text,
    //                     maindis: data.maindis,
    //                     audio: data.audio || null,
    //                     video: data.video || null,
    //                     images: data.image || [],
    //                     fileUri: data.fileUri || null,
    //                     createdAt: data.createdAt ? moment.utc(data.createdAt.toDate()).local().format('YYYY-MM-DD HH:mm:ss') : null,
    //                     senderId: data.senderId,
    //                     circle: data.circle || null,
    //                     fileName: data.fileName || null,
    //                     receiverId: data.receiverId,
    //                     roomId: data.roomId,
    //                     reaction: data.reaction || null,
    //                     read: data.read || false,
    //                 };
    //             });

    //             // Update the last visible document
    //             const lastVisible = messagesSnapshot.docs[messagesSnapshot.docs.length - 1];
    //             setLastVisibleMessage(lastVisible);
    //             setNewMessages(messagesArray)
    //             // Update messages state
    //             // setMessages(prevMessages => startAfterDoc ? [...prevMessages, ...messagesArray] : messagesArray);
    //             setMessages(prevMessages => startAfterDoc ? GiftedChat.prepend(prevMessages, messagesArray) : messagesArray);

    //         }
    //     } catch (error) {
    //         console.error('Error fetching messages:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);


    const fetchMessages = useCallback(async (roomId, startAfterDoc?) => {
        if (allMessagesFetched) return;
        setLoading(true);

        let messagesQuery = db.collection('Messages')
            .where('roomId', '==', roomId)
            .orderBy('createdAt', 'desc')
            .limit(20);

        if (startAfterDoc) {
            messagesQuery = messagesQuery.startAfter(startAfterDoc);
        }

        try {
            const messagesSnapshot = await messagesQuery.get();

            if (messagesSnapshot.empty) {
                setAllMessagesFetched(true);
                return;
            }

            if (!messagesSnapshot.empty) {
                const roomDoc = await db.collection('Rooms').doc(roomId).get();
                const chatOpenedAtForCurrentUser = roomDoc.data()?.chatOpenedAt[currentUser?.uid];

                const messagesArray = messagesSnapshot.docs.map(doc => {
                    const data = doc.data();
                    const messageCreatedAt = moment(data.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss');

                    // Update the read status if necessary
                    if (data.receiverId === currentUser?.uid && chatOpenedAtForCurrentUser && messageCreatedAt <= chatOpenedAtForCurrentUser) {
                        db.collection('Messages').doc(doc.id).update({ read: true });
                    }

                    return {
                        _id: doc.id,
                        user: {
                            _id: data.senderId,
                            name: data.user?.name || 'Unknown',
                        },
                        text: data.text,
                        maindis: data.maindis,
                        audio: data.audio || null,
                        video: data.video || null,
                        images: data.image || [],
                        fileUri: data.fileUri || null,
                        createdAt: data.createdAt ? moment.utc(data.createdAt.toDate()).local().format('YYYY-MM-DD HH:mm:ss') : null,
                        senderId: data.senderId,
                        circle: data.circle || null,
                        fileName: data.fileName || null,
                        receiverId: data.receiverId,
                        roomId: data.roomId,
                        reaction: data.reaction || null,
                        read: data.read || false,
                        type: data?.type,
                    };
                });

                // Update the last visible document
                const lastVisible = messagesSnapshot.docs[messagesSnapshot.docs.length - 1];
                setLastVisibleMessage(lastVisible);
                setNewMessages(messagesArray);
                setMessages(prevMessages => startAfterDoc ? GiftedChat.prepend(prevMessages, messagesArray) : messagesArray);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    }, [currentUser?.uid, allMessagesFetched]);



    useLayoutEffect(() => {
        setLoading(true);
        const senderId = currentUser?.uid;
        const receiverId = id;

        const roomQuery = db.collection('Rooms')
            .where('senderId', 'in', [senderId, receiverId])
            .where('receiverId', 'in', [senderId, receiverId])
            .limit(1);

        const updateChatOpenedAt = async () => {
            const currentTime = new Date();
            try {
                const roomDoc = await roomQuery.get();
                if (!roomDoc.empty) {
                    const roomId = roomDoc.docs[0].id;
                    setRoomId(roomId);
                    await db.collection('Rooms').doc(roomId).update({
                        [`chatOpenedAt.${senderId}`]: currentTime,
                    });
                    // Fetch initial messages
                    fetchMessages(roomId);
                }
            } catch (error) {
                console.error('Error updating chat opened time:', error);
            }
        };

        updateChatOpenedAt();

        const unsubscribe = roomQuery.onSnapshot(async (roomQuerySnapshot) => {
            if (!roomQuerySnapshot.empty) {
                const roomDoc = roomQuerySnapshot.docs[0];
                const roomId = roomDoc.id;
                // Fetch messages if the room exists
                fetchMessages(roomId);
            } else {
                console.log('No existing room found for the given sender and receiver.');
                setMessages([]);
                setLoading(false);
            }
        }, (error) => {
            console.error('Error fetching room:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id, currentUser.uid]);




    const handleLoadMoreMessages = () => {
        console.log('blablaabkakabakka', lastVisibleMessage);

        setIsFetchingMore(true);
        if (lastVisibleMessage && !loading) {
            fetchMessages(roomId, lastVisibleMessage);
        }

    };


    useLayoutEffect(() => {
        setLoading(true);
        const senderId = currentUser?.uid;
        const receiverId = id;

        const roomQuery = db.collection('Rooms')
            .where('senderId', 'in', [senderId, receiverId])
            .where('receiverId', 'in', [senderId, receiverId])
            .limit(1);

        const updateChatOpenedAt = async () => {
            const currentTime = new Date();
            const roomDoc = await roomQuery.get();
            if (!roomDoc.empty) {
                const roomId = roomDoc.docs[0].id;
                setRoomId(roomId);
                await db.collection('Rooms').doc(roomId).update({
                    [`chatOpenedAt.${senderId}`]: currentTime,
                });
            }
        };

        updateChatOpenedAt();

        const unsubscribe = roomQuery.onSnapshot(async (roomQuerySnapshot) => {
            if (!roomQuerySnapshot.empty) {
                const roomDoc = roomQuerySnapshot.docs[0];
                const roomId = roomDoc.id;

                const messagesQuery = db.collection('Messages')
                    .where('roomId', '==', roomId)
                    .orderBy('createdAt', 'desc')
                    .limit(10);

                messagesQuery.onSnapshot((messagesSnapshot) => {
                    const messagesArray = messagesSnapshot.docs.map((doc) => {
                        const data = doc.data();
                        const isLoading = data.audio || data.video;
                        setLoadingMessages(prev => ({ ...prev, [doc.id]: isLoading }));

                        return {
                            _id: doc.id,
                            user: {
                                _id: data.senderId,
                                name: data.user?.name || 'Unknown',
                            },
                            text: data.text,
                            maindis: data.maindis,
                            audio: data.audio ? data.audio : null,
                            video: data.video ? data.video : null,
                            images: data.image ? data.image : [],
                            fileUri: data.fileUri ? data?.fileUri : null,
                            createdAt: data?.createdAt ? moment.utc(data.createdAt.toDate()).local().format('YYYY-MM-DD HH:mm:ss') : null,
                            senderId: data.senderId,
                            circle: data?.circle ?? data?.circle,
                            fileName: data?.fileName ?? data?.fileName,
                            receiverId: data.receiverId,
                            roomId: data.roomId,
                            reaction: data?.reaction ? data?.reaction : null,
                            read: data?.read ? data?.read : false,
                        };
                    });

                    const updatedMessages = messagesArray.map(msg => {
                        if (!msg || !msg.user) {
                            console.warn('Message or user object is undefined', msg); // Log warning for easier debugging
                            return msg; // Skip this message if it's undefined or doesn't have a user
                        }
                    
                        const chatOpenedAtForCurrentUser = roomDoc?.data()?.chatOpenedAt?.[senderId]; // Check for existence
                    
                        if (msg.receiverId === currentUser?.uid && chatOpenedAtForCurrentUser && msg.createdAt <= moment(chatOpenedAtForCurrentUser.toDate()).format('YYYY-MM-DD HH:mm:ss')) {
                            db.collection('Messages').doc(msg._id).update({ read: true });
                        }
                    
                        return {
                            ...msg,
                            user: {
                                ...msg.user,
                                _id: msg.senderId === senderId ? senderId : msg.user._id,
                                name: msg.senderId === senderId ? 'Me' : msg.user.name,
                                reaction: msg.reaction || null, // Use `msg.reaction || null` to handle undefined reactions
                            },
                        };
                    });
                    setMessages(updatedMessages);
                    setLoading(false);
                }, (error) => {
                    console.error('Error fetching messages:', error);
                    setLoading(false);
                });
            } else {
                console.log('No existing room found for the given sender and receiver.');
                setMessages([]);
                setLoading(false);
            }
        }, (error) => {
            console.error('Error fetching room:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id, currentUser.uid]);

    const onSend = useCallback(async (messages = []) => {
        setEditing(false);
        setEditingMessage(null);
        setInputText('');
        const senderId = currentUser?.uid;
        const receiverId = id;
        console.time('onSendMessagae')


        const {
            _id,
            text,
            audio,
            video,
            image,
            maindis,
            file,
            uri,
            fileName,
            circle,
        } = messages[0];
        const imageUris = Array.isArray(image) ? image : [image];
        const documentFileUri = uri;
        console.log('audioaudio', audio);
        
        const message = messages[0] || {};

        let audioUrl = null;
        if (audio) {
            const audioFilePath = `audios/${Date.now()}.mp4`;
            try {
                audioUrl = await uploadAudioToStorage(audio, audioFilePath);
                console.log('blabla');

            } catch (error) {
                console.error('Error uploading audio file:', error);
                return;
            }
        }
        let videoUrl = null;
        if (video) {
            const videoFilePath = `videos/${Date.now()}.mp4`;
            try {
                videoUrl = await uploadMediaToStorage(video, videoFilePath, 'video');
            } catch (error) {
                console.error('Error uploading video file:', error);
            }
        }

        let imageUrls = [];
        for (const imgUri of imageUris) {
            if (imgUri) {
                const imageFilePath = `images/${Date.now()}.webp`;
                try {
                    const uploadedImageUrl = await uploadMediaToStorage(imgUri, imageFilePath, 'image');
                    imageUrls.push(uploadedImageUrl);
                } catch (error) {
                    console.error('Error uploading image file:', error);
                }
            }
        }

        let documentUrl = null;
        if (documentFileUri) {
            const documentFilePath = `documents/${Date.now()}.pdf`;
            try {
                documentUrl = await uploadDocumentToStorage(documentFileUri);
            } catch (error) {
                console.error('Error uploading document file:', error);
            }
        }

        let messageType = 'text';
        if (audioUrl) {
            messageType = 'audio';
        } else if (videoUrl) {
            messageType = 'video';
        } else if (imageUrls.length > 0) {
            messageType = 'image';
        } else if (documentUrl) {
            messageType = 'document';
        }

        let roomDocRef = db.collection('Rooms')
            .where('senderId', 'in', [senderId, receiverId])
            .where('receiverId', 'in', [senderId, receiverId])
            .limit(1);

        const roomQuerySnapshot = await roomDocRef.get();
        let targetRoomId;
        if (roomQuerySnapshot.empty) {
            const newRoomDocRef = db.collection('Rooms').doc();
            await newRoomDocRef.set({
                senderId,
                receiverId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            targetRoomId = newRoomDocRef.id;
        } else {
            targetRoomId = roomQuerySnapshot.docs[0].id;
        }

        const messageDocRef = db.collection('Messages').doc();
        await messageDocRef.set({
            _id,
            roomId: targetRoomId,
            user: {
                _id: senderId,
                name: currentUser?.displayName || 'Me',
            },
            ...(text && { text }),
            ...(audioUrl && { audio: audioUrl }),
            ...(documentUrl && { fileUri: documentUrl }),
            ...(videoUrl && { video: videoUrl }),
            ...(imageUrls.length > 0 && { image: imageUrls }),
            type: messageType,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            ...(maindis && { maindis }),
            ...(fileName && { fileName }),
            ...(circle && { circle }),
            senderId,
            receiverId,
            read: false,
        });

        const recipientDoc = await firestore().collection('users').doc(receiverId).get();

        const recipientData = recipientDoc.data();
        const recipientTokens = recipientData?.deviceTokens || [];

        if (recipientTokens.length > 0) {
            sendNotification(recipientTokens, currentUser?.displayName || 'Me', text || 'Sent a message', senderId, targetRoomId);
        } else {
            console.log('tadaaaaaaaaam');

        }
        console.timeEnd('onSendMessagae')

        console.log('Message successfully added to the Messages collection!');
    }, [id, currentUser]);

    const onEditMessage = useCallback(async (editedMessage) => {
        setEditing(false);
        setEditingMessage(null);
        setInputText('');
        console.log('editMessageeditMessage', (selectedEditMessage?._id || selectedMessage?._id));


        console.time('onEditMessage');

        console.log(selectedMessage._id, 789798798, selectedEditMessage._id);
        setMessages((previousMessages) =>
            previousMessages.map((message) =>
                message._id === selectedMessage._id
                    ? { ...message, text: inputText }
                    : message
            )
        );

        const messageDocRef = await db.collection('Messages').doc(selectedEditMessage?._id || selectedMessage?._id);
        try {
            await messageDocRef.update({
                text: inputText,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(), // Optional: Track when the message was edited
            });
            console.log('Message successfully updated in Firestore!');
        } catch (error) {
            console.error('Error updating message in Firestore:', error);
        }

        console.timeEnd('onEditMessage');
    }, [id, currentUser, inputText, selectedEditMessage, selectedMessage]);

    const handleInputChange = (text) => {
        setInputText(text);
        console.log("Input Text:", text);
    };


    const renderMessageImage = props => {
        const { currentMessage } = props;
        return !currentMessage.file && currentMessage.image !== "none" ? (
            <>
                {currentMessage?.images?.map((img, idx) => img && <MessageImage
                    key={idx}
                    currentMessage={{
                        ...currentMessage,
                        image: img
                    }}
                    imageStyle={{ width: 74, height: 74, resizeMode: 'cover' }}
                />
                )}
                <RN.View style={styles.imageInfo}>
                    <RN.Text style={styles.fileName}>{currentMessage.fileName}</RN.Text>
                    <RN.Text style={styles.fileSize}>{currentMessage.fileSize}</RN.Text>
                    <RN.Text style={styles.time}>{currentMessage.time}</RN.Text>
                </RN.View>
            </>
        ) : currentMessage.image !== "none" && (
            <RN.Pressable
                onPress={() => Linking.openURL(currentMessage.file)}
                style={styles.fileBox}>
                <RN.View style={styles.fileBoxFile}>
                    <Images.Svg.fileIcon width={74} height={74} />
                </RN.View>
                <RN.View style={styles.imageInfo}>
                    <RN.Text style={styles.fileName}>{currentMessage.fileName}</RN.Text>
                    <RN.Text style={styles.fileSize}>{currentMessage.fileSize}</RN.Text>
                    <RN.Text style={styles.time}>{currentMessage.createdAt}</RN.Text>
                </RN.View>
            </RN.Pressable>
        );
    };


    const processedMessages = useMemo(() => {
        return messages.map(message => ({ ...message, image: !!message?.images?.[0] ? message?.images?.[0] : message.fileUri, file: message.fileUri }));
    }, [messages]);



    useEffect(() => {
        if (containerRef.current) {
            // console.log("GiftedChat containerRef.current:", containerRef.current);
        }
    }, [containerRef.current]);


    // useEffect(() => {
    //     if (containerRef.current) {
    //         const scrollableNode = containerRef.current._listRef._scrollRef; 
    //         if (scrollableNode) {
    //             scrollableNode.scrollTo({ y: 250, animated: false }); 
    //         }

    //     } else {
    //         console.warn('No FlatList reference found');
    //     }
    // }, [])



    return (
        <PlatfromView>
            <LinearGradient
                style={{ minHeight: '12%', top: 0, paddingHorizontal: 10, paddingVertical: 8 }}
                colors={['#323D45', '#1B2024']}
            >
                <HeaderContent
                    rightItem={
                        <RN.TouchableOpacity
                            onPress={
                                () =>
                                    navigation.navigate(APP_ROUTES.PROFILE_PAGE, {
                                        lastSeen,
                                        avatar,
                                        name,
                                        roomId,
                                    })

                            }
                            style={styles.imageContainer}
                        >
                            <Images.Svg.profileBackground width={49} height={49} />
                            {
                                avatar ? <RN.Image
                                    source={{ uri: avatar || null }}
                                    style={styles.profileImg}
                                /> :
                                    <Images.Svg.userIcon style={styles.profileImg} />
                            }
                        </RN.TouchableOpacity>
                    }
                    title={
                        <RN.View>
                            <RN.Text style={styles.name}>{name}</RN.Text>
                            {lastSeen !== 'Online' && <RN.Text style={styles.lastSeen}>Last seen</RN.Text>}
                            <RN.Text style={styles.lastSeen}>{lastSeen ? lastSeen : 'Yesterday, 07:04'}</RN.Text>
                        </RN.View>
                    }
                    leftItem={<ArrowLeftBack onPress={() => navigation.navigate(APP_ROUTES.MESSENGER as never,)} title='Chats' titleColor='#656E77' />}
                />
            </LinearGradient>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <RN.View
                    style={styles.container}
                >
                    {loading ? (
                        <RN.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={COLORS.white} />
                        </RN.View>) :
                        (
                            <RN.View style={{ flex: 1 }}>
                                <GiftedChat
                                    // messageContainerRef={containerRef}
                                    inverted={true}
                                    listViewProps={{
                                        // ref: containerRef,
                                        onEndReachedThreshold: 0.4,
                                        onEndReached: handleLoadMoreMessages
                                    }}
                                    loadEarlier={false}
                                    messages={processedMessages}
                                    messagesContainerStyle={{ flexGrow: 1 }}
                                    onLongPress={onLongPressMessage}
                                    renderMessage={(props) => <CustomMessage {...props} />}
                                    onSend={messages => onSend(messages)}
                                    user={{
                                        _id: auth().currentUser?.uid,
                                        name: auth().currentUser.displayName,
                                        avatar: auth().currentUser.photoURL
                                    }}
                                    infiniteScroll={true}
                                    isLoadingEarlier={loading}
                                    keyboardShouldPersistTaps="handled"
                                    isKeyboardInternallyHandled={false}
                                    renderInputToolbar={(props) => (
                                        <CustomActions
                                            {...props}
                                            isEditing={editing}
                                            editingText={editingMessage}
                                            text={inputText}
                                            onEditMessage={onEditMessage}
                                            textInputProps={{
                                                value: inputText,
                                                onChangeText: handleInputChange,
                                            }}
                                        />
                                    )}
                                    renderMessageAudio={props => <AudioPlayer {...props} />}
                                    renderMessageVideo={props => <VideoPlayer {...props} />}
                                    renderMessageImage={renderMessageImage}
                                    scrollToBottom={false}
                                    scrollToBottomStyle={{ backgroundColor: 'none' }}
                                    scrollToBottomComponent={() => <Images.Svg.scrollSmiles />}
                                />
                                <MessageActionSheet
                                    visible={actionSheetVisible}
                                    onClose={() => setActionSheetVisible(false)}
                                    onSelect={onSelect}
                                    onReact={onReaction} 
                                    messageType={selectedMessage?.type}                                />
                            </RN.View>
                        )
                    }
                </RN.View>
            </KeyboardAvoidingView>
        </PlatfromView>
    )
}


export default observer(DialogScreen);


const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // height: '100%',
        backgroundColor: 'black',
        paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        marginBottom: 10,
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImg: {
        width: 37,
        height: 37,
        borderRadius: 35,
        position: 'absolute',
        zIndex: 2,
    },
    name: {
        fontSize: 18,
        paddingBottom: 4,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'RedHatDisplay-Bold',
    },
    lastSeen: {
        fontSize: 14,
        color: '#979DA2',
        textAlign: 'center',
        fontFamily: 'RedHatDisplay-Bold',
    },
    imageInfo: {
        marginLeft: 10,
        flex: 1,
    },
    fileName: {
        color: '#fff',
        fontSize: 14,
    },
    fileSize: {
        color: '#bbb',
        fontSize: 12,
    },
    time: {
        color: '#bbb',
        fontSize: 12,
    },
    fileBox: {
        flexDirection: 'row',
        width: windowWidth - 200,
    },
    fileBoxFile: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.darkGrey,
        borderRadius: 5,
    },
    imageStyle: {
        width: 74,
        height: 74,
        resizeMode: 'cover',
    },
});