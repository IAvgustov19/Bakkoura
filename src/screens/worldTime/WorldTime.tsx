import React, {useCallback, useEffect, useState} from 'react';
import RN from '../../components/RN';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextView from '../../components/Text/Text';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import WorldWatch from './components/WorldWatch/WorldWatch';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';
import {windowHeight} from '../../utils/styles';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

const WorldTime = () => {
  const [is24h, setIs24h] = useState(true);
  const {selectedCountries, isLoading, fetchCountriesFromFirestore} =
    useRootStore().worldTimeStore;
  const {themeState} = useRootStore().personalAreaStore;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchCountriesFromFirestore();
  }, [isFocused]);

  const renderClock = useCallback(() => {
    return selectedCountries.length > 0 ? (
      selectedCountries.map((item, index) => {
        return (
          <WorldWatch
            key={index}
            country={item.capital}
            time={item.time}
            weather={item.date}
            hour={item.hour}
            minut={item.minut}
            isLoading={isLoading}
            hour30={item.hour30}
            minut30={Number(item.minut30)}
            is24={is24h}
          />
        );
      })
    ) : (
      <ListEmptyComp title="No available selected country" />
    );
  }, [selectedCountries, is24h]);

  // useEffect(() => {
  //   updateCountriesWeather();
  // }, [selectedCountries]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="World Time"
            rightItem={
              selectedCountries.length > 0 ? (
                <SwitchContain
                  title="24h"
                  _title="30h"
                  back={is24h}
                  handlePress={() => setIs24h(e => !e)}
                />
              ) : (
                <themeState.timeLogo />
              )
            }
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View>{renderClock()}</RN.View>
            </RN.View>
          </RN.ScrollView>
          <RN.View style={styles.btnBox}>
            <StartBtn
              subWidth={70}
              elWidth={55}
              primary
              icon={<Images.Svg.btnAddIcon />}
              onPress={() =>
                navigation.navigate(APP_ROUTES.CITIES_SCREEN as never)
              }
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(WorldTime);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    height: windowHeight,
  },
  content: {
    paddingBottom: windowHeight / 3.5,
  },
  countryList: {
    height: windowHeight,
  },
  btnBox: {
    position: 'absolute',
    bottom: windowHeight / 16,
    alignItems: 'center',
    width: '100%',
  },
});
