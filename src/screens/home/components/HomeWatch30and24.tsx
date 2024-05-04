import {observer} from 'mobx-react-lite';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import {windowHeight} from '../../../utils/styles';

const HomeWatch30h24h = () => {
  const {homeCurrentTime} = useRootStore().homeClockStore;
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.other}>
        <Images.Svg.timerLogo />
      </RN.View>
      <RN.View style={styles.watchBox}>
        <RN.Image style={styles.watch} source={Images.Img.homeWatch24and30} />
      </RN.View>
      <LinearGradient
        style={[
          styles.lineMinut,
          {transform: `rotate(${homeCurrentTime.second * 3}deg)`},
        ]}
        colors={['#E10000', '#007AFF']}
      />
      <RN.View
        style={[
          styles.lineHour,
          {
            transform: `rotate(${homeCurrentTime.hour / 4 - 45}deg)`,
          },
        ]}>
        <Images.Svg.homeWatchLine />
      </RN.View>
      <RN.View
        style={[
          styles.extraTimeLine,
          {transform: `rotate(${homeCurrentTime.extraTime}deg)`},
        ]}></RN.View>
      <RN.View
        style={[
          styles.second60Line,
          {transform: `rotate(${homeCurrentTime.minut}deg)`},
        ]}></RN.View>
      <RN.View
        style={[
          styles.second48Line,
          {transform: `rotate(${homeCurrentTime.minut}deg)`},
        ]}></RN.View>
    </RN.View>
  );
};

export default observer(HomeWatch30h24h);

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
    height: '70%',
    position: 'absolute',
    top: '15%',
    transform: 'rotate(45deg)',
  },
  lineHour: {
    position: 'absolute',
  },
  extraTimeLine: {
    position: 'absolute',
    backgroundColor: COLORS.yellow,
    height: 20,
    width: 2,
    left: '32%',
    bottom: '51%',
    transformOrigin: 'bottom',
  },
  second60Line: {
    position: 'absolute',
    backgroundColor: COLORS.red,
    height: 25,
    width: 1.5,
    bottom: '32.5%',
    transformOrigin: 'bottom',
  },
  second48Line: {
    position: 'absolute',
    backgroundColor: COLORS.blue,
    height: 25,
    width: 1.5,
    bottom: '69%',
    transformOrigin: 'bottom',
  },
});
