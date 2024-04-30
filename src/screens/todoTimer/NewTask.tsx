import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
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
                value={taskState.name}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.TASK_NAME as never)
                }
              />
              <Line />
              <ListItemCont
                title="Goal"
                value={
                  taskState.hours || taskState.minutes > 0
                    ? `${taskState.hours}h ${taskState.minutes}m  ${
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
                      Daily exercise is not enough to maintain good physical
                      shape and remove toxins. Running time does not match your
                      goal. Please get together and do more!
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
    paddingHorizontal: 10,
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