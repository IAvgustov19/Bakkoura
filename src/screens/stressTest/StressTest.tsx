import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useMemo} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import StressTestResult from './components/StressTestResult';

const StressTest = () => {
  const navigation = useNavigation();
  const {stressTestStatus, resetStressTimer} = useRootStore().stressTestStore;

  const NewStressTest = () => {
    if (stressTestStatus.finished) {
      resetStressTimer();
    } else {
      navigation.navigate(APP_ROUTES.STRESS_TEST_DURING as never);
    }
  };

  const renderComponent = useMemo(() => {
    if (stressTestStatus.finished) {
      return <StressTestResult />;
    } else {
      return (
        <>
          <Images.Svg.yellowPanda1 />
          <RN.View style={styles.textInfo}>
            <TextView
              text={`The "subjective minute" test was developed by Dr. Litvak, a specialist in psychiatry, psychology, and stress management. Instructions: press the START button, close your eyes, and mentally imagine when 60 seconds have passed. It is IMPORTANT not to count the minute, but to feel the time.`}
            />
            <TextView
              text={`When you feel: a minute has passed, press STOP,`}
            />
          </RN.View>
        </>
      );
    }
  }, [stressTestStatus.finished]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Stress Tests"
            rightItem={<Images.Svg.timerLogo />}
          />
          <RN.View style={styles.content}>
            {renderComponent}
            <StartBtn
              onPress={NewStressTest}
              text={stressTestStatus.finished ? 'New' : 'Start'}
              primary={true}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(StressTest);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  content: {
    height: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
  },
  textInfo: {
    paddingHorizontal: 10,
    gap: 20,
  },
});
