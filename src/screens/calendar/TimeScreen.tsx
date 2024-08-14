import DateList, {ItemType} from '../../components/DataLists/DataLists';
import {_getTimeData} from '../../helper/helper';
import dayjs from 'dayjs';
import {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import RN from '../../components/RN';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import DataListLinearBack from '../../components/DataListLinearBack/DataListLinearBack';
import Cancel from '../../components/Cancel/Cancel';

const TimeScreen = () => {
  const {setNewEventState, newEventData} = useRootStore().calendarStore;
  const navigation = useNavigation();
  const startListData = _getTimeData(0, {is24Hour: true, minuteInterval: 0});
  const middleListData = _getTimeData(1, {minuteInterval: 0});
  const lastListData = _getTimeData(1, {minuteInterval: 0});

  const firstSelectedValue = useRef<number | Date>(0);
  const secondSelectedValue = useRef<number | Date>(0);
  const thirdSelectedValue = useRef<number | Date>(0);

  const [hours, setHours] = useState(newEventData.hour);
  const [minutes, setMinutes] = useState(newEventData.minut);
  const [secons, setSeconds] = useState(newEventData.second);

  const firstHandleChange = () => {
    const hours = firstSelectedValue.current;
    setHours(hours as never);
  };
  const secondHandleChange = () => {
    const minutes = secondSelectedValue.current;
    setMinutes(minutes as never);
  };
  const thirdHandleChange = () => {
    const seconds = thirdSelectedValue.current;
    setSeconds(seconds as never);
  };

  const okTime = () => {
    setNewEventState('hour', hours as never);
    setNewEventState('minut', minutes as never);
    setNewEventState('second', secons as never);
    navigation.navigate(APP_ROUTES.NEW_EVENT as never);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Time"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.row}>
            <DateList
              data={startListData}
              itemHeight={55}
              onChange={firstHandleChange}
              selectedValue={firstSelectedValue}
              label="Hours"
              initialScrollIndex={newEventData.hour}
            />
            <DateList
              data={middleListData}
              itemHeight={55}
              selectedValue={secondSelectedValue}
              onChange={secondHandleChange}
              label={'Min.'}
              style={styles.middleListStyle}
              initialScrollIndex={newEventData.minut}
            />
            <DateList
              data={lastListData}
              itemHeight={55}
              selectedValue={thirdSelectedValue as never}
              onChange={thirdHandleChange}
              label={'Sec.'}
              style={styles.middleListStyle}
              initialScrollIndex={newEventData.second}
            />
            <DataListLinearBack />
          </RN.View>
          <RN.View style={styles.okBtn}>
            <StartBtn
              onPress={okTime}
              primary={true}
              text="OK"
              subWidth={70}
              elWidth={55}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(TimeScreen);

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    height: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  middleListStyle: {
    marginHorizontal: 0,
  },
  okBtn: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
    width: '100%',
  },
});
