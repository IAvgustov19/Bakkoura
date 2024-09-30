import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useRef} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import {COLORS} from '../../utils/colors';
import Cancel from '../../components/Cancel/Cancel';

import {t} from '../../i18n'

const CitesScreen = () => {
  const navigation = useNavigation();
  const {
    worldData,
    filterWorldData,
    setCountry,
    selectedCountries,
    getAllCountries,
  } = useRootStore().worldTimeStore;

  useEffect(() => {
    getAllCountries();
  }, []);

  const countries = useCallback(() => {
    return worldData.length > 0
      ? worldData.map((e, index) => {
          return (
            <RN.View key={index} style={styles.countryBox}>
              <RN.TouchableOpacity
                onPress={() => setCountry(e, () => navigation.goBack())}>
                <RN.Text
                  style={
                    styles.country
                  }>{`${e.capital}, ${e.name.common}`}</RN.Text>
              </RN.TouchableOpacity>
              <Line />
            </RN.View>
          );
        })
      : null;
  }, [worldData, selectedCountries]);

    console.log(worldData)

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title={`${t("City")}`}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <Input
              onChangeText={e => filterWorldData(e)}
              placeholder={`${t("City")}`}
              icon={<Images.Svg.searchIcon />}
            />
          </RN.View>
          <RN.ScrollView style={styles.countryList}>
            {countries()}
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(CitesScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingBottom: 30,
  },
  content: {},
  countryList: {
    backgroundColor: COLORS.black,
    height: '80%',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 20,
  },
  countryBox: {
    paddingHorizontal: 10,
  },
  country: {
    color: COLORS.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
