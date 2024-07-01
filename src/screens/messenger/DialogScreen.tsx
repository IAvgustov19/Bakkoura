import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, Keyboard, Platform, Text, TouchableWithoutFeedback, View } from 'react-native'
import RN from '../../components/RN';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import { Actions, GiftedChat, MessageImage } from 'react-native-gifted-chat';
import { RootStackParamList } from '../../types/navigation';
import { APP_ROUTES } from '../../navigation/routes';
import { observer } from 'mobx-react-lite';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidingView';
import { launchImageLibrary } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Image } from 'react-native-svg';
import { Images } from '../../assets';
import CustomActions from './components/CustomActions';
import Sound from 'react-native-sound';
import AudioPlayer from './components/AudioPlayer';
import Cancel from '../../components/Cancel/Cancel';
import LinearGradient from 'react-native-linear-gradient';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import CustomMessage from './components/CustomBubble';
import { PlatfromView } from '../../components/PlatformView/PlatfromView';
import { db } from '../../config/firebase';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth'
import { reversed } from '@popmotion/popcorn';


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



    useEffect(() => {
        !id && navigation.goBack();
    }, [])



    useLayoutEffect(() => {
        const reverseId = `${currentUser?.uid}-${id}`;
        const chatDocRef = db.collection('chats').doc(groupId || reverseId);

        // Function to handle document retrieval and updates
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
                console.log('Document does not exist with groupId. Trying reverseId...');
                const reverseDocRef = db.collection('chats').doc(reverseId);

                // Listen for real-time updates using onSnapshot for reverseId
                reverseDocRef.onSnapshot((reverseDocSnapshot) => {
                    if (reverseDocSnapshot.exists) {
                        console.log('Document with reverseId exists:', reverseDocSnapshot.data());
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
                    } else {
                        console.log('Neither document exists.');
                        setMessages([]);
                    }
                }, (error) => {
                    console.error('Error fetching document with reverseId in real-time:', error);
                });
            }
        };

        chatDocRef.onSnapshot(handleDocument, (error) => {
            console.error('Error fetching document with groupId or reverseId in real-time:', error);
        });
    }, [id, currentUser?.uid, groupId]);

    const onSend = useCallback((messages = []) => {
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
            createdAt,
        } = messages[0];

        const chatDocRef = db.collection('chats').doc(groupId);

        chatDocRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    // If groupId document exists, update it
                    console.log('Document exists with groupId:', docSnapshot.data());

                    chatDocRef.update({
                        messages: firebase.firestore.FieldValue.arrayUnion({
                            _id,
                            text,
                            user,
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
                                console.log('Document with reverseId exists:', reverseDocSnapshot.data());

                                reverseDocRef.update({
                                    messages: firebase.firestore.FieldValue.arrayUnion({
                                        _id,
                                        text,
                                        user,
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
                                // If neither document exists, create reverseId document
                                console.log('Neither document exists. Creating document with reverseId:', reverseId);

                                reverseDocRef.set({
                                    messages: [{
                                        _id,
                                        text,
                                        user,
                                        createdAt,
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


    const renderMessageImage = (props) => {
        const { currentMessage } = props;
        return (
            // <View style={styles.messageImageContainer}>
            <>
                <MessageImage
                    {...props}
                    // containerStyle={styles.messageImageContainer}
                    imageStyle={{
                        width: 74,
                        height: 74,
                        resizeMode: 'cover'
                    }}
                />
                <View style={styles.imageInfo}>
                    <Text style={styles.fileName}>{currentMessage.fileName}</Text>
                    <Text style={styles.fileSize}>{currentMessage.fileSize}</Text>
                    <Text style={styles.time}>{currentMessage.time}</Text>
                </View>
            </>
            // </View>
        )
    }
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
                            <RN.Text style={styles.lastSeen}>Last seen</RN.Text>
                            <RN.Text style={styles.lastSeen}>Yesterday, 07:04</RN.Text>
                        </RN.View>
                    }
                    leftItem={<ArrowLeftBack onPress={() => navigation.navigate(APP_ROUTES.MESSENGER as never)} title='Chats' titleColor='#656E77' />}
                />
                {/* <RN.View style={styles.userInfo}>

               </RN.View> */}
            </LinearGradient>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    <RN.View style={styles.container}>
                        <GiftedChat
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
                                <CustomActions
                                    {...props}
                                    // onSend={onSend} 
                                    recording={recording}
                                    setRecording={setRecording}
                                    setAudioPath={setAudioPath} />
                            )}
                            renderMessageAudio={renderMessageAudio}
                        />
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
        paddingBottom: 30,
        width: '100%',
        height: '100%',
        // paddingHorizontal: 5,
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

});