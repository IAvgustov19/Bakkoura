import React, {useState} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import {COLORS} from '../../utils/colors';
import {windowHeight} from '../../utils/styles';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import VerticesDemo from './components/Vertices';
import Vertices from './components/Vertices';

const BakkouraWatch = () => {
  const [back, setBack] = useState(true);
  const {calendarCurrentTime} = useRootStore().calendarStore;
  const navigation = useNavigation();
  const {listSelects, getOneSector} = useRootStore().bakkouraWatchStore;
  const onGetSector = (id: number) => {
    getOneSector(id);
    navigation.navigate(APP_ROUTES.CREATE_SECTOR as never);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Bakkoura Watch"
            rightItem={
              <SwitchContain
                title="24h"
                _title="30h"
                back={back}
                handlePress={() => setBack(e => !e)}
              />
            }
          />
          <RN.View style={styles.content}>
            <Vertices
              data={listSelects}
              watchBack={Images.Img.watchBack}
              watchFront={Images.Img.bakkouraWatchMain}
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
                      <Images.Svg.outlineSubstrack fill={item.color} />
                    </RN.TouchableOpacity>
                  );
                })}
              </RN.ScrollView>
            </RN.View>
            <StartBtn
              elWidth={55}
              subWidth={70}
              text="+"
              primary
              textSize={25}
              onPress={() =>
                navigation.navigate(APP_ROUTES.CREATE_SECTOR as never)
              }
            />
          </RN.View>
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
    height: '80%',
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
