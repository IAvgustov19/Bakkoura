import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useRef, useState} from 'react';
import DateList, {ItemType} from '../../../components/DataLists/DataLists';
import dayjs from 'dayjs';
import RN from '../../../components/RN';
import {_getTimeData} from '../../../helper/helper';
import useRootStore from '../../../hooks/useRootStore';
import Line from '../../../components/Line/Line';
import {Images} from '../../../assets';
import DataListLinearBack from '../../../components/DataListLinearBack/DataListLinearBack';

import {t} from '../../../i18n'

type Props = {
  okOnPress?: () => void;
};

const SetSectorTime: React.FC<Props> = ({okOnPress}) => {
  const navigation = useNavigation();
  const {setNewSelectState, setStartEnd} = useRootStore().bakkouraWatchStore;

  const startListData = _getTimeData(0, {is24Hour: false, minuteInterval: 0});
  const middleListData = _getTimeData(1, {minuteInterval: 0});

  const selectedStartItem = useRef<number>(new Date().getHours());
  const selectedMiddleItem = useRef<number>(new Date().getMinutes());

  const fromHourSelectedValue = useRef<number>(0);
  const fromMinutSelectedValue = useRef<number>(0);

  const toHourSelectedValue = useRef<number>(0);
  const toMinutSelectedValue = useRef<number>(0);

  const fromHourChange = () => {
    const value = fromHourSelectedValue.current;
    setNewSelectState('fromHour', value);
    setStartEnd();
  };
  const fromMinutChange = () => {
    const value = fromMinutSelectedValue.current;
    setNewSelectState('fromMin', value);
    setStartEnd();
  };

  const toHourChange = () => {
    const value = toHourSelectedValue.current;
    setNewSelectState('toHour', value);
    setStartEnd();
  };
  const toMinutChange = () => {
    const value = toMinutSelectedValue.current;
    setNewSelectState('toMin', value);
    setStartEnd();
  };

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.row}>
        <DateList
          data={startListData}
          itemHeight={40}
          onChange={fromHourChange}
          selectedValue={fromHourSelectedValue}
          label={t("hour")}
          initialScrollIndex={0}
        />
        <DateList
          data={middleListData}
          itemHeight={40}
          selectedValue={fromMinutSelectedValue}
          onChange={fromMinutChange}
          label={t("minute")}
          style={styles.middleListStyle}
          initialScrollIndex={0}
        />
        <DataListLinearBack top={80} height={40} />
      </RN.View>
      <Images.Svg.betweenTimesLine />
      <RN.View style={styles.row}>
        <DateList
          data={startListData}
          itemHeight={40}
          onChange={toHourChange}
          selectedValue={toHourSelectedValue}
          label={t("hour")}
          initialScrollIndex={0}
        />
        <DateList
          data={middleListData}
          itemHeight={40}
          selectedValue={toMinutSelectedValue}
          onChange={toMinutChange}
          label={t("minute")}
          style={styles.middleListStyle}
          initialScrollIndex={0}
        />
        <DataListLinearBack top={80} height={40} />
      </RN.View>
    </RN.View>
  );
};

export default observer(SetSectorTime);

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
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  middleListStyle: {
    marginHorizontal: 0,
  },
});
