import React, {useCallback, useMemo, useState} from 'react';
import RN from '../../components/RN';
import {StyleSheet, View} from 'react-native';
import StopwatchComp from '../../components/Stopwatch/Stopwatch';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import {Images} from '../../assets';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {COLORS} from '../../utils/colors';
import {windowWidth} from '../../utils/styles';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import Line from '../../components/Line/Line';

const StopWatch = () => {
  const [isWatch, setIsWatch] = useState(false);
  const [is24h, setIs30h] = useState(true);
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
  } = useRootStore().stopWatchStore;

  const handleIndexChange = index => {
    if (index === 0) {
      setIsWatch(true);
    } else {
      setIsWatch(false);
    }
  };

  const renderLaps = useMemo(() => {
    console.log(laps);
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
            leftItem={<Images.Svg.btsRightLinear />}
            title="Stop Watch"
            rightItem={<Images.Svg.timerLogo />}
          />
          <RN.View
            style={[
              styles.content,
              {height: RN.Platform.OS === 'ios' ? '82%' : '80%'},
            ]}>
            <RN.View style={styles.switchBox}>
              <SwitchContain
                title="30h"
                _title="24h"
                back={is24h}
                handlePress={() => setIs30h(e => !e)}
              />
              <RN.View style={styles.activeBtn}>
                <RN.TouchableOpacity
                  onPress={() => handleIndexChange(0)}
                  style={[
                    styles.changeBtn,
                    {backgroundColor: isWatch ? '#ECC271' : '#000'},
                  ]}></RN.TouchableOpacity>
                <RN.TouchableOpacity
                  onPress={() => handleIndexChange(0)}
                  style={[
                    styles.changeBtn,
                    {
                      backgroundColor: !isWatch ? '#ECC271' : '#000',
                    },
                  ]}></RN.TouchableOpacity>
              </RN.View>
            </RN.View>
            <SwiperFlatList
              horizontal
              onChangeIndex={({index}) => handleIndexChange(index)}>
              <RN.View style={styles.child}>
                <StopwatchComp display={maindis} time={second} />
              </RN.View>
              <RN.View style={[styles.child]}>
                <RN.Text style={styles.text}>{maindis}</RN.Text>
                {stop ? <RN.Text style={styles.pausa}>Pausa</RN.Text> : null}
              </RN.View>
            </SwiperFlatList>
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
    paddingHorizontal: 10,
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
  child: {
    width: windowWidth - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 66,
    fontWeight: '200',
    width: '90%',
  },

  changeBtn: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  activeBtn: {
    flexDirection: 'row',
    gap: 5,
  },
  btnsBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btnBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
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
