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
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

import {t} from '../../i18n'

const StressTest = () => {
  const navigation = useNavigation();
  const {stressTestStatus, resetStressTimer} = useRootStore().stressTestStore;
  const {themeState} = useRootStore().personalAreaStore;

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
              color={themeState.darkGrayText}
              text={`${t("stress_text")}`}
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
           leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={t("Stress Test")}
            rightItem={<themeState.timeLogo />}
          />
          <RN.View style={styles.content}>
            {renderComponent}
            <StartBtn
              onPress={NewStressTest}
              text={stressTestStatus.finished ? `${t("Stop")}` : `${t("Start")}`}
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
