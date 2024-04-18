import {observer} from 'mobx-react-lite';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import {windowHeight} from '../../../utils/styles';

const HomeWatch30 = () => {
  const {homeCurrentTime} = useRootStore().homeClockStore;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.other}>
        <Images.Svg.timerLogo />
      </RN.View>
      <RN.View style={styles.watchBox}>
        <RN.Image style={styles.watch} source={Images.Img.homeWatch30} />
      </RN.View>
      <LinearGradient
        style={[
          styles.lineMinut,
          {transform: `rotate(${homeCurrentTime.second48 * 6}deg)`},
        ]}
        colors={['#007AFF', '#007AFF', '#E10000']}
      />
      <RN.View
        style={[
          styles.lineHour,
          {
            transform: `rotate(${homeCurrentTime.hour30 * 12}deg)`,
          },
        ]}></RN.View>
      <RN.View
        style={[
          styles.extraTimeLine,
          {transform: `rotate(${homeCurrentTime.extraTime}deg)`},
        ]}></RN.View>
      <RN.View
        style={[
          styles.second48Line,
          {transform: `rotate(${homeCurrentTime.minut}deg)`},
        ]}></RN.View>
    </RN.View>
  );
};

export default observer(HomeWatch30);

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  watchBox: {
    width: '100%',
    height: windowHeight / 2.5,
  },
  watch: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  other: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  lineMinut: {
    width: 1,
    height: '35%',
    position: 'absolute',
    top: '16%',
    transformOrigin: 'bottom',
  },
  lineHour: {
    width: 2,
    height: '35%',
    position: 'absolute',
    top: '16%',
    transformOrigin: 'bottom',
    backgroundColor: COLORS.yellow,
  },
  extraTimeLine: {
    position: 'absolute',
    backgroundColor: COLORS.blue,
    height: 18,
    width: 1.5,
    bottom: '67.5%',
    transformOrigin: 'bottom',
  },
  second48Line: {
    position: 'absolute',
    backgroundColor: COLORS.yellow,
    height: 25,
    width: 1.5,
    bottom: '32%',
    transformOrigin: 'bottom',
  },
});
