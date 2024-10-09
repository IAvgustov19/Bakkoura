import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import { COLORS } from '../../utils/colors';
import { etapCountData } from '../../utils/repeat';
import { windowHeight, windowWidth } from '../../utils/styles';
import EllipseBotton from './components/EllipseBotton';
import FirstMetronom from './components/FirstMetronom';
import SecondMetronom from './components/SecondMetronom';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import { useNavigation } from '@react-navigation/native';
import { APP_ROUTES } from '../../navigation/routes';

import {t} from '../../i18n'

const Metronom = () => {
  const navigation = useNavigation();
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
  const {themeState} = useRootStore().personalAreaStore;
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
      scrollViewRef.current.scrollTo({ x: windowWidth / 2.4, animated: true });
    }
  };
  const RemoveEtap = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
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
            title={`${t("Metronom")}`}
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            rightItem={
              <RN.TouchableOpacity onPress={() => navigation.navigate(APP_ROUTES.METRONOM_SLIDER as never)}>
                <Images.Svg.question fill={'gray'} width={24} height={24} />
              </RN.TouchableOpacity>
            } />
          <RN.View style={styles.content}>
            <RN.ScrollView>
              <RN.View>
                <RN.View style={styles.activeBtn}>
                  <RN.TouchableOpacity
                    style={[
                      styles.changeBtn,
                      {
                        backgroundColor: one
                          ? '#ECC271'
                          : themeState.inputBaack,
                        borderColor: one
                          ? COLORS.inActiveYellow
                          : themeState.inputBorder,
                      },
                    ]}></RN.TouchableOpacity>
                  <RN.TouchableOpacity
                    style={[
                      styles.changeBtn,
                      {
                        borderColor: !one
                          ? COLORS.inActiveYellow
                          : themeState.inputBorder,
                        backgroundColor: !one
                          ? '#ECC271'
                          : themeState.inputBaack,
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
                    text={`${t("Tap Tempo")}`}
                    color={themeState.gray}
                    onPress={clearState}
                  />
                  <StartBtn
                    primary
                    text={isPlaying ? `${t("Stop")}` : `${t("Start")}`}
                    onPress={playPause}
                  />
                </RN.View>
              </RN.View>
              <RN.View style={styles.typeBox}>
                {OneWithoutSound}
                <TextView text={`${t("with_and_without_sound")}`} />
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
    marginTop:20
  },
  renderCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
});
