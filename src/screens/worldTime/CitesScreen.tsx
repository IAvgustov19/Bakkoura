import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
import {Images} from '../../assets';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import {COLORS} from '../../utils/colors';

const CitesScreen = () => {
  const navigation = useNavigation();
  const {worldData, filterWorldData, setCountry} =
    useRootStore().worldTimeStore;
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="City"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <Input
              onChangeText={e => filterWorldData(e)}
              placeholder="City"
              icon={<Images.Svg.searchIcon />}
            />
          </RN.View>
          <RN.ScrollView style={styles.countryList}>
            {worldData.length
              ? worldData.map((e, index) => {
                  return (
                    <RN.View key={index} style={styles.countryBox}>
                      <RN.TouchableOpacity
                        onPress={() =>
                          setCountry(e, () => navigation.goBack())
                        }>
                        <RN.Text
                          style={
                            styles.country
                          }>{`${e.capital}, ${e.name.common}`}</RN.Text>
                      </RN.TouchableOpacity>
                      <Line />
                    </RN.View>
                  );
                })
              : null}
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(CitesScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
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
