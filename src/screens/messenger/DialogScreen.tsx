import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Keyboard, Platform, Text, TouchableWithoutFeedback, View } from 'react-native'
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
import { uploadAudioToStorage } from '../../services/firestoreService';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


type DialogScreenRouteProp = RouteProp<RootStackParamList, typeof APP_ROUTES.DIALOG_SCREEN>;

const DialogScreen = () => {
    const route = useRoute<DialogScreenRouteProp>();
    const navigation = useNavigation();
    const { id, name, avatar } = route.params;
    const currentUser = auth().currentUser;
    const groupId = `${id}-${currentUser?.uid}`;
    const [messages, setMessages] = useState([]);
    const [lastSeen, setLastSeen] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const deviceToken = async () => {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            console.log('tokentokentoken', token)
            await firestore().collection('users').doc(currentUser.uid).update({
                deviceToken: token,
            });
        }
        deviceToken();
    }, []);

    useEffect(() => {
        if (!id) {
            navigation.navigate(APP_ROUTES.MESSENGER as never);
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


    useLayoutEffect(() => {
        setLoading(true);

        const senderId = currentUser?.uid;
        const receiverId = id;

        // Find the existing room based on senderId and receiverId
        const roomQuery = db.collection('Rooms')
            .where('senderId', 'in', [senderId, receiverId])
            .where('receiverId', 'in', [senderId, receiverId])
            .limit(1);

        const unsubscribe = roomQuery.onSnapshot(async (roomQuerySnapshot) => {
            if (!roomQuerySnapshot.empty) {
                // Room exists, fetch the roomId
                const roomDoc = roomQuerySnapshot.docs[0];
                const roomId = roomDoc.id;

                // Fetch the messages for the found roomId
                const messagesQuery = db.collection('Messages')
                    .where('roomId', '==', roomId)
                    .orderBy('createdAt', 'desc');

                messagesQuery.onSnapshot((messagesSnapshot) => {
                    const messagesArray = messagesSnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            _id: doc.id,
                            user: {
                                _id: data.senderId,
                                name: data.user?.name || 'Unknown', // Ensure `name` is included
                            },
                            text: data.text,
                            maindis: data.maindis,
                            audio: data.audio ? data.audio : null,
                            createdAt: data.createdAt.toDate(),
                            senderId: data.senderId,
                            receiverId: data.receiverId,
                            roomId: data.roomId,
                        };
                    });

                    // Add a check to distinguish between sent and received messages
                    const formattedMessages = messagesArray.map(msg => ({
                        ...msg,
                        user: {
                            ...msg.user,
                            _id: msg.senderId === senderId ? senderId : msg.user._id,
                            name: msg.senderId === senderId ? 'Me' : msg.user.name,
                        },
                    }));

                    setMessages(formattedMessages);
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
    }, [id, currentUser?.uid]);





    const onSend = useCallback(async (messages = []) => {
        const senderId = currentUser?.uid;
        const receiverId = id;

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const {
            _id,
            text,
            audio,
            maindis,
            createdAt,
        } = messages[0];

        let audioUrl = null;
        if (audio) {
            const audioFilePath = `audios/${Date.now()}.mp4`;
            try {
                audioUrl = await uploadAudioToStorage(audio, audioFilePath);
            } catch (error) {
                console.error('Error uploading audio file:', error);
                return;
            }
        }

        // Check if there's an existing room with either senderId-receiverId or receiverId-senderId
        let roomDocRef = db.collection('Rooms')
            .where('senderId', 'in', [senderId, receiverId])
            .where('receiverId', 'in', [senderId, receiverId])
            .limit(1);  // We only need one match

        const roomQuerySnapshot = await roomDocRef.get();

        let targetRoomId;
        if (roomQuerySnapshot.empty) {
            // Create a new room if it doesn't exist
            const newRoomDocRef = db.collection('Rooms').doc();
            await newRoomDocRef.set({
                senderId,
                receiverId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            targetRoomId = newRoomDocRef.id; // Auto-generated roomId
        } else {
            targetRoomId = roomQuerySnapshot.docs[0].id; // Use existing roomId
        }

        // Add message to the Messages collection
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
            createdAt,
            ...(maindis && { maindis }),
            senderId,
            receiverId,
        });

        console.log('Message successfully added to the Messages collection!');
    }, [id, currentUser]);








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

    return (
        <PlatfromView>
            <LinearGradient
                style={{ height: '15%', top: 0, paddingHorizontal: 10, paddingVertical: 30 }}
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
                                    _id: auth().currentUser?.uid,
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
});