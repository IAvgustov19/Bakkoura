import {useIsFocused, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';
import AlarmClock from './components/AlarmClock';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import ListFooter from '../../components/ListFooter/ListFooter';
import {windowHeight} from '../../utils/styles';
import AlarmListItem from './components/AlarmListItem';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

const AlarmScreen = () => {
  const {
    alarmsListData,
    handleInactiveAlarm,
    handleDeleteAlarm,
    fetchAlarmsData,
    activeAlarm,
  } = useRootStore().alarmStore;
  const [isClock, setClock] = useState(true);
  const [is24h, setIs24h] = useState(true);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchAlarmsData();
  }, [isFocused]);

  const renderLeftActions = (id: number) => {
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => handleDeleteAlarm(id)}>
        <RN.View>
          <Images.Svg.whiteDelete />
        </RN.View>
      </RectButton>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <Swipeable
        key={index}
        renderRightActions={() => renderLeftActions(item.id)}
        onSwipeableWillOpen={() => handleDeleteAlarm(item.id)}>
        <AlarmListItem
          isActive={item.isActive}
          time={item.time}
          name={item.name}
          handleInactiveAlarm={() => handleInactiveAlarm(item.id)}
        />
      </Swipeable>
    );
  };

  const renderClock = useCallback(() => {
    if (activeAlarm) {
      return <AlarmClock is24h={is24h} />;
    } else {
      return (
        <RN.View style={styles.alarmsBox}>
          <RN.View style={styles.flatList}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<ListEmptyComp title="No Alarm yet" />}
              data={alarmsListData}
              renderItem={renderItem}
              ListFooterComponent={<ListFooter />}
            />
          </RN.View>
          <RN.View style={styles.btnBox}>
            <StartBtn
              subWidth={70}
              elWidth={55}
              primary
              icon={<Images.Svg.btnAddIcon />}
              onPress={() =>
                navigation.navigate(APP_ROUTES.NEW_ALARM_SCREEN as never)
              }
            />
          </RN.View>
        </RN.View>
      );
    }
  }, [isClock, is24h, alarmsListData, activeAlarm]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Alarm clock"
            rightItem={
              isClock ? (
                <SwitchContain
                  title="24h"
                  _title="30h"
                  back={is24h}
                  handlePress={() => setIs24h(e => !e)}
                />
              ) : (
                <Images.Svg.timerLogo />
              )
            }
          />
          {/* <RN.TouchableOpacity onPress={() => setClock(e => !e)}>
            <Images.Svg.dotOpenBar />
          </RN.TouchableOpacity> */}
          {renderClock()}
        </RN.View>
      }
    />
  );
};

export default observer(AlarmScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  flatList: {
    height: '100%',
  },
  rightAction: {
    backgroundColor: COLORS.darkRed,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '90%',
    marginTop: '1.5%',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 15,
  },
  alarmsBox: {
    height: windowHeight - windowHeight / 6,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.black,
    borderRadius: 5,
    marginVertical: 3,
  },
  timeBox: {
    gap: 5,
  },
  time: {
    fontSize: 36,
    color: COLORS.white,
    fontWeight: '200',
  },
  desc: {
    textAlign: 'left',
  },
  btnBox: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 10,
  },
});
