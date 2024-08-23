import {observer} from 'mobx-react-lite';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import {windowHeight} from '../../../utils/styles';
import CurrentDate from './CurrentDate';

const HomeWatch30h24h = () => {
  const {homeCurrentTime, today} = useRootStore().homeClockStore;
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.logo}>
        <themeState.timeLogo />
      </RN.View>
      <RN.View style={styles.currentDate}>
        <CurrentDate day={today.day} month={today.monthYear} />
      </RN.View>
      <RN.View style={styles.watchBox}>
        <RN.Image
          style={styles.watch}
          source={themeState.homeWatchs.home24and30}
        />
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
          {
            transform: `rotate(${homeCurrentTime.minut30 * 7.5}deg)`,
          },
        ]}></RN.View>
      <RN.Text style={styles.minut48}>{`${homeCurrentTime.minut30}M`}</RN.Text>
      <RN.Text style={styles.minut60}>{`${homeCurrentTime.minut24}M`}</RN.Text>
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
  currentDate: {
    position: 'absolute',
    right: 0,
    top: -15,
  },
  logo: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  lineMinut: {
    width: 1,
    height: '70%',
    position: 'absolute',
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
    zIndex: 1,
  },
  second60Line: {
    position: 'absolute',
    backgroundColor: COLORS.red,
    height: 25,
    width: 1.5,
    bottom: '32.5%',
    zIndex: 1,
    transformOrigin: 'bottom',
  },
  second48Line: {
    position: 'absolute',
    backgroundColor: COLORS.blue,
    height: 25,
    width: 1.5,
    bottom: '69%',
    transformOrigin: 'bottom',
    zIndex: 1,
  },
  minut48: {
    position: 'absolute',
    color: COLORS.blue,
    fontSize: 9,
    bottom: '60%',
  },
  minut60: {
    position: 'absolute',
    color: COLORS.red,
    fontSize: 9,
    bottom: '24%',
  },
});
