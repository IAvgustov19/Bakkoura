import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import DateList, {ItemType} from '../../components/DataLists/DataLists';
import dayjs from 'dayjs';
import {
  PossibleDaysInMonth,
  getData,
  numberOfDaysIn,
  _getTimeData,
  _getDateData,
  formattedDate,
} from '../../helper/helper';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {windowHeight} from '../../utils/styles';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../hooks/useRootStore';

const FromDate = () => {
  const navigation = useNavigation();
  const {setAddEtapState} = useRootStore().togetherTimeStore;
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
    index = index < 0 ? 0 : index - 1;

    return index;
  };
  const getSecondScrollIndex = (
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

  const initialScrollIndexStart = getInitialScrollIndex(
    selectedStartItem.current,
    startListData,
  );

  const initialScrollIndexMiddle = getSecondScrollIndex(
    selectedMiddleItem.current,
    middleListData,
  );

  const firstSelectedValue = useRef<number | Date>(1);
  const secondSelectedValue = useRef<number | Date>(1);
  const thirdSelectedValue = useRef<number | Date>(2024);

  const HandleChange = () => {
    const day = firstSelectedValue.current;
    const month = secondSelectedValue.current;
    const year = thirdSelectedValue.current;
    setAddEtapState('fromDate', formattedDate(day, month, year));
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Date"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.row}>
              <DateList
                data={startListData}
                itemHeight={55}
                onChange={HandleChange}
                label={'Day'}
                selectedValue={firstSelectedValue}
                initialScrollIndex={initialScrollIndexStart}
              />
              <DateList
                data={middleListData}
                itemHeight={55}
                selectedValue={secondSelectedValue}
                onChange={HandleChange}
                style={styles.middleListStyle}
                label={'Month.'}
                initialScrollIndex={initialScrollIndexMiddle}
              />
              <DateList
                data={lastListData}
                itemHeight={55}
                selectedValue={thirdSelectedValue}
                onChange={HandleChange}
                style={styles.middleListStyle}
                label={'Year'}
                initialScrollIndex={getInitialScrollIndex(
                  selectedMiddleItem.current,
                  lastListData,
                )}
              />
            </RN.View>
            <StartBtn text="Ok" primary onPress={() => navigation.goBack()} />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(FromDate);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 5,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  middleListStyle: {
    marginHorizontal: 0,
  },
});
