import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {COLORS} from '../../../utils/colors';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import {StresTestResult} from '../../../constants/stresTest';

const StressTestResult = () => {
  const navigation = useNavigation();
  const {stressTestData, stressTestStatus} = useRootStore().stressTestStore;
  const {themeState} = useRootStore().personalAreaStore;

  const renderResult = useCallback(() => {
    if (stressTestData.seconds > 70) {
      return StresTestResult.moreThan70;
    } else if (stressTestData.seconds < 70 && stressTestData.seconds > 65) {
      return StresTestResult.between65_70;
    } else if (stressTestData.seconds < 65 && stressTestData.seconds > 55) {
      return StresTestResult.between55_64;
    } else if (stressTestData.seconds < 55 && stressTestData.seconds > 45) {
      return StresTestResult.between45_54;
    } else if (stressTestData.seconds < 45 && stressTestData.seconds > 35) {
      return StresTestResult.lessThan45;
    } else if (stressTestData.seconds < 35) {
      return StresTestResult.lessThan35;
    }
  }, [stressTestStatus]);

  return (
    <RN.View style={styles.content}>
      <themeState.yellowPanda />
      <RN.View style={styles.textInfo}>
        <RN.Text style={[styles.result, {color: themeState.title}]}>
          {stressTestData.time}
        </RN.Text>
        <TextView title="Result" />
        <TextView text={renderResult()} />
      </RN.View>
    </RN.View>
  );
};

export default observer(StressTestResult);

const styles = RN.StyleSheet.create({
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    paddingHorizontal: 10,
    gap: 20,
    alignItems: 'center',
    paddingTop: 20,
  },
  result: {
    fontSize: 50,
    color: COLORS.blue,
    fontWeight: '300',
  },
});
