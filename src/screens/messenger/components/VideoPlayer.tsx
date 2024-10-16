import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RN from '../../../components/RN';
import Video from 'react-native-video';
import {observer} from 'mobx-react-lite';
import {Images} from '../../../assets';

const VideoPlayer = (props: any) => {
  const {currentMessage} = props;
  const videoRef = useRef<Video>(null);
  const [paused, setPaused] = useState(false);
  const [initialPausa, setInitialPausa] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const handlePlay = () => {
    if (videoRef.current) {
      setPaused(false);
      videoRef.current.seek(0);
    }
    setOpacity(1);
    setTimeout(() => {
      setOpacity(0);
    }, 1500);
  };

  const handlePause = () => {
    setPaused(true);
    setOpacity(1);
    setTimeout(() => {
      setOpacity(0);
    }, 1500);
  };

  const onPlayPuasa = () => {
    if (paused) {
      if (videoRef.current) {
        setPaused(false);
        videoRef.current.seek(0);
      }
      setOpacity(1);
      setTimeout(() => {
        setOpacity(0);
      }, 1500);
    } else {
      setPaused(true);
      setOpacity(1);
      setTimeout(() => {
        setOpacity(0);
      }, 1500);
    }
  };

  const onSetModalVisible = () => {
    setModalVisible(true);
    setPaused(false);
    setOpacity(1);
    setInitialPausa(true);
    setTimeout(() => {
      setOpacity(0);
    }, 1500);
  };

  const onVideoEnd = () => {
    setPaused(true);
  };

  return (
    <>
      {currentMessage.video ? (
        currentMessage.circle ? (
          <RN.View style={styles.circleVideoBox}>
            <RN.TouchableOpacity onPress={onSetModalVisible}>
              <Video
                ref={videoRef}
                source={{uri: currentMessage.video}}
                style={styles.circleVideo}
                resizeMode="cover"
                controls={false}
                paused={initialPausa}
                onEnd={onVideoEnd}
              />
              <View style={styles.videoInfo}>
                <Text style={styles.fileName}>{currentMessage.fileName}</Text>
                <Text style={styles.fileSize}>{currentMessage.fileSize}</Text>
                <Text style={styles.time}>{currentMessage.time}</Text>
              </View>
            </RN.TouchableOpacity>
            <RN.Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => setModalVisible(false)}>
              <RN.View style={styles.modalContainer}>
                <RN.TouchableOpacity
                  style={styles.closemodal}
                  onPress={() => setModalVisible(false)}>
                  <Images.Svg.whiteDelete />
                </RN.TouchableOpacity>
                <Video
                  ref={videoRef}
                  source={{uri: currentMessage.video}}
                  style={styles.modalCircleVideo}
                  controls={false}
                  resizeMode="cover"
                  paused={paused}
                  onEnd={onVideoEnd}
                />
                <RN.Pressable
                  style={[styles.buttons, {opacity: opacity}]}
                  onPress={onPlayPuasa}>
                  {paused ? (
                    <RN.TouchableOpacity onPress={handlePlay}>
                      <Images.Svg.pausa />
                    </RN.TouchableOpacity>
                  ) : (
                    <RN.TouchableOpacity onPress={handlePause}>
                      <Images.Svg.play />
                    </RN.TouchableOpacity>
                  )}
                </RN.Pressable>
              </RN.View>
            </RN.Modal>
          </RN.View>
        ) : (
          <View>
            <RN.TouchableOpacity
              onPress={onSetModalVisible}
              style={styles.videoMessage}>
              <Video
                source={{uri: currentMessage.video}}
                style={styles.video}
                resizeMode="cover"
                controls={false}
                paused={initialPausa}
                onEnd={onVideoEnd}
              />
              <View style={styles.videoInfo}>
                <Text style={styles.fileName}>{currentMessage.fileName}</Text>
                <Text style={styles.fileSize}>{currentMessage.fileSize}</Text>
                <Text style={styles.time}>{currentMessage.time}</Text>
              </View>
            </RN.TouchableOpacity>
            <RN.Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <RN.TouchableOpacity
                  style={styles.closemodal}
                  onPress={() => setModalVisible(false)}>
                  <Images.Svg.whiteDelete />
                </RN.TouchableOpacity>
                <Video
                  ref={videoRef}
                  source={{uri: currentMessage.video}}
                  style={styles.modalVideo}
                  controls={false}
                  resizeMode="contain"
                  paused={paused}
                  onEnd={onVideoEnd}
                />
                <RN.Pressable
                  style={[styles.buttons, {opacity: opacity}]}
                  onPress={onPlayPuasa}>
                  {paused ? (
                    <RN.TouchableOpacity onPress={handlePlay}>
                      <Images.Svg.pausa />
                    </RN.TouchableOpacity>
                  ) : (
                    <RN.TouchableOpacity onPress={handlePause}>
                      <Images.Svg.play />
                    </RN.TouchableOpacity>
                  )}
                </RN.Pressable>
              </View>
            </RN.Modal>
          </View>
        )
      ) : null}
    </>
  );
};

export default observer(VideoPlayer);

const styles = StyleSheet.create({
  container: {},
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
  video: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoInfo: {
    marginTop: 10,
  },
  circleVideoBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleVideo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
  buttons: {
    position: 'absolute',
    width: '60%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: '50%',
  },
  closemodal: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1,
  },
  modalVideo: {
    width: '100%',
    height: '50%',
  },
  modalCircleVideo: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
  },
});
