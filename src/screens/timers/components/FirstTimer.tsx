import DateList from '../../../components/DataLists/DataLists';
import {_getTimeData} from '../../../helper/helper';
import {useRef} from 'react';
import {StyleSheet} from 'react-native';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import DataListLinearBack from '../../../components/DataListLinearBack/DataListLinearBack';

const FirstTimer = () => {
  const {setFirstTimer, setAllTime, timerStatus} = useRootStore().timerStore;

  const startListData = _getTimeData(2, {
    is24Hour: false,
    minuteInterval: 0,
    is30h: !timerStatus.h24,
  });

  const middleListData = _getTimeData(1, {minuteInterval: 0});
  const lastListData = _getTimeData(1, {
    minuteInterval: 1,
    is48m: !timerStatus.h24,
  });

  const firstSelectedValue = useRef<number | Date>(0);
  const secondSelectedValue = useRef<number | Date>(0);
  const thirdSelectedValue = useRef<number | Date>(0);

  const firstHandleChange = () => {
    const value = firstSelectedValue.current;
    setFirstTimer('hours', value);
    setAllTime();
  };
  const secondHandleChange = () => {
    const value = secondSelectedValue.current;
    setFirstTimer('minut', value);
    setAllTime();
  };
  const thirdHandleChange = () => {
    const value = thirdSelectedValue.current;
    setFirstTimer('second', value);
    setAllTime();
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
          selectedValue={thirdSelectedValue}
          onChange={thirdHandleChange}
          label={'Sec.'}
          style={styles.middleListStyle}
          initialScrollIndex={10}
        />
        <DataListLinearBack />
      </RN.View>
    </RN.View>
  );
};
export default observer(FirstTimer);

const styles = StyleSheet.create({
  linear: {
    position: 'absolute',
    width: '100%',
    height: 55,
    top: 110,
    zIndex: -1,
  },
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
