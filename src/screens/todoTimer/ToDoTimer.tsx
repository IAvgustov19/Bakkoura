import React, {useCallback, useMemo} from 'react';
import RN from '../../components/RN';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets';
import SwitchBtn from '../../components/SwitchBtn/SwitchBtn';
import ToDoTimerItem from './components/ToDoTimerItem';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../hooks/useRootStore';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {windowHeight} from '../../utils/styles';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import {formatDateTime, secondsToHMS} from '../../helper/helper';
import {FlatList, RectButton, Swipeable} from 'react-native-gesture-handler';
import {COLORS} from '../../utils/colors';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';

const ToDoTimer = () => {
  const {visible, show} = useRootStore().visibleStore;
  const {getOneTask, tasksList, playProject, handleDeleteTask} =
    useRootStore().todoTimer;
  const navigation = useNavigation();

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
  }, [tasksList]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="To do Timer"
            rightItem={
              <SwitchBtn
                title="History"
                onPress={() =>
                  navigation.navigate(APP_ROUTES.TODO_TIMER_HISTORY as never)
                }
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
                text="+"
                primary
                textSize={30}
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
    paddingHorizontal: 10,
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
