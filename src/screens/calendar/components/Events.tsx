import {color} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import React from 'react';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import EventItem from './EventItem';

const Events = () => {
  const {allEventsData, secondsToHMS} = useRootStore().calendarStore;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.eventsTypeList}>
        {allEventsData.length > 0 ? (
          <RN.ScrollView style={styles.scrollView}>
            {allEventsData.map((item, index) => {
              return (
                <EventItem
                  key={index}
                  eventName={item.name}
                  date={`${item.day < 10 ? `0${item.day}` : item.day}.${
                    item.month < 10 ? `0${item.month}` : item.month
                  }.${item.year}`}
                  time={`${item.stayedDay} days ${
                    item.stayedHour < 10
                      ? `0${item.stayedHour}`
                      : item.stayedHour
                  }:${
                    item.stayedMinut < 10
                      ? `0${item.stayedMinut}`
                      : item.stayedMinut
                  } hours`}
                />
              );
            })}
          </RN.ScrollView>
        ) : (
          <RN.Text style={styles.noEventYet}>No events yet</RN.Text>
        )}
      </RN.View>
    </RN.View>
  );
};

export default observer(Events);

const styles = RN.StyleSheet.create({
  cancelBtn: {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  cancelTxt: {
    color: '#656E77',
    fontSize: 16,
  },
  container: {
    // paddingHorizontal: 10,
  },
  scrollView: {
    height: '90%',
  },
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
});
