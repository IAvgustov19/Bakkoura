import {observer} from 'mobx-react-lite';
import * as React from 'react';
import Swiper from 'react-native-swiper';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SoundsContent from '../../components/SoundsContent/SoundsContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import SwitchBtn from '../../components/SwitchBtn/SwitchBtn';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import useRootStore from '../../hooks/useRootStore';
import {HITSLOP} from '../../utils/styles';
import FirstTimer from './components/FirstTimer';
import FirstTimerDuring from './components/FirstTimerDuring';
import SecondTimer from './components/SecondTimer';
import SecondTimerDuring from './components/SecondTimerDuring';
import {styles} from './TimerScreenStyles';

const TimerScreen = () => {
  const {
    timerStatus,
    inActive,
    resetTimer,
    startStopSecondTimer,
    toggle,
    StartStopFirstTimer,
    soundsData,
    onSoundItemPress,
    selectedSound,
  } = useRootStore().timerStore;

  const StartTimer = () => {
    if (timerStatus.isFirst) {
      StartStopFirstTimer();
    } else {
      startStopSecondTimer();
    }
  };

  const renderFirstTimerStatus = React.useMemo(() => {
    if (timerStatus.reset) {
      return (
        <FirstTimerDuring
          stop={timerStatus.stop}
          finished={timerStatus.finished}
        />
      );
    } else {
      return <FirstTimer />;
    }
  }, [timerStatus.reset, timerStatus.stop]);

  const renderSecondTimerStatus = React.useMemo(() => {
    if (timerStatus.reset) {
      return (
        <SecondTimerDuring
          finished={timerStatus.finished}
          stop={timerStatus.stop}
        />
      );
    } else {
      return <SecondTimer />;
    }
  }, [timerStatus.reset, timerStatus.stop]);

  const timerChange = () => {
    toggle('isFirst');
    inActive('reset');
    inActive('start');
    inActive('stop');
    resetTimer();
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Timer"
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={<Images.Svg.timerLogo />}
          />
          {timerStatus.reset ? null : (
            <RN.View style={styles.switchHours}>
              <SwitchContain
                handlePress={() => toggle('h30')}
                back={timerStatus.h30}
                title="30h"
                _title="24h"
              />
              <RN.View style={styles.changeTimer}>
                <RN.TouchableOpacity
                  onPress={timerChange}
                  style={[
                    styles.changeBtn,
                    {backgroundColor: timerStatus.isFirst ? '#ECC271' : '#000'},
                  ]}></RN.TouchableOpacity>
                <RN.TouchableOpacity
                  onPress={timerChange}
                  style={[
                    styles.changeBtn,
                    {
                      backgroundColor: !timerStatus.isFirst
                        ? '#ECC271'
                        : '#000',
                    },
                  ]}></RN.TouchableOpacity>
              </RN.View>
              <SwitchContain
                back={timerStatus.back}
                handlePress={() => toggle('back')}
                title="Back"
                _title="Forward"
              />
            </RN.View>
          )}
          <RN.View style={styles.timerContent}>
            {timerStatus.isFirst
              ? renderFirstTimerStatus
              : renderSecondTimerStatus}
          </RN.View>
          <RN.View style={styles.startStop}>
            <StartBtn text="Reset" onPress={resetTimer} />
            <StartBtn
              text={
                timerStatus.start
                  ? 'Stop'
                  : timerStatus.pausa
                  ? 'Start'
                  : 'Start'
              }
              primary={timerStatus.reset ? true : false}
              onPress={StartTimer}
            />
          </RN.View>
          <RN.View style={styles.switchWork}>
            <SwitchBtn title="Work" icon={<Images.Svg.sendIcon />} />
          </RN.View>
          <RN.TouchableOpacity
            style={styles.soundList}
            onPress={() => toggle('soundsVisible')}>
            <RN.Text color="#fff">Sound</RN.Text>
            <RN.View style={styles.sound}>
              <RN.Text color="#2F4252">{selectedSound.title}</RN.Text>
              <Images.Svg.arrowRight />
            </RN.View>
          </RN.TouchableOpacity>
          <SoundsContent
            headerTitle="Sound"
            data={soundsData}
            onItemPress={onSoundItemPress as never}
            headerLeftItem={
              <RN.TouchableOpacity
                hitSlop={HITSLOP}
                onPress={() => toggle('soundsVisible')}>
                <Images.Svg.arrowLeft />
              </RN.TouchableOpacity>
            }
            onClose={() => toggle('soundsVisible')}
            modalVisible={timerStatus.soundsVisible}
          />
        </RN.View>
      }
    />
  );
};

export default observer(TimerScreen);
