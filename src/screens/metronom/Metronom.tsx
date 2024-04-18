import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
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
import {etapData} from '../../utils/repeat';
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
    sound,
  } = useRootStore().metronomStore;
  const [one, isOne] = useState(true);

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
                      addCount={() => setMetronomCountMinut('add')}
                      removeCount={() => setMetronomCountMinut('remove')}
                      etap={metronomState.etap}
                    />
                  </RN.View>
                  <RN.View style={[styles.child]}>
                    <SecondMetronom
                      countMinut={metronomState.countMinut}
                      addCount={() => setMetronomCountMinut('add')}
                      removeCount={() => setMetronomCountMinut('remove')}
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
                    text={isPlaying ? 'Pausa' : 'Start'}
                    onPress={playPause}
                  />
                </RN.View>
              </RN.View>
              <RN.View style={styles.typeBox}>
                <SimpleSwitch
                  active={metronomState.oneWithoutSound}
                  handlePress={() =>
                    setMetronomState(
                      'oneWithoutSound',
                      metronomState.oneWithoutSound ? false : true,
                    )
                  }
                />
                <TextView text={'1 bar with sound and 1 bar without sound'} />
              </RN.View>
              <RN.View style={styles.bottomBox}>
                <RN.TouchableOpacity>
                  <Images.Svg.leftArrowYellow />
                </RN.TouchableOpacity>
                {etapData.map((item, index) => {
                  return (
                    <EllipseBotton
                      key={index}
                      number={`${item.id}`}
                      isActive={item.id === metronomState.etap}
                    />
                  );
                })}
                <RN.TouchableOpacity>
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
    paddingHorizontal: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
