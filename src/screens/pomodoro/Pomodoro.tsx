import { useIsFocused, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Images } from '../../assets';
import ButtonComp from '../../components/Button/Button';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import OutlineBtn from '../../components/OutlineBtn/OutlineBtn';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import { APP_ROUTES } from '../../navigation/routes';
import { COLORS } from '../../utils/colors';
import { BreakData } from '../../utils/repeat';
import TextView from '../../components/Text/Text';
import Line from '../../components/Line/Line';
import LottieContent from '../../components/LottieContent/LottieContent';
import { Lotties } from '../../lotties/lottie';
import { windowHeight, windowWidth } from '../../utils/styles';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Text from 'react-native'

import {t} from '../../i18n'

const Pomodoro = () => {
  const {
    currentBreakTime,
    currentTime,
    startCurrentPomodoro,
    isRunCurrent,
    newTaskState,
    isStartCurrent,
    clearState,
    setData,
    isCurrentPomodoro,
    stopCurrentPomodoro,
    taskList,
    getOneTask,
    estimatedPomodoros,
    setCurrentBreakTime,
    getAllPomodorosFromFirestore,
  } = useRootStore().pomodoroStore;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [currentBreakIndex, setCurrentBreakIndex] = useState(1);
  const [finishTime, setFinishTime] = useState(new Date(new Date().getTime()).toLocaleTimeString());



  const onHandleTask = (data: any) => {
    clearState();
    getOneTask(data);
    navigation.navigate(APP_ROUTES.ADD_TASK_SCREEN as never);
  };



  useEffect(() => {
    handleBreakTimeSelection(1);
  }, [])


  const calculateFinishTime = (breackType) => {

    const now = new Date();
    let minutes;
    if (breackType === 'Pomodoro') {
      minutes = 25;
    } else if (breackType === 'ShortBreak') {
      minutes = 5;
    } else if (breackType === 'LongBreak') {
      minutes = 15;
    }
    const finishTime = new Date(now.getTime() + minutes * 60000);

    return finishTime.toLocaleTimeString('en-US', { hour12: false });
  };


  useEffect(() => {
    getAllPomodorosFromFirestore();
  }, [isFocused]);


  const renderTasks = useCallback(() => {
    const maxLength = 100;
    return taskList.map((item, index) => {
      const hasDescription = !!item.description;
      return (
        <RN.Pressable
          style={styles.taskLists}
          key={index}
          onPress={() => { setData(item); setFinishTime(calculateFinishTime(newTaskState.breackType || 'Pomodoro')); }}
        >
          <RN.View style={{gap: 10}}>
            <RN.View style={styles.spaceBetween}>
              <RN.View style={[styles.taskTitleContainer, !hasDescription && styles.alignCenter]}>
                <RN.Text style={styles.tasksText}>{item.name.length > 100 ? `${item.name.slice(0, maxLength)}...` : item.name}</RN.Text>
              </RN.View>
              <RN.Text style={styles.tasksTime}>{`${0}`}/{`${item.minut}`}</RN.Text>
              <Images.Svg.dots onPress={() => onHandleTask(item)} style={styles.dotImg}/>
            </RN.View>
            {hasDescription && <TextView text={item.description.length > maxLength ? `${item.description.slice(0, maxLength)}...` : item.description} />}
          </RN.View>
        </RN.Pressable>
      );
    });
  }, [taskList]);

  const pomodoroLottie = useMemo(() => {
    return (
      <LottieContent
        source={Lotties.pomodoro}
        width={windowWidth}
        autoPlay={isStartCurrent}
        speed={isStartCurrent ? 1 : 0}
      />
    );
  }, [isStartCurrent]);

  const handleBreakTimeSelection = (id: number) => {
    setCurrentBreakTime(id);
    setCurrentBreakIndex(id);
  };


  useEffect(() => {
    setFinishTime(calculateFinishTime(newTaskState.breackType || 'Pomodoro'));

  }, [newTaskState.breackType])



  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("Pomodoro")}`}
            rightItem={
              <RN.TouchableOpacity onPress={() => navigation.navigate(APP_ROUTES.POMODORO_SLIDER as never)}>
                <Images.Svg.question fill={'gray'} width={24} height={24} />
              </RN.TouchableOpacity>
            }
          />
          {/* <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>  */}
          < RN.View style={styles.content}>
            <RN.View style={styles.pomodoro}>
              <RN.View style={styles.breakTimeBox}>
                {BreakData.map((item, index) => {
                  return (
                    <OutlineBtn
                      Width={'30%'}
                      key={index}
                      text={item.title}
                      textColor={
                        currentBreakTime.id === item.id && COLORS.yellow
                      }
                      borderColor={
                        currentBreakTime.id === item.id && COLORS.yellow
                      }
                      onPress={() => handleBreakTimeSelection(item.id)}
                    />
                  );
                })}
              </RN.View>
              <RN.View style={styles.pomodoroBox}>
                <RN.View style={styles.breakTime}>
                  <TextView text={newTaskState?.name?.length > 12 ? `${newTaskState.name.slice(0, 12)}...` : newTaskState.name} />
                  {/* <RN.Text style={styles.breakTimeText}>{newTaskState ? newTaskState.breackType : 'Pomodoro'}</RN.Text> */}
                </RN.View>
                {pomodoroLottie}
                <RN.View style={styles.pomodoroTime}>
                  <RN.Text style={styles.time}>{currentTime}</RN.Text>
                </RN.View>
                {isCurrentPomodoro && newTaskState?.name && (
                  <RN.View style={styles.pomodoroInfoBox}>
                    <RN.Text style={styles.pomodoroInfoName}>
                    ${t("Pomos")}: {`${estimatedPomodoros} / ${newTaskState.minut}`}
                    </RN.Text>
                    <RN.Text style={styles.pomodoroInfoName}>
                    ${t("Finish At")}: {finishTime}
                    </RN.Text>
                    <RN.Text
                      style={
                        styles.pomodoroInfoName
                      }>{`(${newTaskState.estimatedHours}h)`}</RN.Text>
                  </RN.View>
                )}
              </RN.View>
              {isRunCurrent ? (
                <RN.View style={styles.btnsBox}>
                  <StartBtn text={`${t("Stop")}`} onPress={() => stopCurrentPomodoro(currentBreakIndex)} />
                  <StartBtn
                    text={isStartCurrent ? `${t("Pause")}` : `${t("Start")}`}
                    primary
                    onPress={() => startCurrentPomodoro(currentBreakIndex)}
                  />
                </RN.View>
              ) : (
                <RN.View style={styles.btnBox}>
                  <StartBtn
                    text={`${t("Start")}`}
                    primary
                    onPress={() => startCurrentPomodoro(currentBreakIndex)}
                  />
                </RN.View>
              )}
            </RN.View>
            {taskList.length > 0 ? (
              <RN.View style={styles.taskListBox}>
                <RN.View style={styles.taskListHeader}>
                  <RN.Text style={styles.tasksText}>Tasks</RN.Text>
                  <RN.TouchableOpacity
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.ADD_TASK_SCREEN as never)
                    }>
                    <Images.Svg.addSmallicon />
                  </RN.TouchableOpacity>
                </RN.View>
                <Line />
                <RN.ScrollView style={styles.renderTask}>
                  {renderTasks()}
                </RN.ScrollView>
                <Line />
              </RN.View>
            ) : (
              <RN.View style={styles.addTaskBtn}>
                <ButtonComp
                  title={`${t("add task")}`}
                  outline
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.ADD_TASK_SCREEN as never)
                  }
                />
              </RN.View>
            )}
          </RN.View>
          {/* </RN.ScrollView> */}
        </RN.View >
      }
    />
  );
};

export default observer(Pomodoro);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    justifyContent: 'space-between',
    paddingBottom: windowHeight / 4,
  },
  breakTimeBox: {
    zIndex: 100,
    flexDirection: 'row',
    gap: 10,
  },
  breakTime: {
    position: 'absolute',
    top: '30%',
    right: '25%',
    zIndex: 1,
  },
  breakTimeText: {
    color: COLORS.white,
  },
  pomodoroBox: {
    zIndex: 0,
    bottom: 30,
    alignItems: 'center',
    height: windowHeight / 2.2,
  },
  pomodoroTime: {
    position: 'absolute',
    top: '45%',
  },
  time: {
    fontSize: 70,
    color: COLORS.white,
    fontWeight: '200',
  },
  pomodoro: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pomodoroInfoBox: {
    position: 'absolute',
    bottom: '19%',
  },
  pomodoroInfoName: {
    textAlign: 'center',
    color: '#71EC85',
  },
  btnsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    bottom: 80,
  },
  btnBox: {
    alignItems: 'center',
    paddingHorizontal: 10,
    bottom: 80,
  },
  taskListBox: {
    bottom: 50,
    width: '100%',
  },
  taskTitleContainer: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    width: '100%',
  },
  taskLists: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  tasksText: {
    fontSize: 16,
    width: '77%',
    color: COLORS.white,
  },
  tasksTime: {
    fontSize: 16,
    color: COLORS.white,
    width: 30,
  },
  dotImg:{
    paddingTop:5
  },
  renderTask: {
    height: 105,
  },
  addTaskBtn: {
    marginTop: 20,
  },
  spaceBetween: {
    gap: 18,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});