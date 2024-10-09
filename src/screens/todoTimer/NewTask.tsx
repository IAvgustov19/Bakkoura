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
import {TodoTimerResults, TodoTimerResults_ar} from '../../constants/todoTimer';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {windowHeight} from '../../utils/styles';
import { t } from '../../i18n';

import l from '../../i18n'

const NewTask = () => {
  const navigation = useNavigation();
  const {visible, show} = useRootStore().visibleStore;
  const {themeState} = useRootStore().personalAreaStore;
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
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 21600) {
          return TodoTimerResults.sport.moreThan6;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 21600 && taskState.timestamp >= 14400) {
          return TodoTimerResults.sport.between4_6;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 14400 && taskState.timestamp >= 7200) {
          return TodoTimerResults.sport.between2_4;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 7200) {
          return TodoTimerResults.sport.lessThan2;
        }
      } else {
        return TodoTimerResults.sport.lessThan2;
      }
    } 
    else if (taskState.key === 'work') {
      if (taskState.dailyUsage.length > 0)
        {
          if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  > 10800) {
            return TodoTimerResults.work.moreThan3;
          } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 7200 && taskState.timestamp > 3600) {
            return TodoTimerResults.work.between1_2;
          } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 3600) {
            return TodoTimerResults.work.lessThan1;
          }
        } else {
        return TodoTimerResults.work.lessThan1;
      }
    } else if (taskState.key === 'time_killers') {
      if (taskState.dailyUsage.length > 0)
      {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  > 7200) {
          return TodoTimerResults.time_killer.moreThan2;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 7200) {
          return TodoTimerResults.time_killer.lessThan2;
        }
      } else {
      return TodoTimerResults.time_killer.lessThan2
    }
  } else if (taskState.key === 'self_develop') {
      if (taskState.dailyUsage.length > 0){
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 7200) {
          return TodoTimerResults.self_develop.more_two;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 7200) {
          return TodoTimerResults.self_develop.one_two;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults.self_develop.less_1;
        }
      } else {
      return TodoTimerResults.self_develop.less_1;
    }
  } else if (taskState.key === 'self_care') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults.self_care.less1;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 7200) {
          return TodoTimerResults.self_care.one_two;
      } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 7200) {
        return TodoTimerResults.self_care.more3;
    } 
    } else {
        return TodoTimerResults.self_care.less1;
      }
    }else if (taskState.key === 'rest') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults.rest_and_relax.less1;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 7200) {
          return TodoTimerResults.rest_and_relax.one_two;
      } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 7200) {
        return TodoTimerResults.rest_and_relax.more_three;
    } 
    } else {
        return TodoTimerResults.rest_and_relax.less1;
      }
    }else if (taskState.key === 'house_keep') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 1800) {
          return TodoTimerResults.house_keeping.less05;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 1800 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults.house_keeping.between;
      } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600) {
        return TodoTimerResults.house_keeping.more1;
    } 
    } else {
        return TodoTimerResults.house_keeping.less05;
      }
    }else if (taskState.key === 'family') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults.Family_and_friends.less1;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 10800) {
          return TodoTimerResults.Family_and_friends.one_three;
      } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 10800) {
        return TodoTimerResults.Family_and_friends.morethree;
    } 
    } else {
        return TodoTimerResults.Family_and_friends.less1;
      }
    }
  else {
    return TodoTimerResults.default;
  }
  }, [taskState]);

  const renderRecomended_ar = useCallback(() => {

    if (taskState.key === 'sport') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 21600) {
          return TodoTimerResults_ar.sport.moreThan6;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 21600 && taskState.timestamp >= 14400) {
          return TodoTimerResults_ar.sport.between4_6;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 14400 && taskState.timestamp >= 7200) {
          return TodoTimerResults_ar.sport.between2_4;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 7200) {
          return TodoTimerResults_ar.sport.lessThan2;
        }
      } else {
        return TodoTimerResults_ar.sport.lessThan2;
      }
    } 
    else if (taskState.key === 'work') {
      if (taskState.dailyUsage.length > 0)
        {
          if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  > 10800) {
            return TodoTimerResults_ar.work.moreThan3;
          } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 7200 && taskState.timestamp > 3600) {
            return TodoTimerResults_ar.work.between1_2;
          } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 3600) {
            return TodoTimerResults_ar.work.lessThan1;
          }
        } else {
        return TodoTimerResults_ar.work.lessThan1;
      }
    } else if (taskState.key === 'time_killers') {
      if (taskState.dailyUsage.length > 0)
      {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  > 7200) {
          return TodoTimerResults_ar.time_killer.moreThan2;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp  < 7200) {
          return TodoTimerResults_ar.time_killer.lessThan2;
        }
      } else {
      return TodoTimerResults_ar.time_killer.lessThan2
    }
  } else if (taskState.key === 'self_develop') {
      if (taskState.dailyUsage.length > 0){
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 7200) {
          return TodoTimerResults_ar.self_develop.more_two;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 7200) {
          return TodoTimerResults_ar.self_develop.one_two;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults_ar.self_develop.less_1;
        }
      } else {
      return TodoTimerResults_ar.self_develop.less_1;
    }
  } else if (taskState.key === 'self_care') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults_ar.self_care.less1;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 7200) {
          return TodoTimerResults_ar.self_care.one_two;
      } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 7200) {
        return TodoTimerResults_ar.self_care.more3;
    } 
    } else {
        return TodoTimerResults_ar.self_care.less1;
      }
    }else if (taskState.key === 'rest') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults_ar.rest_and_relax.less1;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 7200) {
          return TodoTimerResults_ar.rest_and_relax.one_two;
      } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 7200) {
        return TodoTimerResults_ar.rest_and_relax.more_three;
    } 
    } else {
        return TodoTimerResults_ar.rest_and_relax.less1;
      }
    }else if (taskState.key === 'house_keep') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 1800) {
          return TodoTimerResults_ar.house_keeping.less05;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 1800 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults_ar.house_keeping.between;
      } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600) {
        return TodoTimerResults_ar.house_keeping.more1;
    } 
    } else {
        return TodoTimerResults_ar.house_keeping.less05;
      }
    }else if (taskState.key === 'family') {
      if (taskState.dailyUsage.length > 0) {
        if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 3600) {
          return TodoTimerResults_ar.Family_and_friends.less1;
        } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 3600 &&
          taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp < 10800) {
          return TodoTimerResults_ar.Family_and_friends.one_three;
      } else if (taskState.dailyUsage[taskState.dailyUsage.length-1].timestamp >= 10800) {
        return TodoTimerResults_ar.Family_and_friends.morethree;
    } 
    } else {
        return TodoTimerResults_ar.Family_and_friends.less1;
      }
    }
  else {
    return TodoTimerResults_ar.default;
  }
  }, [taskState]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            rightItem={isHas ? null : <Cancel onClose={onHandleBack} />}
            title={isHas ? `${t("Task")}` : `${t("New Task")}`}
            leftItem={isHas ? <ArrowLeftBack onPress={onHandleBack} /> : null}
          />
          <RN.View style={styles.content}>
            <RN.View
              style={[styles.box, {backgroundColor: themeState.mainBack}]}>
              <ListItemCont
                title={`${t("Task name")}`}
                value={
                  taskState.name?.length > 20
                    ? taskState.name.slice(0, 17) + '...'
                    : taskState.name
                }
                onPress={() =>
                  navigation.navigate(APP_ROUTES.TASK_NAME as never)
                }
              />
              <Line />
              <ListItemCont
                title={`${t("Goal")}`}
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
                    <Images.Svg.timerLogo fill={themeState.yellow} />
                    <RN.Text
                      style={[
                        styles.recomendedText,
                        {color: themeState.yellow},
                      ]}>
                      {t("Recommendation")}
                    </RN.Text>
                    <RN.Text
                      style={[
                        styles.recomendedInfo,
                        {color: themeState.darkGrayText},
                      ]}>
                      {
                        l.locale == 'English' ?
                        renderRecomended() :
                        renderRecomended_ar()
                      }
                    </RN.Text>
                  </RN.View>
                  <RN.View style={styles.taskBack}>
                    <themeState.todoTimerBack />
                  </RN.View>
                </RN.View>
              )}
            </RN.View>
            <RN.View style={styles.btnBox}>
              <StartBtn
                text={isHas ? `${t("ok")}` : `${t("add")}`}
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
