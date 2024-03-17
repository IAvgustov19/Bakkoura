import DateList, {ItemType} from '../../../components/DataLists/DataLists';
import {
  PossibleDaysInMonth,
  getData,
  numberOfDaysIn,
  _getTimeData,
  generateMinutesList,
} from '../../../helper/helper';
import dayjs from 'dayjs';
import {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import RN from '../../../components/RN';
import SwitchContain from '../../../components/SwitchContain/SwitchContain';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';

const FirstTimer = () => {
  const [numberOfDays, setNumberOfDays] = useState<PossibleDaysInMonth>(
    numberOfDaysIn(new Date().getMonth() + 1, new Date().getFullYear()),
  );
  const {setFirstTimer, firstTimerValue} = useRootStore().timerStore;

  const startListData = _getTimeData(0, {is24Hour: true, minuteInterval: 0});

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

  const middleListData = _getTimeData(1, {minuteInterval: 0});
  const lastListData = _getTimeData(1, {minuteInterval: 1});

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
    setFirstTimer('hours', value);
  };
  const secondHandleChange = () => {
    const value = secondSelectedValue.current;
    setFirstTimer('minut', value);
  };
  const thirdHandleChange = () => {
    const value = thirdSelectedValue.current;
    setFirstTimer('second', value);
  };

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.row}>
        <DateList
          data={startListData}
          itemHeight={55}
          onChange={firstHandleChange}
          selectedValue={firstSelectedValue}
          label="Hours"
          initialScrollIndex={getInitialScrollIndex(
            selectedStartItem.current,
            startListData,
          )}
        />
        <DateList
          data={middleListData}
          itemHeight={55}
          selectedValue={secondSelectedValue}
          onChange={secondHandleChange}
          label={'Min.'}
          style={styles.middleListStyle}
          initialScrollIndex={getInitialScrollIndex(
            selectedMiddleItem.current,
            middleListData,
          )}
        />
        <DateList
          data={lastListData}
          itemHeight={55}
          selectedValue={thirdSelectedValue}
          onChange={thirdHandleChange}
          label={'Sec.'}
          style={styles.middleListStyle}
          initialScrollIndex={getInitialScrollIndex(
            selectedMiddleItem.current,
            lastListData,
          )}
        />
      </RN.View>
    </RN.View>
  );
};
export default observer(FirstTimer);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  middleListStyle: {
    marginHorizontal: 0,
  },
});
