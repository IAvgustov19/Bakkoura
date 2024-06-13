import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useMemo, useState} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';
import OutlineBtn from '../../components/OutlineBtn/OutlineBtn';
import RN from '../../components/RN';
import {secondsToHMS} from '../../helper/helper';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {HistoryData} from '../../utils/repeat';
import HistoryListItem from './components/HistoryListItem';

const ToDoTimerHistory = () => {
  const {hide} = useRootStore().visibleStore;
  const {tasksListClone, getOneTask, filterItemsByTime, filterType} =
    useRootStore().todoTimer;
  const navifation = useNavigation();

  const onFilterTasks = (time: string) => {
    filterItemsByTime(time);
  };

  const renderList = useCallback(() => {
    {
      return tasksListClone.length > 0 ? (
        tasksListClone.map((item, index) => {
          return (
            <HistoryListItem
              key={index}
              name={item.name}
              time={secondsToHMS(item.timestamp)}
              onPress={() =>
                getOneTask(item, () =>
                  navifation.navigate(APP_ROUTES.NEW_TASK as never),
                )
              }
            />
          );
        })
      ) : (
        <ListEmptyComp title="No to do timer" />
      );
    }
  }, [tasksListClone]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navifation.goBack()} />}
            title="History"
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.breakTimeBox}>
              {HistoryData.map((item, index) => {
                return (
                  <OutlineBtn
                    key={index}
                    text={item.title}
                    textColor={filterType === item.key && COLORS.yellow}
                    borderColor={filterType === item.key && COLORS.yellow}
                    onPress={() => onFilterTasks(item.key)}
                    Width={'30%'}
                  />
                );
              })}
            </RN.View>
            <RN.View style={styles.historyList}>
              <RN.ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {renderList()}
              </RN.ScrollView>
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(ToDoTimerHistory);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    gap: 20,
  },
  breakTimeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyList: {
    gap: 10,
    height: '85%',
  },
});
