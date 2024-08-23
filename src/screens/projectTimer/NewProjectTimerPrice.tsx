import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import DateList, {ItemType} from '../../components/DataLists/DataLists';
import {priceData, _getTimeData} from '../../helper/helper';
import {observer} from 'mobx-react-lite';
import dayjs from 'dayjs';
import useRootStore from '../../hooks/useRootStore';
import DataListLinearBack from '../../components/DataListLinearBack/DataListLinearBack';

const NewProjectTimerPrice = () => {
  const {setNewProjectTimeState, newProjectTimerState} =
    useRootStore().projectTimer;
  const firstSelectedValue = useRef<number>(0);

  const selectPrice = () => {
    const value = firstSelectedValue.current;
    setNewProjectTimeState('price', `${value}`);
  };

  const navigation = useNavigation();

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Price"
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.priceBox}>
              <DateList
                data={priceData}
                itemHeight={55}
                onChange={selectPrice}
                selectedValue={firstSelectedValue}
                label="  $ / H"
                labelLeft={'60%'}
                initialScrollIndex={Number(newProjectTimerState.price)}
              />
              <DataListLinearBack top={160} />
            </RN.View>
            <StartBtn
              text="Ok"
              onPress={() => navigation.goBack()}
              primary
              subWidth={70}
              elWidth={55}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(NewProjectTimerPrice);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  priceBox: {
    justifyContent: 'center',
    height: '50%',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  content: {
    height: '88%',
    justifyContent: 'space-between',
  },
});
