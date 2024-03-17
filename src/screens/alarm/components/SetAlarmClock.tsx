import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useRef} from 'react';
import DateList, {ItemType} from '../../../components/DataLists/DataLists';
import dayjs from 'dayjs';
import RN from '../../../components/RN';
import {_getTimeData} from '../../../helper/helper';
import useRootStore from '../../../hooks/useRootStore';

type Props = {
  okOnPress?: () => void;
};

const SetAlarmClock: React.FC<Props> = ({okOnPress}) => {
  const navigation = useNavigation();
  const {setNewAlarmState, alarmItemData, setTime} = useRootStore().alarmStore;

  const startListData = _getTimeData(0, {is24Hour: true, minuteInterval: 0});
  const middleListData = _getTimeData(1, {minuteInterval: 0});

  const selectedStartItem = useRef<number>(new Date().getHours());
  const selectedMiddleItem = useRef<number>(new Date().getMinutes());

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
          dayjs(item.value).format('HH/MM') ===
          dayjs(preSelected).format('HH/MM')
        );
      return item.value === preSelected;
    });

    index += 1;

    return index;
  };

  const firstSelectedValue = useRef<number | Date>(0);
  const secondSelectedValue = useRef<number | Date>(0);

  const firstHandleChange = () => {
    const value = firstSelectedValue.current;
    const newValue = value < 10 ? `0${value}` : value;
    setNewAlarmState('hours', newValue as never);
    setTime();
  };
  const secondHandleChange = () => {
    const value = secondSelectedValue.current;
    const newValue = value < 10 ? `0${value}` : value;
    setNewAlarmState('minutes', newValue as never);
    setTime();
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
            middleListData,
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
      </RN.View>
    </RN.View>
  );
};

export default observer(SetAlarmClock);

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
    paddingHorizontal: 50,
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
});
