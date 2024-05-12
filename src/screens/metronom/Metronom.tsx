import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import {COLORS} from '../../utils/colors';
import {etapCountData} from '../../utils/repeat';
import {windowHeight, windowWidth} from '../../utils/styles';
import EllipseBotton from './components/EllipseBotton';
import FirstMetronom from './components/FirstMetronom';
import SecondMetronom from './components/SecondMetronom';

const Metronom = () => {
  const {
    setMetronomCountMinut,
    metronomState,
    setMetronomState,
    playPause,
    isPlaying,
    clearState,
    setEtapCount,
    soundInterval,
    stopSound,
    playSound,
  } = useRootStore().metronomStore;
  const [one, isOne] = useState(true);

  const SetEtap = (id: number) => {
    setEtapCount(id);
  };

  const renderCount = useCallback(() => {
    return etapCountData.map((item, index) => {
      return (
        <EllipseBotton
          key={index}
          number={`${item.id}`}
          isActive={item.id === metronomState.etapCount}
          onPress={() => SetEtap(item.id)}
        />
      );
    });
  }, [metronomState.etapCount]);

  const scrollViewRef = useRef(null);

  const AddEtap = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: windowWidth / 2.4, animated: true});
    }
  };
  const RemoveEtap = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, animated: true});
    }
  };

  const OneWithoutSound = useMemo(() => {
    return (
      <SimpleSwitch
        key={metronomState.oneWithoutSound as never}
        active={metronomState.oneWithoutSound}
        handlePress={() =>
          setMetronomState('oneWithoutSound', !metronomState.oneWithoutSound)
        }
      />
    );
  }, [metronomState.oneWithoutSound]);

  const changeEtap = (key: string) => {
    setMetronomCountMinut(key);
    stopSound();
  };

  useEffect(() => {
    playSound();
  }, [metronomState.beatCount]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Metronom"
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={<Images.Svg.timerLogo />}
          />
          <RN.View style={styles.content}>
            <RN.ScrollView>
              <RN.View>
                <RN.View style={styles.activeBtn}>
                  <RN.TouchableOpacity
                    style={[
                      styles.changeBtn,
                      {backgroundColor: one ? '#ECC271' : '#000'},
                    ]}></RN.TouchableOpacity>
                  <RN.TouchableOpacity
                    style={[
                      styles.changeBtn,
                      {
                        backgroundColor: !one ? '#ECC271' : '#000',
                      },
                    ]}></RN.TouchableOpacity>
                </RN.View>
                <SwiperFlatList
                  horizontal
                  onChangeIndex={index =>
                    isOne(index.index === 0 ? true : false)
                  }>
                  <RN.View style={styles.child}>
                    <FirstMetronom
                      countMinut={metronomState.countMinut}
                      addCount={() => changeEtap('add')}
                      removeCount={() => changeEtap('remove')}
                      etap={metronomState.etap}
                    />
                  </RN.View>
                  <RN.View style={[styles.child]}>
                    <SecondMetronom
                      countMinut={metronomState.countMinut}
                      addCount={() => changeEtap('add')}
                      removeCount={() => changeEtap('remove')}
                      etap={metronomState.etap}
                    />
                  </RN.View>
                </SwiperFlatList>
                <RN.View style={styles.btnBox}>
                  <StartBtn
                    text="Tap Tempo"
                    color={COLORS.grey}
                    onPress={clearState}
                  />
                  <StartBtn
                    primary
                    text={isPlaying ? 'Stop' : 'Start'}
                    onPress={playPause}
                  />
                </RN.View>
              </RN.View>
              <RN.View style={styles.typeBox}>
                {OneWithoutSound}
                <TextView text={'1 bar with sound and 1 bar without sound'} />
              </RN.View>
              <RN.View style={styles.bottomBox}>
                <RN.TouchableOpacity onPress={RemoveEtap}>
                  <Images.Svg.leftArrowYellow />
                </RN.TouchableOpacity>
                <RN.ScrollView
                  ref={scrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  <RN.View style={[styles.renderCount]}>
                    {renderCount()}
                  </RN.View>
                </RN.ScrollView>
                <RN.TouchableOpacity onPress={AddEtap}>
                  <Images.Svg.rightArrowYellow />
                </RN.TouchableOpacity>
              </RN.View>
            </RN.ScrollView>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(Metronom);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight - windowHeight / 4,
    justifyContent: 'space-between',
  },
  changeBtn: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  activeBtn: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    gap: 5,
  },
  child: {
    width: windowWidth - 40,
    alignItems: 'center',
  },
  btnBox: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
  },
  typeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  renderCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
});
