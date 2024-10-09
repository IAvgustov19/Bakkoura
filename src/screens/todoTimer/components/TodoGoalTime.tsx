import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useRef} from 'react';
import DateList, {ItemType} from '../../../components/DataLists/DataLists';
import dayjs from 'dayjs';
import RN from '../../../components/RN';
import {_getTimeData} from '../../../helper/helper';
import useRootStore from '../../../hooks/useRootStore';
import DataListLinearBack from '../../../components/DataListLinearBack/DataListLinearBack';
import { t } from '../../../i18n';

type Props = {
  okOnPress?: () => void;
};

const TodoGoalTime: React.FC<Props> = ({okOnPress}) => {
  const navigation = useNavigation();
  const {setNewTaskState, setTime} = useRootStore().todoTimer;
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
    setNewTaskState('hours', value);
    setTime();
  };
  const secondHandleChange = () => {
    const value = secondSelectedValue.current;
    setNewTaskState('minutes', value);
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
          label={`${t("hours")}`}
          initialScrollIndex={0}
        />
        <DateList
          data={middleListData}
          itemHeight={55}
          selectedValue={secondSelectedValue}
          onChange={secondHandleChange}
          label={`${t("minute")}`}
          style={styles.middleListStyle}
          initialScrollIndex={0}
        />
        <DataListLinearBack />
      </RN.View>
    </RN.View>
  );
};

export default observer(TodoGoalTime);

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
