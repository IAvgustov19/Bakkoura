import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SelectItem from '../../components/SelectItem/SelectItem';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {ToDoTaskNameDataType, TodoTimerDataType} from '../../types/alarm';
import {COLORS} from '../../utils/colors';
import {ToDoTaskNameData, ToDoTaskNameData_ar} from '../../utils/repeat';
import {windowHeight} from '../../utils/styles';
import { t } from '../../i18n';

import l from '../../i18n'

const TaskName = () => {
  const {hide} = useRootStore().visibleStore;
  const {themeState} = useRootStore().personalAreaStore;
  const {setNewTaskState, taskState} = useRootStore().todoTimer;
  const navigation = useNavigation();

  const onHandleNameOk = () => {
    if (taskState.name) {
      navigation.goBack();
    }
  };

  const onSelectName = (item: ToDoTaskNameDataType) => {
    setNewTaskState('name', item.title);
    setNewTaskState('key', item.key);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("Task name")}`}
          />
          <RN.View style={styles.content}>
            <RN.View
              style={[styles.list, {backgroundColor: themeState.mainBack}]}>
              {
                l.locale == "English" ?
                <RN.View>
                  {ToDoTaskNameData.map((item, index) => {
                return (
                  <RN.View key={index}>
                    <SelectItem
                      title={item.title}
                      isActive={taskState.name === item.title}
                      onPress={() => onSelectName(item)}
                      color={themeState.title}
                    />
                    {ToDoTaskNameData.length !== item.id ? <Line /> : null}
                  </RN.View>
                );
              })}
                </RN.View>
                :
                <RN.View>
                  {ToDoTaskNameData_ar.map((item, index) => {
                return (
                  <RN.View key={index}>
                    <SelectItem
                      title={item.title}
                      isActive={taskState.name === item.title}
                      onPress={() => onSelectName(item)}
                      color={themeState.title}
                    />
                    {ToDoTaskNameData.length !== item.id ? <Line /> : null}
                  </RN.View>
                );
              })}
                </RN.View>
              }
            </RN.View>
            <RN.View style={styles.btn}>
              <StartBtn
                text={`${t("ok")}`}
                primary
                subWidth={70}
                elWidth={55}
                onPress={onHandleNameOk}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(TaskName);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 5,
  },
  list: {
    backgroundColor: COLORS.black,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  btn: {
    alignItems: 'center',
  },
});
