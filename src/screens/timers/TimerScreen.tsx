import {observer} from 'mobx-react-lite';
import React, {useEffect, useMemo, useState} from 'react';
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
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import {useNavigation} from '@react-navigation/native';
import Line from '../../components/Line/Line';
import {COLORS} from '../../utils/colors';

const TimerScreen = () => {
  const navigation = useNavigation();
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
    resetTimerBack,
  } = useRootStore().timerStore;
  const {themeState} = useRootStore().personalAreaStore;
  const [isWork, setWork] = useState(true);

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
    resetTimerBack();
  };
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Timer"
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            rightItem={<themeState.timeLogo />}
          />
          {timerStatus.reset ? null : (
            <RN.View style={styles.switchHours}>
              <SwitchContain
                handlePress={() => toggle('h24')}
                back={timerStatus.h24}
                title="24h"
                _title="30h"
              />
              <RN.View style={styles.changeTimer}>
                <RN.TouchableOpacity
                  onPress={timerChange}
                  style={[
                    styles.changeBtn,
                    {
                      backgroundColor: timerStatus.isFirst
                        ? '#ECC271'
                        : themeState.inputBaack,
                      borderColor: timerStatus.isFirst
                        ? COLORS.inActiveYellow
                        : themeState.inputBorder,
                    },
                  ]}></RN.TouchableOpacity>
                <RN.TouchableOpacity
                  onPress={timerChange}
                  style={[
                    styles.changeBtn,
                    {
                      backgroundColor: !timerStatus.isFirst
                        ? '#ECC271'
                        : themeState.inputBaack,
                      borderColor: !timerStatus.isFirst
                        ? COLORS.inActiveYellow
                        : themeState.inputBorder,
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
            <SwitchBtn isWork={isWork} onPress={() => setWork(e => !e)} />
          </RN.View>
          <RN.TouchableOpacity
            style={[styles.soundList, {borderColor: themeState.input2}]}
            onPress={() => toggle('soundsVisible')}>
            <RN.Text color={themeState.title}>Sound</RN.Text>
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
              <ArrowLeftBack onPress={() => toggle('soundsVisible')} />
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
