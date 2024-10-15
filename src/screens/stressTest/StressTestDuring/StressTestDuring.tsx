import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useMemo, useState} from 'react';
import {Images} from '../../../assets';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import LottieContent from '../../../components/LottieContent/LottieContent';
import RN from '../../../components/RN';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import SwitchContain from '../../../components/SwitchContain/SwitchContain';
import useRootStore from '../../../hooks/useRootStore';
import {Lotties} from '../../../lotties/lottie';
import {APP_ROUTES} from '../../../navigation/routes';
import {COLORS} from '../../../utils/colors';
import {moderateScale} from '../../../utils/dimensions';
import {windowWidth} from '../../../utils/styles';

import {t} from '../../../i18n'

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
  const {themeState} = useRootStore().personalAreaStore;

  const FinishStressTest = () => {
    finishStressTest();
    navigation.navigate(APP_ROUTES.STRESS_TEST as never);
  };

  const pandaLottie = useMemo(() => {
    return (
      <LottieContent source={themeState.lotties.panda} width={windowWidth <= 500 ? windowWidth : windowWidth/1.7} />
    );
  }, []);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={t("Stress Test")}
            rightItem={<themeState.timeLogo />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.timeBox}>
              <RN.View style={styles.panda}>
                {stressTestStatus.reset ? pandaLottie : <themeState.panda />}
              </RN.View>
              <RN.Text style={[styles.time, {color: themeState.title}]}>
                {stressTestData.time ? stressTestData.time : '00:00:00'}
              </RN.Text>
            </RN.View>
            {stressTestStatus.reset ? (
              <RN.View style={styles.startReset}>
                <StartBtn text={t("Reset")} onPress={resetStressTimer} />
                <StartBtn text={t("Stop")} primary onPress={FinishStressTest} />
              </RN.View>
            ) : (
              <StartBtn text={t("Start")} primary onPress={startStopStressTest} />
            )}
            {/* <SwitchContain
              title="24h"
              _title="30h"
              back={is24}
              handlePress={() => setIs24(e => !e)}
            /> */}
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(StressTestDuring);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
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
    justifyContent: 'center',
    columnGap: 100,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  timeBox: {
    width: '100%',
    alignItems: 'center',
  },
  panda: {},
  time: {
    position: 'absolute',
    fontSize: 65,
    fontWeight: '300',
    color: COLORS.white,
    bottom: '30%',
  },
});
