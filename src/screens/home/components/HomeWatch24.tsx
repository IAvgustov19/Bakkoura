import {observer} from 'mobx-react-lite';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';

const HomeWatch24 = () => {
  const {homeCurrentTime} = useRootStore().homeClockStore;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.other}>
        <Images.Svg.timerLogo />
      </RN.View>
      <RN.View style={styles.watchBox}>
        <RN.Image style={styles.watch} source={Images.Img.homeWatch24} />
      </RN.View>
      <LinearGradient
        style={[
          styles.lineMinut,
          {transform: `rotate(${homeCurrentTime.second * 6}deg)`},
        ]}
        colors={['#E10000', '#E10000', '#007AFF']}
      />
      <RN.View
        style={[
          styles.lineHour,
          {
            transform: `rotate(${homeCurrentTime.hour}deg)`,
          },
        ]}></RN.View>
      {/* <RN.View
        style={[
          styles.extraTimeLine,
          {transform: `rotate(${homeCurrentTime.extraTime}deg)`},
        ]}></RN.View> */}
      <RN.View
        style={[
          styles.second60Line,
          {transform: `rotate(${homeCurrentTime.minut}deg)`},
        ]}></RN.View>
    </RN.View>
  );
};

export default observer(HomeWatch24);

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  watchBox: {
    width: '100%',
    height: 350,
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
    backgroundColor: COLORS.yellow,
    height: 18,
    width: 1.5,
    bottom: '31%',
    transformOrigin: 'bottom',
  },
  second60Line: {
    position: 'absolute',
    backgroundColor: COLORS.blue,
    height: 25,
    width: 1.5,
    bottom: '67.5%',
    transformOrigin: 'bottom',
  },
});
