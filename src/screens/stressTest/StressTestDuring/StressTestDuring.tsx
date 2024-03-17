import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {Images} from '../../../assets';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import SwitchContain from '../../../components/SwitchContain/SwitchContain';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import {COLORS} from '../../../utils/colors';

const StressTestDuring = () => {
  const [is24, setIs24] = useState(true);
  const navigation = useNavigation();
  const {
    stressTestData,
    stressTestStatus,
    startStopStressTest,
    resetStressTimer,
    finishStressTest,
  } = useRootStore().stressTestStore;

  const FinishStressTest = () => {
    finishStressTest();
    navigation.navigate(APP_ROUTES.STRESS_TEST as never);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Stress Test"
            rightItem={<Images.Svg.timerLogo />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.timeBox}>
              <RN.View style={styles.panda}>
                {stressTestStatus.reset ? (
                  <RN.Image source={Images.Img.pandaTimer} />
                ) : (
                  <Images.Svg.panda />
                )}
              </RN.View>
              <RN.Text style={styles.time}>
                {stressTestData.time ? stressTestData.time : '00:00:00'}
              </RN.Text>
            </RN.View>
            {stressTestStatus.reset ? (
              <RN.View style={styles.startReset}>
                <StartBtn text="Reset" onPress={resetStressTimer} />
                <StartBtn text={'Stop'} primary onPress={FinishStressTest} />
              </RN.View>
            ) : (
              <StartBtn text="Start" primary onPress={startStopStressTest} />
            )}
            <SwitchContain
              title="30h"
              _title="24h"
              back={is24}
              handlePress={() => setIs24(e => !e)}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(StressTestDuring);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    height: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
  },
  startReset: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  timeBox: {
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panda: {},
  time: {
    position: 'absolute',
    fontSize: 60,
    fontWeight: '300',
    color: COLORS.white,
  },
});
