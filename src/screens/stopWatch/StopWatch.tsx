import React, { useCallback, useMemo, useState } from 'react';
import RN from '../../components/RN';
import { StyleSheet, View } from 'react-native';
import StopwatchComp from './components/Stopwatch/Stopwatch';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import { Images } from '../../assets';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { COLORS } from '../../utils/colors';
import { HITSLOP, windowWidth } from '../../utils/styles';
import useRootStore from '../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import Line from '../../components/Line/Line';
import { moderateScale } from '../../utils/dimensions';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import { useNavigation } from '@react-navigation/native';
import { APP_ROUTES } from '../../navigation/routes';

const StopWatch = () => {
  const [isWatch, setIsWatch] = useState(true);
  const navigation = useNavigation();
  const {
    maindis,
    startStopTimer,
    isRunning,
    start,
    circle,
    second,
    circleResetTimer,
    laps,
    stop,
    is24h,
    sethours,
  } = useRootStore().stopWatchStore;

  const handleIndexChange = () => {
    setIsWatch(e => !e);
  };

  const renderLaps = useMemo(() => {
    return laps.length > 0 ? (
      <RN.View style={styles.lapsBox}>
        <Line />
        <RN.ScrollView showsVerticalScrollIndicator={false}>
          {laps.map((item, index) => {
            return (
              <RN.View style={styles.laps} key={index}>
                <RN.Text style={styles.lap}>Circle {item.id}</RN.Text>
                <RN.Text style={styles.lap}>{item.lap}</RN.Text>
              </RN.View>
            );
          })}
        </RN.ScrollView>
        <Line />
      </RN.View>
    ) : null;
  }, [laps]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Stop Watch"
            rightItem={
              <RN.TouchableOpacity onPress={() => navigation.navigate(APP_ROUTES.STOP_WATCH_SLIDER as never)}>
                <Images.Svg.question fill={'gray'} width={24} height={24} />
              </RN.TouchableOpacity>
            }
          />
          <RN.View
            style={[
              styles.content,
              { height: RN.Platform.OS === 'ios' ? '82%' : '80%' },
            ]}>
            <RN.View style={styles.switchBox}>
              <SwitchContain
                title="24h"
                _title="30h"
                back={is24h}
                handlePress={sethours}
              />
              <RN.View style={styles.activeBtn}>
                <RN.TouchableOpacity
                  onPress={handleIndexChange}
                  hitSlop={HITSLOP}
                  style={[
                    styles.changeBtn,
                    { backgroundColor: isWatch ? '#ECC271' : '#000' },
                  ]}></RN.TouchableOpacity>
                <RN.TouchableOpacity
                  onPress={handleIndexChange}
                  hitSlop={{ left: 3, right: 3, bottom: 3, top: 3 }}
                  style={[
                    styles.changeBtn,
                    {
                      backgroundColor: !isWatch ? '#ECC271' : '#000',
                    },
                  ]}></RN.TouchableOpacity>
              </RN.View>
            </RN.View>
            <RN.View style={styles.stopwatch}>
              {isWatch ? (
                <RN.View style={styles.child}>
                  <StopwatchComp display={maindis} time={second} />
                </RN.View>
              ) : (
                <RN.View style={[styles.child, styles.childTwo]}>
                  <RN.Text style={styles.text}>{maindis}</RN.Text>
                  {stop ? <RN.Text style={styles.pausa}>Pause</RN.Text> : null}
                </RN.View>
              )}
            </RN.View>
            {isRunning ? (
              <RN.View style={styles.btnsBox}>
                <StartBtn
                  text={circle ? 'Circle' : 'Reset'}
                  onPress={() => circleResetTimer(maindis)}
                />
                <StartBtn
                  text={start ? 'Stop' : 'Start'}
                  primary
                  onPress={startStopTimer}
                />
              </RN.View>
            ) : (
              <RN.View style={styles.btnBox}>
                <StartBtn text="Start" primary onPress={startStopTimer} />
              </RN.View>
            )}
            {renderLaps}
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(StopWatch);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    justifyContent: 'space-between',
    height: '80%',
  },
  switchBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  stopwatch: {
    height: '85%',
    justifyContent:'center',
    alignItems:'center'
  },
  child: {
    width: windowWidth - 40,
    alignItems: 'center',
  },
  childTwo: {
    justifyContent: 'center',
    height: '90%',
  },
  text: {
    color: COLORS.white,
    fontSize: moderateScale(50),
    fontWeight: '100',
    width: '100%',
    paddingLeft: '10%',
  },

  changeBtn: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  activeBtn: {
    flexDirection: 'row',
    gap: 15,
  },
  btnsBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    bottom: 65,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
  },
  btnBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  lapsBox: {
    height: 50,
    overflow: 'hidden',
    marginTop: 20,
  },
  laps: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lap: {
    color: COLORS.white,
    fontSize: 16,
  },
  pausa: {
    position: 'absolute',
    bottom: 100,
    color: COLORS.green,
  },
});
