import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Images} from '../../../assets';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {APP_ROUTES} from '../../../navigation/routes';
import {COLORS} from '../../../utils/colors';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

const StressTestResult = () => {
  const navigation = useNavigation();
  const {stressTestData} = useRootStore().stressTestStore;
  return (
    <RN.View style={styles.content}>
      <Images.Svg.yellowPanda />
      <RN.View style={styles.textInfo}>
        <RN.Text style={styles.result}>{stressTestData.time}</RN.Text>
        <TextView title="Result" />
        <TextView text="The stress and depression test is designed to diagnose the nervous system and emotional instability. " />
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
    // backgroundColor: 'red',
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
