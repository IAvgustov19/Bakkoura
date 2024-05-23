import {useNavigation} from '@react-navigation/native';
import {color} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RectButton, Swipeable} from 'react-native-gesture-handler';
import {Images} from '../../../assets';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import ListEmptyComp from '../../../components/ListEmptyComp/ListEmtyComp';
import ListFooter from '../../../components/ListFooter/ListFooter';
import RN from '../../../components/RN';
import {formattedDate} from '../../../helper/helper';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import {NewEventStateType} from '../../../types/calendar';
import {COLORS} from '../../../utils/colors';
import EventItem from './EventItem';

type Props = {
  isShowDate?: boolean;
  leftLine?: boolean;
  borderRaduis?: number;
};

const Events: React.FC<Props> = ({
  borderRaduis = 5,
  isShowDate = true,
  leftLine,
}) => {
  const {allEventsData, secondsToHMS, getOneEvent, handleDeleteEvent} =
    useRootStore().calendarStore;

  const navigation = useNavigation();

  const [isFinished, setIsFinished] = useState<boolean[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedFinishedStatus = allEventsData.map(event => {
        const remainingTime =
          event.stayedDay * 24 * 60 + event.stayedHour * 60 + event.stayedMinut;
        return remainingTime == 0;
      });
      setIsFinished(updatedFinishedStatus);
    }, 1000);

    return () => clearInterval(interval);
  }, [allEventsData]);

  const onGetHandle = (item: NewEventStateType) => {
    navigation.navigate(APP_ROUTES.NEW_EVENT as never);
    getOneEvent(item);
  };

  const renderLeftActions = (id: number) => {
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => handleDeleteEvent(id)}>
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
        onSwipeableWillOpen={() => handleDeleteEvent(item.id)}>
        <RN.View style={styles.itemContainer}>
          <EventItem
            key={index}
            eventName={item.name}
            isShowDate={isShowDate}
            borderRadius={borderRaduis}
            leftLine={leftLine}
            already={item.already}
            date={formattedDate(item.day, item.month, item.year, 2)}
            finished={isFinished[index]}
            time={`${item.stayedDay} days ${
              item.stayedHour < 10 ? `0${item.stayedHour}` : item.stayedHour
            }:${
              item.stayedMinut < 10 ? `0${item.stayedMinut}` : item.stayedMinut
            } hours`}
            onPress={() => onGetHandle(item)}
          />
        </RN.View>
      </Swipeable>
    );
  };

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.eventsTypeList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ListEmptyComp title="No event yet" />}
          data={allEventsData}
          renderItem={renderItem}
          ListFooterComponent={<ListFooter />}
        />
      </RN.View>
    </RN.View>
  );
};

export default observer(Events);

const styles = RN.StyleSheet.create({
  container: {
    height: '90%',
  },
  itemContainer: {},
  eventsTypeList: {
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  noEventYet: {
    textAlign: 'center',
    color: COLORS.grey,
    fontSize: 20,
  },
  rightAction: {
    backgroundColor: COLORS.darkRed,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '80%',
    marginTop: '1%',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 15,
  },
});
