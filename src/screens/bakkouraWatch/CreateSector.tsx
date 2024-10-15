import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import {Images} from '../../assets';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {formattedTime, formattedTimeHourMinut} from '../../helper/helper';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {windowHeight} from '../../utils/styles';
import Vertices24h from './components/Vertices24h';
import Vertices30h from './components/Vertices30h';
//import Vertices from './components/Vertices';
import is24h from './BakkouraWatch';

import {t} from '../../i18n'

const CreateSector = () => {
  //const [is24h, setIs24h] = useState(true);
  const navigation = useNavigation();
  const {addNewSelect, newSelectState, deleteSelect, listSelects, clearState} =
    useRootStore().bakkouraWatchStore;
  const {themeState} = useRootStore().personalAreaStore;

  const CreateSector = () => {
    addNewSelect(() => navigation.navigate(APP_ROUTES.BAKKOURA_WATCH as never));
  };

  const onBackHandle = () => {
    navigation.goBack();
    clearState();
  };

  const renderWatchs = useCallback(() => {
    console.log(is24h)
    if (is24h) {
      return <Vertices24h
        data={listSelects}
        watchBack={themeState.bakkouraWatchs.watchBack}
        watchFront={themeState.bakkouraWatchs.watchMain}
        watchLines
      />;
    } else {
      return <Vertices30h
        data={listSelects}
        watchBack={themeState.bakkouraWatchs.watchBack}
        watchFront={themeState.bakkouraWatchs.watchMain30}
        watchLines
      />
    }
  }, [is24h]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={t("Sector")}
            rightItem={<Cancel onClose={onBackHandle} />}
          />
          <RN.ScrollView
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
            {renderWatchs()}
              <RN.View style={styles.bottomBox}>
                <RN.View style={styles.btnBox}>
                  <StartBtn
                    text={t("Delete")}
                    elWidth={55}
                    subWidth={70}
                    onPress={() =>
                      deleteSelect(newSelectState.id, () =>
                        navigation.navigate(APP_ROUTES.BAKKOURA_WATCH as never),
                      )
                    }
                    textSize={14}
                  />
                  <StartBtn
                    text={t("ok")}
                    elWidth={55}
                    subWidth={70}
                    primary
                    onPress={CreateSector}
                    textSize={14}
                  />
                </RN.View>
                <RN.View
                  style={[
                    styles.bottom,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  <ListItemCont
                    title={t("name")}
                    value={newSelectState.name}
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.SECTOR_NAME as never)
                    }
                  />
                  <Line />
                  <ListItemCont
                    title={t("Color")}
                    value={
                      newSelectState.color ? (
                        <Images.Svg.smallColorBox
                          fill={
                            newSelectState.color
                              ? newSelectState.color
                              : 'transparent'
                          }
                        />
                      ) : (
                        `${t("Not selected")}`
                      )
                    }
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.SECTOR_COLOR as never)
                    }
                  />
                  <Line />
                  <ListItemCont
                    title={t("Time")}
                    value={
                      formattedTimeHourMinut(
                        newSelectState.fromHour,
                        newSelectState.fromMin,
                      ) +
                      '-' +
                      formattedTimeHourMinut(
                        newSelectState.toHour,
                        newSelectState.toMin,
                      )
                    }
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.SECTOR_TIME as never)
                    }
                  />
                </RN.View>
              </RN.View>
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(CreateSector);

const styles = RN.StyleSheet.create({
  container: {
    
  },
  content: {
    justifyContent: 'space-between',
  },
  watchBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bakkouraWatch: {},
  bakkouraWatchHours: {
    position: 'absolute',
    top: 25,
    zIndex: 1,
  },
  bottomBox: {
    borderRadius: 5,
    paddingHorizontal: 10,
    gap: 10
  },
  bottom: {
    backgroundColor: COLORS.black,
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  scrollView: {
    height: windowHeight - windowHeight / 6,
  },
  text: {
    color: COLORS.yellow,
  },
});
