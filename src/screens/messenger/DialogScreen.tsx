import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RN from '../../components/RN';
import {Bubble, GiftedChat, MessageImage} from 'react-native-gifted-chat';
import {RootStackParamList} from '../../types/navigation';
import {APP_ROUTES} from '../../navigation/routes';
import {observer} from 'mobx-react-lite';
import {KeyboardAvoidingView} from '../../components/KeyboardAvoidingView';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {Images} from '../../assets';
import CustomActions from './components/CustomActions';
import AudioPlayer from './components/AudioPlayer';
import LinearGradient from 'react-native-linear-gradient';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import CustomMessage from './components/CustomBubble';
import VideoPlayer from './components/VideoPlayer';
import FileViewer from 'react-native-file-viewer';
import {windowWidth} from '../../utils/styles';
import {COLORS} from '../../utils/colors';

type DialogScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof APP_ROUTES.DIALOG_SCREEN
>;

const audioRecorderPlayer = new AudioRecorderPlayer();

const DialogScreen = () => {
  const route = useRoute<DialogScreenRouteProp>();
  const navigation = useNavigation();
  const {uid, name, avatar} = route.params;

  //   console.log('justttttt', uid, name, avatar);
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');

  //   console.log('audioPathaudioPath', audioPath);
  //   console.log('recordingrecording', recording);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'data:image/jpeg;base64,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',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderMessageAudio = ({currentMessage}) => {
    return (
      <View style={styles.audioContainer}>
        <AudioPlayer audioPath={currentMessage.audio} />
      </View>
    );
  };

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
    <>
      <LinearGradient
        style={{
          height: '13%',
          top: 0,
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}
        colors={['#323D45', '#1B2024']}>
        <HeaderContent
          rightItem={
            <RN.View style={styles.imageContainer}>
              <Images.Svg.profileBackground width={49} height={49} />
              {avatar ? (
                <RN.Image
                  source={{uri: avatar || null}}
                  style={styles.profileImg}
                />
              ) : (
                <Images.Svg.userIcon style={styles.profileImg} />
              )}
            </RN.View>
          }
          centerItem={
            <RN.View>
              <RN.Text style={styles.name}>{name}</RN.Text>
              <RN.Text style={styles.lastSeen}>Last seen</RN.Text>
              <RN.Text style={styles.lastSeen}>Yesterday, 07:04</RN.Text>
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
        {/* <RN.View style={styles.userInfo}>

               </RN.View> */}
      </LinearGradient>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <RN.View style={styles.container}>
            <GiftedChat
              renderMessageImage={renderMessageImage}
              messages={messages}
              renderMessage={props => <CustomMessage {...props} />}
              onSend={messages => onSend(messages)}
              user={{
                _id: 1,
              }}
              renderInputToolbar={props => (
                <CustomActions
                  {...props}
                  onSend={onSend}
                  recording={recording}
                  setRecording={setRecording}
                  setAudioPath={setAudioPath}
                />
              )}
              renderMessageAudio={renderMessageAudio}
              renderMessageVideo={props => <VideoPlayer {...props} />}
            />
          </RN.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default observer(DialogScreen);

const styles = RN.StyleSheet.create({
  buttons: {
    position: 'absolute',
  },
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
  userInfo: {},

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
    maxWidth: 200,
    marginLeft: 10,
    flex: 1,
  },
  fileName: {
    color: '#fff',
    fontSize: 14,
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  fileSize: {
    color: '#bbb',
    fontSize: 12,
  },
  time: {
    color: '#bbb',
    fontSize: 12,
  },
  videoMessage: {
    flexDirection: 'row',
    overflow: 'hidden',
    gap: 5,
    maxWidth: '100%',
  },
  videoInfo: {},
  fileImage: {
    width: 74,
    height: 74,
    resizeMode: 'cover',
    borderRadius: 10,
    overflow: 'hidden',
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
