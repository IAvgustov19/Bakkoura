import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useMemo} from 'react';
import {Images} from '../../assets';
import ButtonComp from '../../components/Button/Button';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import OutlineBtn from '../../components/OutlineBtn/OutlineBtn';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {BreakData} from '../../utils/repeat';
import TextView from '../../components/Text/Text';
import Line from '../../components/Line/Line';
import LottieContent from '../../components/LottieContent/LottieContent';
import {Lotties} from '../../lotties/lottie';
import {windowHeight, windowWidth} from '../../utils/styles';

const Pomodoro = () => {
  const {
    currentBreakTime,
    currentTime,
    startCurrentPomodoro,
    isRunCurrent,
    isStartCurrent,
    isCurrentPomodoro,
    stopCurrentPomodoro,
    taskList,
    getOneTask,
  } = useRootStore().pomodoroStore;

  const navigation = useNavigation();

  const onHandleTask = (data: any) => {
    getOneTask(data);
    navigation.navigate(APP_ROUTES.ADD_TASK_SCREEN as never);
  };

  const renderTasks = useCallback(() => {
    return taskList.map((item, index) => {
      return (
        <RN.Pressable
          style={styles.taskListHeader}
          key={index}
          onPress={() => onHandleTask(item)}>
          <RN.View>
            <RN.Text style={styles.tasksText}>{item.name}</RN.Text>
            <TextView text={item.description} />
          </RN.View>
          <RN.Text style={styles.tasksText}>0/{`${item.id}`}</RN.Text>
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

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Pomodoro"
            rightItem={<Images.Svg.timerLogo />}
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.pomodoro}>
                <RN.View style={styles.breakTimeBox}>
                  {BreakData.map((item, index) => {
                    return (
                      <OutlineBtn
                        key={index}
                        text={item.title}
                        textColor={
                          currentBreakTime.id === item.id && COLORS.yellow
                        }
                        borderColor={
                          currentBreakTime.id === item.id && COLORS.yellow
                        }
                      />
                    );
                  })}
                </RN.View>
                <RN.View style={styles.pomodoroBox}>
                  <RN.View style={styles.breakTime}>
                    <TextView text={'#Design'} />
                    <RN.Text style={styles.breakTimeText}>Long Break</RN.Text>
                  </RN.View>
                  {pomodoroLottie}
                  <RN.View style={styles.pomodoroTime}>
                    <RN.Text style={styles.time}>{currentTime}</RN.Text>
                  </RN.View>
                  {!isCurrentPomodoro && (
                    <RN.View style={styles.pomodoroInfoBox}>
                      <RN.Text style={styles.pomodoroInfoName}>
                        Pomos: 0/3
                      </RN.Text>
                      <RN.Text style={styles.pomodoroInfoName}>
                        Finish At: 11:51
                      </RN.Text>
                      <RN.Text style={styles.pomodoroInfoName}>(1.5h)</RN.Text>
                    </RN.View>
                  )}
                </RN.View>
                {isRunCurrent ? (
                  <RN.View style={styles.btnsBox}>
                    <StartBtn text="Stop" onPress={stopCurrentPomodoro} />
                    <StartBtn
                      text={isStartCurrent ? 'Pausa' : 'Start'}
                      primary
                      onPress={startCurrentPomodoro}
                    />
                  </RN.View>
                ) : (
                  <RN.View style={styles.btnBox}>
                    <StartBtn
                      text="Start"
                      primary
                      onPress={startCurrentPomodoro}
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
                    title="Add task +"
                    outline
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.ADD_TASK_SCREEN as never)
                    }
                  />
                </RN.View>
              )}
            </RN.View>
          </RN.ScrollView>
        </RN.View>
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
    flexDirection: 'row',
    gap: 10,
  },
  breakTime: {
    position: 'absolute',
    top: '30%',
    right: '20%',
    zIndex: 1,
  },
  breakTimeText: {
    color: COLORS.white,
  },
  pomodoroBox: {
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
    bottom: '5%',
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
    top: -40,
  },
  btnBox: {
    alignItems: 'center',
    paddingHorizontal: 10,
    top: -40,
  },
  taskListBox: {},
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  tasksText: {
    fontSize: 16,
    color: COLORS.white,
  },
  renderTask: {
    height: 55,
  },
  addTaskBtn: {
    marginTop: 20,
  },
});
