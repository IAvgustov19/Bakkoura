import React, {useCallback, useEffect, useMemo, useState} from 'react';
import RN from '../../components/RN';
import {StyleSheet} from 'react-native';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets/index';
import SwitchBtn from '../../components/SwitchBtn/SwitchBtn';
import ProjectTimerItem from './components/ProjectTimerItem';
import TextView from '../../components/Text/Text';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../hooks/useRootStore';
import {FlatList, RectButton, Swipeable} from 'react-native-gesture-handler';
import {COLORS} from '../../utils/colors';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';
import {IosAndroidHeight} from '../../utils/styles';

const ProjectTimer = () => {
  const [play, setPlay] = useState(false);
  const {
    projectTimerList,
    playProject,
    onSelectProject,
    calculatedTotalTime,
    handleDeleteProjectTimer,
    getOneProjectTimer,
  } = useRootStore().projectTimer;

  const navigation = useNavigation();

  const onPlayHandle = (index: number) => {
    playProject(index);
  };

  const onGetOneProject = data => {
    getOneProjectTimer(data);
    navigation.navigate(APP_ROUTES.NEW_PROJECT_TIMER as never);
  };

  const renderLeftActions = id => {
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => handleDeleteProjectTimer(id)}>
        <RN.View>
          <Images.Svg.whiteDelete />
        </RN.View>
      </RectButton>
    );
  };

  const renderProjects = useCallback(() => {
    return projectTimerList.map((item, index) => (
      <Swipeable
        key={index}
        renderRightActions={() => renderLeftActions(item.id)}
        onSwipeableWillOpen={() => handleDeleteProjectTimer(item.id)}>
        <ProjectTimerItem
          onEnter={() => onGetOneProject(item)}
          key={index}
          play={item.play}
          day={item.date}
          time={item.time}
          name={item.title}
          description={item.description}
          workTime={item.workTime}
          onPlay={() => onPlayHandle(index)}
        />
      </Swipeable>
    ));
  }, [projectTimerList]);

  const onCalculate = () => {
    if (projectTimerList.length) {
      navigation.navigate(APP_ROUTES.PROJECT_TIMER_CALCULATOR as never);
      onSelectProject(0);
    }
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Project Timer"
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={<SwitchBtn title="Calculate" onPress={onCalculate} />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.projects}>
              <RN.View style={styles.totalTime}>
                <TextView text="On this week" />
                <TextView text={`Total: ${calculatedTotalTime}`} />
              </RN.View>
              <RN.ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{height: RN.Platform.OS === 'ios' ? '82%' : '80%'}}>
                {renderProjects()}
              </RN.ScrollView>
            </RN.View>
            <StartBtn
              text="+"
              textSize={36}
              primary
              elWidth={55}
              subWidth={70}
              onPress={() =>
                navigation.navigate(APP_ROUTES.NEW_PROJECT_TIMER as never)
              }
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(ProjectTimer);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    height: '80%',
    justifyContent: 'space-between',
  },
  totalTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projects: {
    gap: 10,
  },
  rightAction: {
    backgroundColor: COLORS.darkRed,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '90%',
    marginTop: '1.5%',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 15,
  },
});
