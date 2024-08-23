import React, {useState, useEffect, useRef} from 'react';
import {Bar} from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';

import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import {windowWidth} from '../../../utils/styles';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import Sound from 'react-native-sound';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../../hooks/useRootStore';
import {normalizeHeight} from '../../../utils/dimensions';

interface PodcastItemProps {
  id: string;
  time: string;
  imageSource: any;
  isPlaying: boolean;
  soundSource: string;
  description: string;
  onPlayPress: (id: string) => void;
}

const PodcastItem: React.FC<PodcastItemProps> = ({
  id,
  time,
  soundSource,
  imageSource,
  description,
  isPlaying,
  onPlayPress,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [formattedDuration, setFormattedDuration] = useState('00:00');
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const sound = useRef<Sound | null>(null);
  const {themeState} = useRootStore().personalAreaStore;

  useEffect(() => {
    sound.current = new Sound(soundSource, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.error('Failed to load the sound', error.message, error.code);
        return;
      }
      const durationInSeconds = sound.current?.getDuration();
      if (typeof durationInSeconds === 'number' && !isNaN(durationInSeconds)) {
        setFormattedDuration(formatDuration(durationInSeconds));
      } else {
        console.error('Failed to get valid duration');
      }
    });

    return () => {
      if (sound.current) {
        sound.current.release();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [soundSource]);

  useEffect(() => {
    if (isPlaying) {
      sound.current?.play();
      progressInterval.current = setInterval(() => {
        sound.current?.getCurrentTime(currentTime => {
          const durationInSeconds = sound.current?.getDuration();
          if (durationInSeconds != null) {
            setCurrentProgress(currentTime / durationInSeconds);
          }
        });
      }, 1000);
    } else {
      sound.current?.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    onPlayPress(id);
  };

  const handleFastBack = () => {
    if (sound.current) {
      sound.current.getCurrentTime(currentTime => {
        const durationInSeconds = sound.current?.getDuration();
        if (durationInSeconds != null) {
          const newTime = Math.max(currentTime - 10, 0);
          sound.current.setCurrentTime(newTime);
          setCurrentProgress(newTime / durationInSeconds);
        }
      });
    }
  };

  const handleFastForward = () => {
    if (sound.current) {
      sound.current.getCurrentTime(currentTime => {
        const durationInSeconds = sound.current?.getDuration();
        if (durationInSeconds != null) {
          const newTime = Math.min(currentTime + 10, durationInSeconds);
          sound.current.setCurrentTime(newTime);
          setCurrentProgress(newTime / durationInSeconds);
        }
      });
    }
  };

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <RN.View style={{paddingVertical: 20}}>
      <RN.View>
        <RN.View style={styles.container}>
          <RN.Image style={styles.image} source={imageSource} />
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
            style={styles.gradient}
          />
        </RN.View>
        <RN.View style={styles.playButtons}>
          <RN.TouchableOpacity onPress={handleFastBack}>
            <Images.Svg.podcastLeftArrow />
          </RN.TouchableOpacity>
          <StartBtn
            primary
            onPress={handlePlayPause}
            text={isPlaying ? 'Pause' : 'Play'}
          />
          <RN.TouchableOpacity onPress={handleFastForward}>
            <Images.Svg.podcastRightArrow />
          </RN.TouchableOpacity>
        </RN.View>
        <RN.View style={styles.progressBarContainer}>
          <Bar
            progress={currentProgress}
            width={300}
            height={4}
            style={styles.progressBar}
          />
          <RN.Text style={styles.duration}>
            {sound?.current?.getDuration()
              ? formatDuration(sound?.current?.getDuration())
              : '00:00'}
          </RN.Text>
        </RN.View>
      </RN.View>
      <RN.View style={styles.textBox}>
        <RN.Text style={[styles.text, {color: themeState.gray}]}>
          {description}
        </RN.Text>
        <RN.Text style={[styles.time, {color: themeState.darkGrayText}]}>
          {time}
        </RN.Text>
      </RN.View>
    </RN.View>
  );
};

export default observer(PodcastItem);

const styles = RN.StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    width: windowWidth - windowWidth / 12,
  },
  image: {
    width: '100%',
    aspectRatio: 1.5,
  },
  playButtons: {
    gap: 18,
    bottom: 50,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - windowWidth / 12,
  },
  progressBarContainer: {
    height: 30,
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  progressBar: {
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: '#D9D9D9',
  },
  duration: {
    color: '#D9D9D9',
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Regular',
  },
  gradient: {
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
    width: '100%',
    position: 'absolute',
  },
  textBox: {
    marginTop: 16,
    width: '100%',
  },
  text: {
    fontSize: normalizeHeight(50),
    color: '#D9D9D9',
    fontFamily: 'RedHatDisplay-Bold',
  },
  time: {
    fontSize: 12,
    marginTop: 10,
    color: '#D9D9D9',
    fontFamily: 'RedHatDisplay-Bold',
  },
});
