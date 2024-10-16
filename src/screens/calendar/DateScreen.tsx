import DateList, {ItemType} from '../../components/DataLists/DataLists';
import {
  PossibleDaysInMonth,
  getData,
  numberOfDaysIn,
  _getTimeData,
  _getDateData,
  formattedDate,
} from '../../helper/helper';
import dayjs from 'dayjs';
import {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import RN from '../../components/RN';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {useNavigation} from '@react-navigation/native';
import useRootStore from '../../hooks/useRootStore';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {APP_ROUTES} from '../../navigation/routes';
import {observer} from 'mobx-react-lite';
import DataListLinearBack from '../../components/DataListLinearBack/DataListLinearBack';

const DateScreen = () => {
  const navigation = useNavigation();
  const {setNewEventState, newEventData, calculateRemainingTime} =
    useRootStore().calendarStore;
  const [numberOfDays, setNumberOfDays] = useState<PossibleDaysInMonth>(
    numberOfDaysIn(new Date().getMonth() + 1, new Date().getFullYear()),
  );

  const startListData = getData('date', 0, {numberOfDays, is24Hour: false});
  const middleListData = _getDateData(1, {});
  const lastListData = getData('date', 2);

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

  const selectedMiddleItem = useRef<number>(
    'date' === 'date' ? new Date().getMonth() : new Date().getMinutes(),
  );

  const initialScrollIndexStart = getInitialScrollIndex(
    selectedStartItem.current,
    startListData,
  );

  const initialScrollIndexMiddle = getInitialScrollIndex(
    selectedMiddleItem.current,
    middleListData,
  );
  const initialScrollIndexLast = getInitialScrollIndex(
    selectedMiddleItem.current,
    lastListData,
  );

  const firstSelectedValue = useRef<number | Date>(1);
  const secondSelectedValue = useRef<number | Date>(1);
  const thirdSelectedValue = useRef<number | Date>(1);

  const [day, setDay] = useState(newEventData.day);
  const [month, setMonth] = useState(newEventData.month);
  const [year, setyear] = useState(
    newEventData.year ? newEventData.year : new Date().getFullYear(),
  );

  const firstHandleChange = () => {
    const value = firstSelectedValue.current;
    setDay(value as never);
  };
  const secondHandleChange = () => {
    const value = secondSelectedValue.current;
    setMonth(value as never);
  };
  const thirdHandleChange = () => {
    const value = thirdSelectedValue.current;
    setyear(value as never);
  };

  const okDate = () => {
    setNewEventState('day', day as never);
    setNewEventState('month', month as never);
    setNewEventState('year', year as never);
    setNewEventState('date', [formattedDate(day, month, year, 3)] as never);
    calculateRemainingTime();
    navigation.navigate(APP_ROUTES.NEW_EVENT as never);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Date"
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
              label={'Day'}
              selectedValue={firstSelectedValue}
              initialScrollIndex={initialScrollIndexStart}
            />
            <DateList
              data={middleListData}
              itemHeight={55}
              selectedValue={secondSelectedValue}
              onChange={secondHandleChange}
              style={styles.middleListStyle}
              label={'Month.'}
              initialScrollIndex={initialScrollIndexMiddle}
            />
            <DateList
              data={lastListData}
              itemHeight={55}
              selectedValue={thirdSelectedValue}
              onChange={thirdHandleChange}
              style={styles.middleListStyle}
              label={'Year'}
              initialScrollIndex={0}
            />
            <DataListLinearBack />
          </RN.View>
          <RN.View style={styles.okBtn}>
            <StartBtn
              onPress={okDate}
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

export default observer(DateScreen);

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
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
