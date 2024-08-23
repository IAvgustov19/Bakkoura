import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  PanResponder,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RN from '../../components/RN';
import {GiftedChat, MessageImage} from 'react-native-gifted-chat';
import {RootStackParamList} from '../../types/navigation';
import {APP_ROUTES} from '../../navigation/routes';
import {observer} from 'mobx-react-lite';
import {KeyboardAvoidingView} from '../../components/KeyboardAvoidingView';
import {Images} from '../../assets';
import CustomActions from './components/CustomActions';
import AudioPlayer from './components/AudioPlayer';
import LinearGradient from 'react-native-linear-gradient';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import CustomMessage from './components/CustomBubble';
import {PlatfromView} from '../../components/PlatformView/PlatfromView';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {db} from '../../config/firebase';
import moment from 'moment';
import FileViewer from 'react-native-file-viewer';
import {windowWidth} from '../../utils/styles';
import {COLORS} from '../../utils/colors';
import VideoPlayer from './components/VideoPlayer';
import {uploadAudioToStorage} from '../../services/firestoreService';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import functions from '@react-native-firebase/functions';
import {Timestamp} from 'firebase/firestore';
import MessageActionSheet from './components/MessageAction';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
import 'react-native-console-time-polyfill';
import useRootStore from '../../hooks/useRootStore';

type DialogScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof APP_ROUTES.DIALOG_SCREEN
>;

const DialogScreen = () => {
  const {themeState} = useRootStore().personalAreaStore;
  const route = useRoute<DialogScreenRouteProp>();
  const navigation = useNavigation();
  const {id, name, avatar} = route.params;
  const currentUser = auth().currentUser;
  const groupId = `${id}-${currentUser?.uid}`;
  const [messages, setMessages] = useState([]);
  const [lastSeen, setLastSeen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [chatOpenedAt, setChatOpenedAt] = useState(null);

  useEffect(() => {
    const chatOpenedAt = new Date();
    setChatOpenedAt(chatOpenedAt);
  }, []);

  const onLongPressMessage = (context, message) => {
    setSelectedMessage(message);
    setActionSheetVisible(true);
    console.log('Long pressed message:', message);
  };

  const onSelect = async action => {
    setActionSheetVisible(false);
    if (!selectedMessage) return;

    switch (action) {
      case 'delete':
        try {
          setMessages(previousMessages =>
            previousMessages.filter(
              message => message._id !== selectedMessage._id,
            ),
          );

          await db.collection('Messages').doc(selectedMessage._id).delete();

          console.log('Message deleted successfully!');
        } catch (error) {
          console.error('Error deleting message:', error);
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

  const onReaction = reaction => {
    if (!selectedMessage) return;

    setMessages(previousMessages =>
      previousMessages.map(message =>
        message._id === selectedMessage._id ? {...message, reaction} : message,
      ),
    );

    db.collection('Messages')
      .doc(selectedMessage._id)
      .update({
        reaction: reaction,
      })
      .catch(error => {
        console.error('Error updating reaction:', error);
      });
  };

  useEffect(() => {
    console.time('userRef');

    if (id && currentUser?.uid) {
      const userRef = db.collection('users').doc(currentUser.uid);
      userRef.update({openChatWith: id});

      return () => {
        userRef.update({openChatWith: null});
      };
    }
    console.timeEnd('userRef');
  }, [id, currentUser?.uid]);

  useEffect(() => {
    console.time('deviceToken');

    const deviceToken = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('tokentokentoken', token);

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
      const sendPromises = tokens.map(async token => {
        try {
          const result = await sendNotification({
            token: token,
            title: title,
            body: body,
            senderId: senderId && senderId,
            chatId: chatId,
          });
          return {token, success: true, result: result.data};
        } catch (error) {
          return {token, success: false, error: error.message};
        }
      });
      const results = await Promise.all(sendPromises);
      results.forEach(result => {
        if (result.success) {
          console.log(
            `Notification sent successfully to token ${result.token}:`,
            result.result,
          );
        } else {
          console.error(
            `Error sending notification to token ${result.token}:`,
            result.error,
          );
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

    const unsubscribe = userRef.onSnapshot(snapshot => {
      const userData = snapshot.data();
      if (userData?.lastSeen) {
        const lastSeenTimestamp = moment(userData.lastSeen.toDate());
        const now = moment();
        const isToday = lastSeenTimestamp.isSame(now, 'day');
        const isYesterday = lastSeenTimestamp
          .clone()
          .add(1, 'day')
          .isSame(now, 'day');
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

  useLayoutEffect(() => {
    setLoading(true);
    const senderId = currentUser?.uid;
    const receiverId = id;

    const roomQuery = db
      .collection('Rooms')
      .where('senderId', 'in', [senderId, receiverId])
      .where('receiverId', 'in', [senderId, receiverId])
      .limit(1);

    const updateChatOpenedAt = async () => {
      const currentTime = new Date();
      const roomDoc = await roomQuery.get();
      if (!roomDoc.empty) {
        const roomId = roomDoc.docs[0].id;
        await db
          .collection('Rooms')
          .doc(roomId)
          .update({
            [`chatOpenedAt.${senderId}`]: currentTime,
          });
      }
    };

    updateChatOpenedAt();

    const unsubscribe = roomQuery.onSnapshot(
      async roomQuerySnapshot => {
        if (!roomQuerySnapshot.empty) {
          const roomDoc = roomQuerySnapshot.docs[0];
          const roomId = roomDoc.id;

          const messagesQuery = db
            .collection('Messages')
            .where('roomId', '==', roomId)
            .orderBy('createdAt', 'desc');

          messagesQuery.onSnapshot(
            messagesSnapshot => {
              const messagesArray = messagesSnapshot?.docs?.map(doc => {
                const data = doc.data();
                const isLoading = data.audio || data.video;
                setLoadingMessages(prev => ({...prev, [doc.id]: isLoading}));

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
                  createdAt: data?.createdAt
                    ? moment
                        .utc(data.createdAt.toDate())
                        .local()
                        .format('YYYY-MM-DD HH:mm:ss')
                    : null,
                  senderId: data.senderId,
                  circle: data?.circle ?? data?.circle,
                  fileName: data?.fileName ?? data?.fileName,
                  receiverId: data.receiverId,
                  roomId: data.roomId,
                  reaction: data?.reaction ? data?.reaction : null,
                  read: data?.read ? data?.read : false,
                };
              });
              const updatedMessages = messagesArray?.map(msg => {
                const chatOpenedAtForCurrentUser =
                  roomDoc.data()?.chatOpenedAt[senderId];

                if (
                  msg?.receiverId === currentUser?.uid &&
                  chatOpenedAtForCurrentUser &&
                  msg?.createdAt <=
                    moment(chatOpenedAtForCurrentUser?.toDate())?.format(
                      'YYYY-MM-DD HH:mm:ss',
                    )
                ) {
                  db.collection('Messages').doc(msg._id)?.update({read: true});
                }
                return {
                  ...msg,
                  user: {
                    ...msg.user,
                    _id: msg.senderId === senderId ? senderId : msg.user._id,
                    name: msg.senderId === senderId ? 'Me' : msg.user.name,
                    reaction: msg.reaction || null,
                  },
                };
              });

              setMessages(updatedMessages);
              setLoading(false);
            },
            error => {
              console.error('Error fetching messages:', error);
              setLoading(false);
            },
          );
        } else {
          console.log(
            'No existing room found for the given sender and receiver.',
          );
          setMessages([]);
          setLoading(false);
        }
      },
      error => {
        console.error('Error fetching room:', error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [id, currentUser.uid]);

  const onSend = useCallback(
    async (messages = []) => {
      const senderId = currentUser?.uid;
      const receiverId = id;
      console.time('onSendMessagae');

      // setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

      const {_id, text, audio, video, maindis, fileName, circle} = messages[0];
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
      let videoUrl = null;
      if (video) {
        const videoFilePath = `videos/${Date.now()}.mp4`;
        try {
          videoUrl = await uploadAudioToStorage(video, videoFilePath);
        } catch (error) {
          console.error('Error uploading video file:', error);
        }
      }

      let roomDocRef = db
        .collection('Rooms')
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
        ...(text && {text}),
        ...(audioUrl && {audio: audioUrl}),
        ...(videoUrl && {video: videoUrl}),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...(maindis && {maindis}),
        ...(fileName && {fileName}),
        ...(circle && {circle}),
        senderId,
        receiverId,
        read: false,
      });

      const recipientDoc = await firestore()
        .collection('users')
        .doc(receiverId)
        .get();
      console.log('recipientDocrecipientDocrecipientDoc', recipientDoc);

      const recipientData = recipientDoc.data();
      const recipientTokens = recipientData?.deviceTokens || [];

      if (recipientTokens.length > 0) {
        sendNotification(
          recipientTokens,
          currentUser?.displayName || 'Me',
          text || 'Sent a message',
          senderId,
          targetRoomId,
        );
      } else {
        console.log('tadaaaaaaaaam');
      }
      console.timeEnd('onSendMessagae');

      console.log('Message successfully added to the Messages collection!');
    },
    [id, currentUser],
  );

  const renderMessageImage = props => {
    const {currentMessage} = props;
    return !currentMessage.file ? (
      <>
        <MessageImage
          {...props}
          imageStyle={{width: 74, height: 74, resizeMode: 'cover'}}
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
        style={{
          minHeight: '12%',
          top: 0,
          paddingHorizontal: 10,
          paddingVertical: 8,
        }}
        colors={themeState.messengerHeader}>
        <HeaderContent
          rightItem={
            <RN.View style={styles.imageContainer}>
              <themeState.profileBackIcon width={49} height={49} />
              {avatar ? (
                <RN.Image
                  source={{uri: avatar || null}}
                  style={styles.profileImg}
                />
              ) : (
                <themeState.userIcon style={styles.profileImg} />
              )}
            </RN.View>
          }
          centerItem={
            <RN.View>
              <RN.Text style={[styles.name, {color: themeState.title}]}>
                {name}
              </RN.Text>
              <RN.Text style={styles.lastSeen}>Last seen</RN.Text>
              <RN.Text style={styles.lastSeen}>
                {lastSeen ? lastSeen : 'Yesterday, 07:04'}
              </RN.Text>
            </RN.View>
          }
          leftItem={
            <ArrowLeftBack
              onPress={() => navigation.navigate(APP_ROUTES.MESSENGER as never)}
              title="Chats"
              titleColor="#656E77"
            />
          }
        />
      </LinearGradient>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <RN.View
          style={[styles.container, {backgroundColor: themeState.mainBack}]}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={COLORS.white} />
            </View>
          ) : (
            <RN.View style={{flex: 1}}>
              <GiftedChat
                renderMessageImage={renderMessageImage}
                messages={messages}
                messagesContainerStyle={{flexGrow: 1}}
                onLongPress={onLongPressMessage}
                renderMessage={props => <CustomMessage {...props} />}
                onSend={messages => onSend(messages)}
                user={{
                  _id: auth().currentUser?.uid,
                  name: auth().currentUser.displayName,
                  avatar: auth().currentUser.photoURL,
                }}
                keyboardShouldPersistTaps="handled"
                isKeyboardInternallyHandled={false}
                renderInputToolbar={props => <CustomActions {...props} />}
                renderMessageAudio={props => <AudioPlayer {...props} />}
                renderMessageVideo={props => <VideoPlayer {...props} />}
                // infiniteScroll={true}
                scrollToBottom={true}
              />
              <MessageActionSheet
                visible={actionSheetVisible}
                onClose={() => setActionSheetVisible(false)}
                onSelect={onSelect}
                onReact={onReaction}
              />
            </RN.View>
          )}
        </RN.View>
      </KeyboardAvoidingView>
    </PlatfromView>
  );
};

export default observer(DialogScreen);

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // height: '100%',
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
});
