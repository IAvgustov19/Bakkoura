import React, {useCallback, useEffect} from 'react';
import RN from '../../components/RN';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets';
import ToDoTimerItem from './components/ToDoTimerItem';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../hooks/useRootStore';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {windowHeight} from '../../utils/styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import {formatDateTime, secondsToHMS} from '../../helper/helper';
import {COLORS} from '../../utils/colors';
import ButtonComp from '../../components/Button/Button';

const ToDoTimer = () => {
  const {getOneTask, tasksList, playProject, fetchTasks, tasksListClone} =
    useRootStore().todoTimer;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      tasksList.forEach(item => {
        if (item.secondInterval) {
          clearInterval(item.secondInterval);
        }
      });
    };
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [isFocused, fetchTasks]);

  const renderItems = useCallback(() => {
    return tasksList.map((item, index) => {
      return (
        <ToDoTimerItem
          key={index}
          name={item.name}
          description={
            formatDateTime(item.startTime) + '-' + formatDateTime(item.endTime)
          }
          workTime={secondsToHMS(item.timestamp)}
          play={item.play}
          onPlay={() => playProject(index)}
          onEnter={() =>
            getOneTask(item, () =>
              navigation.navigate(APP_ROUTES.NEW_TASK as never),
            )
          }
        />
      );
    });
  }, [tasksList, tasksListClone]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="To do Timer"
            rightItem={
              <ButtonComp
                width={90}
                title="History"
                onPress={() =>
                  navigation.navigate(APP_ROUTES.TODO_TIMER_HISTORY as never)
                }
                paddingVertical={8}
              />
            }
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.flatList}>
              <RN.ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {renderItems()}
              </RN.ScrollView>
            </RN.View>
            <RN.View>
              <StartBtn
                elWidth={55}
                subWidth={75}
                icon={<Images.Svg.btnAddIcon />}
                primary
                onPress={() =>
                  navigation.navigate(APP_ROUTES.NEW_TASK as never)
                }
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(ToDoTimer);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight - windowHeight / 3.5,
    justifyContent: 'space-between',
  },
  flatList: {
    height: windowHeight - windowHeight / 2.6,
  },
  rightAction: {
    backgroundColor: COLORS.darkRed,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '90%',
    marginTop: '0.5%',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 15,
  },
});
