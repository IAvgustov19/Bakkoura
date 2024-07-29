import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable, Platform } from 'react-native';
import { Composer } from 'react-native-gifted-chat';
import { launchImageLibrary } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Images } from '../../../assets';
import RN from '../../../components/RN';
import DocumentPicker from 'react-native-document-picker';
import { windowHeight, windowWidth } from '../../../utils/styles';
import Line from '../../../components/Line/Line';
// import {
//   Camera,
//   getCameraDevice,
//   getCameraFormat,
// } from 'react-native-vision-camera';
import TextView from '../../../components/Text/Text';
import { Swipeable } from 'react-native-gesture-handler';
import useRootStore from '../../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import RNFS from 'react-native-fs';

const audioRecorderPlayer = new AudioRecorderPlayer();

const CustomComposer = props => {
  const { text, onTextChanged, composerHeight, onSend } = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const { startRecordVideo, stopRecordVideo, maindis, startRecordAudio, stopRecordAudio } =
    useRootStore().stopWatchStore;

  // const handlePickImage = () => {
  //   launchImageLibrary(
  //     {
  //       mediaType: 'mixed',
  //       selectionLimit: 0,
  //       includeExtra: true,
  //     },
  //     response => {
  //       if (response.didCancel || response.errorMessage) {
  //         console.log('User cancelled image picker or there was an error');
  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 0,
        includeExtra: true,
      },
      response => {
        if (response.didCancel || response.errorMessage) {
          console.log('User cancelled image picker or there was an error');
        } else {
          const newMessages = response.assets.map(asset => ({
            _id: Math.random().toString(36).substring(7),
            createdAt: new Date(),
            user: {
              _id: 1,
            },
            image: asset.type.startsWith('image/') ? asset.uri : null,
            video: asset.type.startsWith('video/') ? asset.uri : null,
            fileName: asset.fileName,
            fileSize: (asset.fileSize / (1024 * 1024)).toFixed(1) + ' MB',
          }));

          console.log('newMessages', newMessages);
          onSend(newMessages);
        }
      },
    );
  };

  // );
  // };
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      if (result.length > 0) {
        const file = result[0];
        console.log('file', file);

        const message = {
          _id: Math.random().toString(36).substring(7),
          text: '',
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          file: true,
          image: file.uri,
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        };
        onSend([message]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        throw err;
      }
    }
  };

  const handlePickMediaOrDocument = () => {
    setModalVisible(true);
  };

  const handleSendText = () => {
    if (text.trim()) {
      const newMessage = {
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        text,
        user: {
          _id: 1,
        },
      };
      onSend([newMessage]);
      onTextChanged('');
    }
  };
  const [hasPermission, setHasPermission] = useState(false);
  // const devices = Camera.getAvailableCameraDevices();
  // const device = getCameraDevice(devices, 'front');
  // const format = getCameraFormat(device, [
  //   { videoResolution: { width: 300, height: 300 } },
  //   { fps: 60 },
  // ]);

  // useEffect(() => {
  //   (async () => {
  //     const status = await Camera.requestCameraPermission();
  //     const status1 = await Camera.requestMicrophonePermission();
  //     setHasPermission(
  //       status === ('authorized' as never) &&
  //       status1 === ('authorized' as never),
  //     );
  //   })();
  // }, []);

  const [recording, setRecording] = useState(false);
  const [audioRec, setAudioRec] = useState(false);
  const isStopRefVideo = useRef(false);
  const isStopRefAudio = useRef(false);
  // const camera = useRef<Camera>(null);
  const swipeableRefVideo = useRef(null);
  const [audioRecording, setAudioRecording] = useState(false);
  const [audioPath, setAudioPath] = useState(null); // State to store the recorded audio path
  const audioRecorder = useRef(null); // Ref for AudioRecorderPlayer instance
  const swipeableRefAudio = useRef(null); // Ref for Swipeable component


  const handleSwipeableVideoOpen = () => {
    isStopRefVideo.current = true;
    console.log('handleSwipeableVideoOpen', isStopRefVideo.current);

    if (swipeableRefVideo.current && swipeableRefVideo.current.close) {
      swipeableRefVideo.current.close();
    }
  };

  const handleSwipeableAudioOpen = () => {
    if (audioRec) {
      handleRecordAudio(); // Stop recording if it's currently recording
    }
    isStopRefAudio.current = true;
    console.log('handleSwipeableAudioOpen', isStopRefAudio.current);

    if (swipeableRefAudio.current && swipeableRefAudio.current.close) {
      swipeableRefAudio.current.close();
    }
  };


  const handleRecordAudio = async () => {
    try {
      if (!audioRec) {
        console.log('noooooo')
        startRecordAudio();
        setAudioRec(true);
        setAudioRecording(true);

        const path = Platform.select({
          ios: 'audio.m4a',
          android: `${RNFS.DocumentDirectoryPath}/audio.mp4`,
        });

        setAudioPath(path);

        const uri = await audioRecorderPlayer.startRecorder(path);

        audioRecorderPlayer.addRecordBackListener((e) => {
          setAudioRecording(true);
        });
      } else {
        console.log('yessss')
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setAudioRec(false);
        stopRecordAudio();
        setAudioRecording(false);

        const newMessage = {
          _id: Math.random().toString(36).substring(7),
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          audio: result,
          fileName: result.substring(result.lastIndexOf('/') + 1),
          maindis: maindis,
        };

        onSend([newMessage]);
      }
    } catch (error) {
      console.error('Recording error:', error);
      setAudioRecording(false);
    }
  };

  // const handleRecordVideo = async () => {
  //   try {
  //     if (recording) {
  //       await camera.current?.stopRecording();
  //       setRecording(false);
  //       stopRecordVideo();
  //     } else {
  //       startRecordVideo();
  //       setRecording(true);
  //       camera.current.startRecording({
  //         onRecordingFinished: async video => {
  //           if (isStopRefVideo.current) {
  //             isStopRefVideo.current = false;
  //             console.log('isStop:else', isStopRefVideo.current);
  //             return;
  //           } else {
  //             const filePath = video.path;
  //             const fileName = filePath.substring(
  //               filePath.lastIndexOf('/') + 1,
  //             );
  //             const newMessage = {
  //               _id: Math.random().toString(36).substring(7),
  //               createdAt: new Date(),
  //               user: {
  //                 _id: 1,
  //               },
  //               video: filePath,
  //               fileName: fileName,
  //               circle: true,
  //             };
  //             onSend([newMessage]);
  //             setRecording(false);
  //           }
  //           console.log('isStop:', isStopRefVideo.current);
  //         },
  //         onRecordingError: error => {
  //           console.error('Recording error:', error);
  //           setRecording(false);
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Recording error:', error);
  //     setRecording(false);
  //   }
  // };

  const renderRecordingVideo = useCallback(() => {
    return (
      <>
        <View
          style={[
            styles.recordingbottom,
            {
              bottom: recording ? 0 : -200,
              width: recording ? windowWidth : 'auto',
            },
          ]}>
          {recording ? (
            <>
              <View style={[styles.recordingItem, styles.recordingItemTime]}>
                <View style={styles.redDot}></View>
                <TextView text={maindis} />
              </View>
              <Pressable style={styles.recordingItem}>
                <Images.Svg.deleteIcon />
                <TextView text={'pull left to delete'} />
              </Pressable>
            </>
          ) : null}
        </View>
        <Swipeable
          ref={swipeableRefVideo}
          renderRightActions={() => {
            return (
              <Pressable style={{ opacity: 0 }}>
                <Images.Svg.deleteIcon />
              </Pressable>
            );
          }}
          onSwipeableWillOpen={handleSwipeableVideoOpen}>
          {/* <Pressable
            style={[
              styles.videoRecord,
              {
                width: recording ? 100 : 50,
                bottom: recording ? 10 : 0,
              },
            ]}
            onPressIn={handleRecordVideo}
            onPressOut={handleRecordVideo}>
            {!audioRec &&
              <>
                {recording ? (
                  <Images.Svg.videoRecord width={80} height={80} />
                ) : (
                  <Images.Svg.videoMessage width={30} height={30} />
                )}
              </>
            }
          </Pressable> */}
        </Swipeable>
      </>
    );
  }, [recording, maindis]);

  // const renderCamera = useCallback(() => {
  //   return (
  //     <RN.View
  //       style={[
  //         styles.circleBox,
  //         {
  //           left: recording ? windowWidth / 2 - 150 : -windowWidth,
  //           top: windowHeight / 2 - 300,
  //         },
  //       ]}>
  //       <Camera
  //         ref={camera}
  //         style={[
  //           styles.cameraContainer,
  //           {
  //             aspectRatio: 3 / 4,
  //           },
  //         ]}
  //         device={device}
  //         isActive={true}
  //         video={true}
  //         audio={true}
  //         format={RN.Platform.OS === 'android' ? undefined : format}
  //         resizeMode="cover"
  //       />
  //     </RN.View>
  //   );
  // }, [recording, device, format]);


  // audio

  const renderRecordingAudio = useCallback(() => {
    return (
      <>
        <View
          style={[
            styles.recordingbottom,
            {
              bottom: audioRec ? 0 : -200,
              width: audioRec ? windowWidth : 'auto',
            },
          ]}
        >
          {audioRec ? (
            <>
              <View style={[styles.recordingItem, styles.recordingItemTime]}>
                <View style={styles.redDot}></View>
                <TextView text={maindis} />
              </View>
              <Pressable style={styles.recordingItem}>
                <Images.Svg.deleteIcon />
                <TextView text={'pull left to delete'} />
              </Pressable>
            </>
          ) : null}
        </View>
        <Swipeable
          ref={swipeableRefAudio}
          renderRightActions={() => {
            return (
              <Pressable style={{ opacity: 0 }}>
                <Images.Svg.deleteIcon />
              </Pressable>
            );
          }}
          onSwipeableWillOpen={handleSwipeableAudioOpen}
        >
          <Pressable
            style={[
              styles.videoRecord,  // Changed from videoRecord to audioRecord
              {
                width: audioRec ? 100 : 50,
                bottom: audioRec ? 10 : 0,
              },
            ]}
            onPressIn={handleRecordAudio}
            onPressOut={handleRecordAudio}
          >
            {audioRec ? (
              <RN.View style={styles.imageContainer}>
                <Images.Svg.audioBackground width={90} height={90} />
                <Images.Svg.audio style={styles.audioImg} />
              </RN.View>
            ) : (
              <Images.Svg.voiceMessage width={30} height={30} />
            )}
          </Pressable>
        </Swipeable>
      </>
    );
  }, [audioRec, maindis]);


  useEffect(() => {
    console.log('audioRecaudioRec', audioRec);
    console.log('recordingrecording', recording);
  }, [audioRec, recording]);

  return (
    <>
      {/* {renderCamera()} */}
      <View style={styles.composerContainer}>
        <TouchableOpacity
          onPress={handlePickMediaOrDocument}
          style={{ paddingTop: 8 }}>
          <Images.Svg.imageMessage />
        </TouchableOpacity>
        <RN.View
          style={[
            styles.bottomModal,
            { bottom: isModalVisible ? 0 : -windowHeight },
          ]}>
          <View style={styles.modalContent}>
            <RN.View style={styles.category}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  handlePickImage();
                }}>
                <RN.Text style={styles.modalOption}>Pick from Gallery</RN.Text>
              </TouchableOpacity>
              <Line />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  handlePickDocument();
                }}>
                <RN.Text style={styles.modalOption}>Pick Document</RN.Text>
              </TouchableOpacity>
            </RN.View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <RN.Text style={[styles.modalOption, styles.modalOptionBtn]}>
                Cancel
              </RN.Text>
            </TouchableOpacity>
          </View>
        </RN.View>
        <View style={styles.composerWrapper}>
          <Composer
            {...props}
            text={text}
            placeholder="Message"
            placeholderTextColor="#636366"
            onTextChanged={onTextChanged}
            textInputStyle={styles.textInput}
            composerHeight={composerHeight}
          />
          {text.trim() ? (
            <TouchableOpacity onPress={handleSendText}>
              <Images.Svg.sendMessage width={25} height={25} />
            </TouchableOpacity>
          ) : <View style={{ height: 25, width: 25 }} />}
        </View>
        {renderRecordingAudio()}
        {renderRecordingVideo()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  composerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#1C1C1D',
    gap: 4,
  },
  composerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    color: '#636366',
    borderColor: '#3A3A3C',
    backgroundColor: '#060606',
    borderWidth: 1,
    minHeight: 57,
    borderRadius: 18,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  bottomModal: {
    position: 'absolute',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: windowWidth,
    zIndex: 100,
    paddingBottom: 30,
  },
  modalContent: {
    padding: 20,
    width: '100%',
  },
  category: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#333',
    color: 'red',
  },
  modalOptionBtn: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  recordButton: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 15,
  },
  circleBox: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
  },
  cameraContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  recordingbottom: {
    position: 'absolute',
    height: '110%',
    backgroundColor: '#1C1C1D',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  recordingItemTime: {
    width: 100,
  },
  videoRecord: {
    right: 0,
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  imageContainer: {
    right: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioImg: {
    zIndex: 2,
    left: 'auto',
    right: '24%',
    position: 'absolute',
  },

});

export default observer(CustomComposer);
