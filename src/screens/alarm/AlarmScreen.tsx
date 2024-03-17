import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useMemo} from 'react';
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
import {AlarmListsItemType} from '../../types/alarm';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';

const AlarmScreen = () => {
  const {alarmsListData, handleInactiveAlarm, handleDeleteAlarm} =
    useRootStore().alarmStore;
  const navigation = useNavigation();

  const renderLeftActions = id => {
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
        <LinearGradient
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          colors={
            item.isActive
              ? ['#0D0D0D', '#051222', '#00448E']
              : [COLORS.black, COLORS.black]
          }
          style={styles.itemContainer}>
          <RN.View style={styles.timeBox}>
            <RN.Text
              style={[
                styles.time,
                {color: item.isActive ? COLORS.green : COLORS.white},
              ]}>
              {item.time}
            </RN.Text>
            <TextView style={styles.desc} text={item.description} />
          </RN.View>
          <SimpleSwitch
            active={item.isActive}
            handlePress={() => handleInactiveAlarm(index)}
          />
        </LinearGradient>
      </Swipeable>
    );
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Alarm clock"
            rightItem={<Images.Svg.timerLogo />}
          />
          <RN.View style={styles.alarmsBox}>
            <RN.View style={styles.flatList}>
              <FlatList
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<ListEmptyComp title="No Alarm yet" />}
                data={alarmsListData}
                renderItem={renderItem}
              />
            </RN.View>
            <RN.View>
              <StartBtn
                subWidth={70}
                elWidth={55}
                primary
                text="+"
                textSize={30}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.NEW_ALARM_SCREEN as never)
                }
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(AlarmScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  flatList: {
    height: '85%',
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
    height: '80%',
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
});
