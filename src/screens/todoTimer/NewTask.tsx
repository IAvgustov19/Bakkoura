import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import GeneralModal from '../../components/GeneralModal/GeneralModal';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {TodoTimerResults} from '../../constants/todoTimer';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {windowHeight} from '../../utils/styles';

const NewTask = () => {
  const navigation = useNavigation();
  const {visible, show} = useRootStore().visibleStore;
  const {taskState, isHas, createNewTask, clearState} =
    useRootStore().todoTimer;

  const onCreateNewTask = () => {
    createNewTask(() => navigation.navigate(APP_ROUTES.TODOTIMER as never));
  };

  const onHandleBack = () => {
    navigation.goBack();
    clearState();
  };

  const renderRecomended = useCallback(() => {
    if (taskState.key === 'sport') {
      if (taskState.timestamp > 21600) {
        return TodoTimerResults.sport.moreThan6;
      } else if (taskState.timestamp < 21600 && taskState.timestamp > 14400) {
        return TodoTimerResults.sport.between4_6;
      } else if (taskState.timestamp < 14400 && taskState.timestamp > 7200) {
        return TodoTimerResults.sport.between2_4;
      } else if (taskState.timestamp < 7200) {
        return TodoTimerResults.sport.lessThan2;
      }
    } else if (taskState.key === 'work') {
      if (taskState.timestamp > 10800) {
        return TodoTimerResults.work.moreThan3;
      } else if (taskState.timestamp < 7200 && taskState.timestamp > 3600) {
        return TodoTimerResults.work.between1_2;
      } else if (taskState.timestamp < 3600) {
        return TodoTimerResults.work.between1_2;
      }
    } else if (taskState.key === 'time_killers') {
      if (taskState.timestamp > 7200) {
        return TodoTimerResults.time_killer.moreThan2;
      } else if (taskState.timestamp < 7200) {
        return TodoTimerResults.time_killer.lessThan2;
      }
    } else {
      return TodoTimerResults.default;
    }
  }, [taskState]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            rightItem={isHas ? null : <Cancel onClose={onHandleBack} />}
            title={isHas ? 'Task' : 'New task'}
            leftItem={isHas ? <ArrowLeftBack onPress={onHandleBack} /> : null}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.box}>
              <ListItemCont
                title="Task name"
                value={
                  taskState.name.length > 20
                    ? taskState.name.slice(0, 17) + '...'
                    : taskState.name
                }
                onPress={() =>
                  navigation.navigate(APP_ROUTES.TASK_NAME as never)
                }
              />
              <Line />
              <ListItemCont
                title="Goal"
                value={
                  taskState.hours || taskState.minutes > 0
                    ? `${taskState.hours}h  ${taskState.minutes}m  ${
                        taskState.goal ? `/${taskState.goal}` : ''
                      }`
                    : ''
                }
                onPress={() =>
                  navigation.navigate(APP_ROUTES.TODO_GOAL as never)
                }
              />
            </RN.View>
            <RN.View>
              {!isHas ? null : (
                <RN.View style={styles.taskTexts}>
                  <RN.View style={styles.recomend}>
                    <Images.Svg.timerLogo fill={COLORS.yellow} />
                    <RN.Text style={styles.recomendedText}>Recomended</RN.Text>
                    <RN.Text style={styles.recomendedInfo}>
                      {renderRecomended()}
                    </RN.Text>
                  </RN.View>
                  <RN.View style={styles.taskBack}>
                    <Images.Svg.todoTaskBack />
                  </RN.View>
                </RN.View>
              )}
            </RN.View>
            <RN.View style={styles.btnBox}>
              <StartBtn
                text={isHas ? 'Ok' : 'Add'}
                primary
                subWidth={70}
                elWidth={55}
                onPress={onCreateNewTask}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(NewTask);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight - windowHeight / 6,
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 10,
  },
  taskBack: {
    position: 'absolute',
    top: 0,
  },
  taskTexts: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 340,
  },
  recomend: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  recomendedText: {
    fontSize: 18,
    color: COLORS.yellow,
    textAlign: 'center',
  },
  recomendedInfo: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: '15%',
  },
  btnBox: {
    alignItems: 'center',
  },
});
