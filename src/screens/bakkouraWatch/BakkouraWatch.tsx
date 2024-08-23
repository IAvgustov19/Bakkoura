import React, {useEffect, useState} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import {windowHeight} from '../../utils/styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import Vertices from './components/Vertices';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

const BakkouraWatch = () => {
  const [is24h, setIs24h] = useState(true);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {themeState} = useRootStore().personalAreaStore;
  const {listSelects, getOneSector, getAllSectorsFromFirestore} =
    useRootStore().bakkouraWatchStore;
  const onGetSector = (id: number | string) => {
    getOneSector(id);
    navigation.navigate(APP_ROUTES.CREATE_SECTOR as never);
  };

  console.log('listSelects', listSelects);

  useEffect(() => {
    getAllSectorsFromFirestore();
  }, [isFocused]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Bakkoura Watch"
            rightItem={
              <SwitchContain
                title="24h"
                _title="30h"
                back={is24h}
                handlePress={() => setIs24h(e => !e)}
              />
            }
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <Vertices
                data={listSelects}
                watchBack={themeState.bakkouraWatchs.watchBack}
                watchFront={themeState.bakkouraWatchs.watchMain}
                watchLines
              />
              <RN.View style={styles.sectors}>
                <RN.ScrollView horizontal>
                  {listSelects.map((item, index) => {
                    return (
                      <RN.TouchableOpacity
                        key={index}
                        style={styles.sectorItem}
                        onPress={() => onGetSector(item.id)}>
                        <themeState.outlineSubtrack fill={item.color} />
                      </RN.TouchableOpacity>
                    );
                  })}
                </RN.ScrollView>
              </RN.View>
              <StartBtn
                elWidth={55}
                subWidth={70}
                icon={<Images.Svg.btnAddIcon />}
                primary
                onPress={() =>
                  navigation.navigate(APP_ROUTES.CREATE_SECTOR as never)
                }
              />
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(BakkouraWatch);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight,
    paddingBottom: windowHeight / 3.5,
    justifyContent: 'space-between',
  },
  watchBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectors: {
    flexDirection: 'row',
    gap: 20,
  },

  sectorItem: {
    marginRight: 15,
  },
});
