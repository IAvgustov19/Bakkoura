import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import { observer } from 'mobx-react-lite';
import { Images } from '../../../assets';

const AudioPlayer = (props) => {
  const { currentMessage } = props;
  const [sound, setSound] = useState(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (currentMessage.audio) {
      const newSound = new Sound(currentMessage.audio, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        setSound(newSound);
      });

      // Cleanup sound when component unmounts or audio changes
      return () => {
        if (sound) {
          sound.release();
        }
      };
    }
  }, [currentMessage.audio]);

  const handlePlayPause = () => {
    if (sound) {
      if (paused) {
        sound.play(onAudioEnd);
        setPaused(false);
      } else {
        sound.pause();
        setPaused(true);
      }
    }
  };

  const onAudioEnd = () => {
    setPaused(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.audio}>
          <TouchableOpacity onPress={handlePlayPause}>
            {paused ? <Images.Svg.pausa /> : <Images.Svg.play />}
          </TouchableOpacity>
          <View style={{display: 'flex', gap: 5}}>
            <Images.Svg.voiceLines />
            <Text style={styles.mainDis}>{currentMessage.maindis}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default observer(AudioPlayer);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audio: {
    width: 200,
    gap: 16,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  audioInfo: {
    gap: 11,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  fileName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  mainDis: {
    fontSize: 14,
    color: '#7D7D7D',
    fontFamily: 'RadHatDisplay-Regular',
  }
});
