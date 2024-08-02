import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Keyboard, Platform, Text, TouchableWithoutFeedback, View } from 'react-native'
import RN from '../../components/RN';
import { GiftedChat, MessageImage } from 'react-native-gifted-chat';
import { RootStackParamList } from '../../types/navigation';
import { APP_ROUTES } from '../../navigation/routes';
import { observer } from 'mobx-react-lite';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidingView';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
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
import { uploadFiles } from '../../services/firestoreService';

type DialogScreenRouteProp = RouteProp<RootStackParamList, typeof APP_ROUTES.DIALOG_SCREEN>;
const audioRecorderPlayer = new AudioRecorderPlayer();

const DialogScreen = () => {
    const route = useRoute<DialogScreenRouteProp>();
    const navigation = useNavigation();
    const { id, name, avatar } = route.params;
    const currentUser = auth().currentUser;
    const groupId = `${id}-${currentUser?.uid}`;
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState(false);
    const [audioPath, setAudioPath] = useState('');
    const [lastSeen, setLastSeen] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            navigation.goBack();
            return;
        }

        const userRef = firestore().collection('users').doc(id);

        const unsubscribe = userRef.onSnapshot((snapshot) => {
            const userData = snapshot.data();
            if (userData?.lastSeen) {
                // Convert lastSeen to a moment object for easier manipulation
                const lastSeenTimestamp = moment(userData.lastSeen.toDate());
                const now = moment();

                // Check if lastSeenTimestamp is today, yesterday, or earlier
                const isToday = lastSeenTimestamp.isSame(now, 'day');
                const isYesterday = lastSeenTimestamp.clone().add(1, 'day').isSame(now, 'day');

                // Format lastSeenTimestamp
                let lastSeenFormatted;
                if (isToday) {
                    lastSeenFormatted = lastSeenTimestamp.format('HH:mm'); // Today, HH:mm format
                } else if (isYesterday) {
                    lastSeenFormatted = lastSeenTimestamp.format('HH:mm'); // Yesterday, HH:mm format
                } else {
                    lastSeenFormatted = lastSeenTimestamp.format('MMMM DD, HH:mm'); // Month DD, HH:mm format
                }

                // Calculate time difference in minutes
                const diffInMinutes = now.diff(lastSeenTimestamp, 'minutes');

                // Update state based on time difference
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


    useEffect(() => {
        console.log('lastSeenlastSeen', lastSeen)
    }, [])

    useLayoutEffect(() => {
        setLoading(true);
        const reverseId = `${currentUser?.uid}-${id}`;
        const chatDocRef = db.collection('chats').doc(groupId || reverseId);

        const handleDocument = (docSnapshot) => {
            if (docSnapshot.exists) {
                console.log('Document exists:', docSnapshot.data());
                const messagesArray = docSnapshot.data().messages || [];
                const filteredMessages = messagesArray
                    .map((message, index) => ({
                        _id: index,
                        user: message.user,
                        text: message.text,
                        id: message.id,
                        groupId: message.groupId,
                        createdAt: message.createdAt.toDate(),
                    }))
                    .filter(item => item.groupId.includes(currentUser?.uid) && item.groupId.includes(id))
                    .sort((a, b) => b.createdAt - a.createdAt);

                setMessages(filteredMessages);
            } else {
                setLoading(true);

                console.log('Document does not exist with groupId. Trying reverseId...');
                const reverseDocRef = db.collection('chats').doc(reverseId);

                // Listen for real-time updates using onSnapshot for reverseId
                reverseDocRef.onSnapshot((reverseDocSnapshot) => {
                    if (reverseDocSnapshot.exists) {
                        // console.log('Document with reverseId exists:', reverseDocSnapshot.data());
                        // Process reverseId document here
                        const messagesArray = reverseDocSnapshot.data().messages || [];
                        const filteredMessages = messagesArray
                            .map((message, index) => ({
                                _id: index,
                                user: message.user,
                                text: message.text,
                                id: message.id,
                                groupId: message.groupId,
                                createdAt: message.createdAt.toDate(),
                            }))
                            .filter(item => item.groupId.includes(currentUser?.uid) && item.groupId.includes(id))
                            .sort((a, b) => b.createdAt - a.createdAt);

                        setMessages(filteredMessages);
                        setLoading(false);
                    } else {
                        console.log('Neither document exists.');
                        setMessages([]);
                        setLoading(false);
                    }
                }, (error) => {
                    console.error('Error fetching document with reverseId in real-time:', error);
                    setLoading(false);
                });
            }
        };

        chatDocRef.onSnapshot(handleDocument, (error) => {
            console.error('Error fetching document with groupId or reverseId in real-time:', error);
            setLoading(false);
        });
        return () => setMessages(null)
    }, [id, currentUser?.uid, groupId]);

    const onSend = useCallback(async (messages = []) => {
        console.log('messagesmessagesmessagesmessagesmessagesmessages', messages)
        const groupId = `${id}-${currentUser?.uid}`;
        const reverseId = `${currentUser?.uid}-${id}`;
        const userId = currentUser?.uid;
        const senderId = currentUser?.uid;
        const receiverId = id;

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const {
            _id,
            user,
            text,
            audio,
            image,
            createdAt,
        } = messages[0];


        let imgs = [];
        let audios = [];

        if (image || audio) {
            console.log('blablaanala', image, audio)
            // try {
                const uploadResults = await uploadFiles(); 

                imgs = uploadResults.filter(result => result.mimetype.startsWith('image')).map(result => result.publicUrl);
                audios = uploadResults.filter(result => result.mimetype.startsWith('audio')).map(result => result.publicUrl);

                console.log('urlllllllllll', imgs, audios)
                
            // } catch (error) {
            //     console.error('Error uploading files:', error);
            // }
        }

        const chatDocRef = db.collection('chats').doc(groupId);

        chatDocRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    // If groupId document exists, update it
                    console.log('Document exists with groupId:', docSnapshot.data());

                    chatDocRef.update({
                        messages: firebase.firestore.FieldValue.arrayUnion({
                            _id,
                            ...(text && { text }),
                            user,
                            // ...(audio && {audio}),
                            // ...(image && {image}),
                            createdAt,
                            groupId,
                            senderId,
                            receiverId,
                        })
                    }).then(() => {
                        console.log('Message successfully added to the array!');
                    }).catch((error) => {
                        console.error('Error updating message:', error);
                    });

                } else {
                    // If groupId document does not exist, check reverseId
                    console.log('Document does not exist with groupId. Trying reverseId...');

                    const reverseDocRef = db.collection('chats').doc(reverseId);
                    reverseDocRef.get()
                        .then((reverseDocSnapshot) => {
                            if (reverseDocSnapshot.exists) {
                                // If reverseId document exists, update it
                                // console.log('Document with reverseId exists:', reverseDocSnapshot.data());
                                console.log({
                                    _id,
                                    ...(text && {text}),
                                    user,
                                    createdAt,
                                    // ...(image && {image}),
                                    // ...(audio && { audio }),
                                    groupId,
                                    senderId,
                                    receiverId,
                                }, 7777);

                                reverseDocRef.update({
                                    messages: firebase.firestore.FieldValue.arrayUnion({
                                        _id,
                                        ...(text && { text }),

                                        user,
                                        createdAt,
                                        // ...(audio && { audio }),
                                        groupId,
                                        senderId,
                                        receiverId,
                                    })
                                }).then(() => {
                                    console.log('Message successfully added to the array!');
                                }).catch((error) => {
                                    console.error('Error updating message:', error);
                                });

                            } else {
                                // If neither document exists, create reverseId document
                                console.log('Neither document exists. Creating document with reverseId:', reverseId);
                                console.log({
                                    messages: [{
                                        _id,
                                        ...(text && { text }),
                                    // ...(image && {image}),

                                        user,
                                        createdAt,
                                        // ...(audio && { audio }),

                                        groupId,
                                        senderId,
                                        receiverId,
                                    }]
                                }, 9000);

                                reverseDocRef.set({
                                    messages: [{
                                        _id,
                                        ...(text && { text }),
                                        user,
                                        createdAt,
                                        // ...(audio && { audio }),
                                    // ...(image && {image}),
                                        groupId,
                                        senderId,
                                        receiverId,
                                    }]
                                }).then(() => {
                                    console.log('Document successfully created with reverseId:', reverseId);
                                }).catch((error) => {
                                    console.error('Error creating document:', error);
                                });
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching document with reverseId:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error fetching document with groupId:', error);
            });

    }, [id, currentUser]);


    const renderMessageAudio = ({ currentMessage }) => {
        return (
            <View style={styles.audioContainer}>
                <AudioPlayer audioPath={currentMessage.audio} />
            </View>
        );
    };


    const renderMessageImage = props => {
        const { currentMessage } = props;
        return !currentMessage.file ? (
            <>
                <MessageImage
                    {...props}
                    imageStyle={{ width: 74, height: 74, resizeMode: 'cover' }}
                />
                <View style={styles.imageInfo}>
                    <Text style={styles.fileName}>{currentMessage.fileName}</Text>
                    <Text style={styles.fileSize}>{currentMessage.fileSize}</Text>
                    <Text style={styles.time}>{currentMessage.time}</Text>
                </View>
            </>
        ) : (
            <RN.Pressable
                onPress={() => FileViewer.open(currentMessage.image)}
                style={styles.fileBox}>
                <RN.View style={styles.fileBoxFile}>
                    <Images.Svg.fileIcon />
                </RN.View>
                <View style={styles.imageInfo}>
                    <Text style={styles.fileName}>{currentMessage.fileName}</Text>
                    <Text style={styles.fileSize}>{currentMessage.fileSize}</Text>
                    <Text style={styles.time}>{currentMessage.time}</Text>
                </View>
            </RN.Pressable>
        );
    };

    // const renderMessageImage = (props) => {
    //     const { currentMessage } = props;
    //     return (
    //         // <View style={styles.messageImageContainer}>
    //         <>
    //             <MessageImage
    //                 {...props}
    //                 // containerStyle={styles.messageImageContainer}
    //                 imageStyle={{
    //                     width: 74,
    //                     height: 74,
    //                     resizeMode: 'cover'
    //                 }}
    //             />
    //             <View style={styles.imageInfo}>
    //                 <Text style={styles.fileName}>{currentMessage.fileName}</Text>
    //                 <Text style={styles.fileSize}>{currentMessage.fileSize}</Text>
    //                 <Text style={styles.time}>{currentMessage.time}</Text>
    //             </View>
    //         </>
    //         // </View>
    //     )
    // }

    return (
        <PlatfromView>
            <LinearGradient
                style={{ height: '13%', top: 0, paddingHorizontal: 10, paddingVertical: 15 }}
                colors={['#323D45', '#1B2024']}
            >
                <HeaderContent
                    rightItem={
                        <RN.View style={styles.imageContainer}>
                            <Images.Svg.profileBackground width={49} height={49} />
                            {
                                avatar ? <RN.Image
                                    source={{ uri: avatar || null }}
                                    style={styles.profileImg}
                                /> :
                                    <Images.Svg.userIcon style={styles.profileImg} />
                            }

                        </RN.View>
                    }
                    title={
                        <RN.View>
                            <RN.Text style={styles.name}>{name}</RN.Text>
                            <RN.Text style={styles.lastSeen}></RN.Text>
                            <RN.Text style={styles.lastSeen}>{lastSeen ? lastSeen : 'Yesterday, 07:04'}</RN.Text>
                        </RN.View>
                    }
                    leftItem={<ArrowLeftBack onPress={() => navigation.navigate(APP_ROUTES.MESSENGER as never)} title='Chats' titleColor='#656E77' />}
                />
            </LinearGradient>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >

                    <RN.View style={styles.container}>
                        {loading ? ( // Display loading indicator when loading is true
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color={COLORS.white} />
                            </View>) :
                            (<GiftedChat
                                renderMessageImage={renderMessageImage}
                                messages={messages}
                                renderMessage={(props) => <CustomMessage {...props} />}
                                onSend={messages => onSend(messages)}
                                user={{
                                    _id: auth().currentUser.email,
                                    name: auth().currentUser.displayName,
                                    avatar: auth().currentUser.photoURL
                                }}
                                renderInputToolbar={(props) => (
                                    <CustomActions {...props} />
                                )}
                                renderMessageAudio={props => <AudioPlayer {...props} />}
                                renderMessageVideo={props => <VideoPlayer {...props} />}
                            />)
                        }
                    </RN.View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </PlatfromView>
    )
}


export default observer(DialogScreen);


const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
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
    userInfo: {

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
    messageImageContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        // width: 74,
        // height: 74,
        borderRadius: 5,
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

});