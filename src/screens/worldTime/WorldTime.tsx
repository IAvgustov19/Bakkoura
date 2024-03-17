import React, {useState} from 'react';
import RN from '../../components/RN';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextView from '../../components/Text/Text';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import WorldWatch from '../../components/WorldWatch/WorldWatch';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';

const WorldTime = () => {
  const [is24h, setIs24h] = useState(true);
  const {selectedCountries} = useRootStore().worldTimeStore;
  const navigation = useNavigation();

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="World Time"
            rightItem={
              <SwitchContain
                title="24h"
                _title="30h"
                back={is24h}
                handlePress={() => setIs24h(e => !e)}
              />
            }
          />
          <RN.View style={styles.content}>
            <RN.FlatList
              showsVerticalScrollIndicator={false}
              style={styles.countryList}
              // ListEmptyComponent={<ListEmptyComp title='Emp'/>}
              data={selectedCountries}
              renderItem={({item, index}) => {
                return (
                  <WorldWatch
                    key={index}
                    country={item.capital}
                    time={item.time}
                    weather={item.date}
                    hour={item.hour}
                    minut={item.minut}
                  />
                );
              }}
            />
            <RN.View>
              <StartBtn
                subWidth={70}
                elWidth={55}
                primary
                text="+"
                textSize={30}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.CITIES_SCREEN as never)
                }
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(WorldTime);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    justifyContent: 'space-between',
    height: '82%',
    // backgroundColor: 'red',
  },
  countryList: {},
});
