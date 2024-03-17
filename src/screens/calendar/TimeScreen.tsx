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

const TimeScreen = () => {
  const {setNewEventState, newEventData} = useRootStore().calendarStore;
  const navigation = useNavigation();

  const startListData = _getTimeData(0, {is24Hour: true, minuteInterval: 0});

  const middleListData = _getTimeData(1, {minuteInterval: 0});
  const lastListData = _getTimeData(1, {minuteInterval: 0});

  const selectedStartItem = useRef<number>(
    'date' === 'date'
      ? new Date().getDate()
      : false
      ? new Date().getHours()
      : new Date().getHours() < 13
      ? new Date().getHours() === 0
        ? 12
        : new Date().getHours()
      : new Date().getHours() - 12,
  );

  const selectedMiddleItem = useRef<number>(
    'date' === 'date' ? new Date().getMonth() : new Date().getMinutes(),
  );

  const getInitialScrollIndex = (
    preSelected: number | Date,
    data: Array<ItemType>,
    isDate?: boolean,
  ) => {
    if (preSelected === -1) {
      return data.length - 2;
    }

    let index = data.findIndex(item => {
      if (isDate)
        return (
          dayjs(item.value).format('DD/MM/YYYY') ===
          dayjs(preSelected).format('DD/MM/YYYY')
        );
      return item.value === preSelected;
    });
    index = index - 1;
    index = index < 0 ? 0 : index;

    return index;
  };

  const firstSelectedValue = useRef<number | Date>(0);
  const secondSelectedValue = useRef<number | Date>(0);
  const thirdSelectedValue = useRef<number | Date>(0);

  const firstHandleChange = () => {
    const value = firstSelectedValue.current;
    const newValue = value;
    setNewEventState('hour', newValue as never);
  };
  const secondHandleChange = () => {
    const value = secondSelectedValue.current;
    const newValue = value;
    setNewEventState('minut', newValue as never);
  };
  const thirdHandleChange = () => {
    const value = thirdSelectedValue.current;
    const newValue = value;
    setNewEventState('second', newValue as never);
  };

  const okTime = () => {
    if (newEventData.hour > 0 || newEventData.minut > 0) {
      firstHandleChange();
      secondHandleChange();
      thirdHandleChange();
      navigation.navigate(APP_ROUTES.NEW_EVENT as never);
    } else {
      console.log('choose time');
    }
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Time"
            rightItem={
              <RN.TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => navigation.goBack()}>
                <RN.Text style={styles.cancelTxt}>Cancel</RN.Text>
              </RN.TouchableOpacity>
            }
          />
          <RN.View style={styles.row}>
            <DateList
              data={startListData}
              itemHeight={55}
              onChange={firstHandleChange}
              selectedValue={firstSelectedValue}
              label="Hours"
              initialScrollIndex={0}
            />
            <DateList
              data={middleListData}
              itemHeight={55}
              selectedValue={secondSelectedValue}
              onChange={secondHandleChange}
              label={'Min.'}
              style={styles.middleListStyle}
              initialScrollIndex={0}
            />
            <DateList
              data={lastListData}
              itemHeight={55}
              selectedValue={thirdSelectedValue as never}
              onChange={thirdHandleChange}
              label={'Sec.'}
              style={styles.middleListStyle}
              initialScrollIndex={0}
            />
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
