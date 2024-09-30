import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {COLORS} from '../../../utils/colors';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import {StresTestResult} from '../../../constants/stresTest';

import {t} from '../../../i18n'

const StressTestResult = () => {
  const navigation = useNavigation();
  const {stressTestData, stressTestStatus} = useRootStore().stressTestStore;

  const renderResult = useCallback(() => {
    if (stressTestData.seconds > 70) {
      return t("more 70");
    } else if (stressTestData.seconds < 70 && stressTestData.seconds > 65) {
      return t("63-70");
    } else if (stressTestData.seconds < 65 && stressTestData.seconds > 55) {
      return t("55-64");
    } else if (stressTestData.seconds < 55 && stressTestData.seconds > 45) {
      return t("45-54");
    } else if (stressTestData.seconds < 45 && stressTestData.seconds > 35) {
      return t("less 45");
    } else if (stressTestData.seconds < 35) {
      return t("less 35");
    }
  }, [stressTestStatus]);

  return (
    <RN.View style={styles.content}>
      <Images.Svg.yellowPanda />
      <RN.View style={styles.textInfo}>
        <RN.Text style={styles.result}>{stressTestData.time}</RN.Text>
        <TextView title={t("result")} />
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
