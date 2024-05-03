import {useNavigation} from '@react-navigation/native';
import {Canvas} from '@shopify/react-native-skia';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../assets';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextView from '../../components/Text/Text';
import {genPos} from '../../helper/chart';
import {diagonalTime, formattedTime} from '../../helper/helper';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {moderateScale} from '../../utils/dimensions';
import {windowHeight} from '../../utils/styles';
import Vertices from './components/Vertices';

const CreateSector = () => {
  const navigation = useNavigation();
  const {
    selectedSectorColor,
    addNewSelect,
    newSelectState,
    deleteSelect,
    listSelects,
    clearState,
  } = useRootStore().bakkouraWatchStore;

  const CreateSector = () => {
    addNewSelect(() => navigation.navigate(APP_ROUTES.BAKKOURA_WATCH as never));
  };

  const onBackHandle = () => {
    navigation.goBack();
    clearState();
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Sector"
            rightItem={<Cancel onClose={onBackHandle} />}
          />
          <RN.ScrollView
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <Vertices
                data={listSelects.map(value => ({
                  color: value.color,
                  start: value.start,
                  end: value.end,
                }))}
              />
              <RN.View style={styles.bottomBox}>
                <RN.View style={styles.btnBox}>
                  <StartBtn
                    text="Delete"
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
                    text="Ok"
                    elWidth={55}
                    subWidth={70}
                    primary
                    onPress={CreateSector}
                    textSize={14}
                  />
                </RN.View>
                <RN.View style={styles.bottom}>
                  <ListItemCont
                    title="Name"
                    value={newSelectState.name}
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.SECTOR_NAME as never)
                    }
                  />
                  <Line />
                  <ListItemCont
                    title="Color"
                    value={
                      <Images.Svg.smallColorBox
                        fill={
                          selectedSectorColor.color
                            ? selectedSectorColor.color
                            : newSelectState.color
                            ? newSelectState.color
                            : 'transparent'
                        }
                      />
                    }
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.SECTOR_COLOR as never)
                    }
                  />
                  <Line />
                  <ListItemCont
                    title="Time"
                    value={
                      formattedTime(
                        newSelectState.fromHour,
                        newSelectState.fromMin,
                      ) +
                      '-' +
                      formattedTime(newSelectState.toHour, newSelectState.toMin)
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
    paddingHorizontal: 5,
  },
  content: {
    // height: windowHeight - windowHeight / 6,
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
    gap: 10,
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
