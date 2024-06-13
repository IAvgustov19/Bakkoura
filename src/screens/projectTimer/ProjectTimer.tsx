import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import RN from '../../components/RN';
import { StyleSheet } from 'react-native';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import { Images } from '../../assets/index';
import SwitchBtn from '../../components/SwitchBtn/SwitchBtn';
import ProjectTimerItem from './components/ProjectTimerItem';
import TextView from '../../components/Text/Text';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { APP_ROUTES } from '../../navigation/routes';
import { observer } from 'mobx-react-lite';
import useRootStore from '../../hooks/useRootStore';
import { FlatList, RectButton, Swipeable } from 'react-native-gesture-handler';
import { COLORS } from '../../utils/colors';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';
import { IosAndroidHeight, windowHeight } from '../../utils/styles';
import ButtonComp from '../../components/Button/Button';
import RenderProjectTimer from './components/RenderProjectTimer';
import ListFooter from '../../components/ListFooter/ListFooter';

const ProjectTimer = () => {
  const [play, setPlay] = useState(false);
  const {
    projectTimerList,
    playProject,
    onSelectProject,
    calculatedTotalTime,
    handleDeleteProjectTimer,
    getOneProjectTimer,
    fetchProjectTimers,
  } = useRootStore().projectTimer;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchProjectTimers();
  }, [isFocused])

  const onPlayHandle = (index: number) => {
    playProject(index);
  };

  const onGetOneProject = data => {
    getOneProjectTimer(data);
    navigation.navigate(APP_ROUTES.NEW_PROJECT_TIMER as never);
  };

  const renderLeftActions = (id: number) => {
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

  const handleSwipe = (id: number) => {
    handleDeleteProjectTimer(id);
  };

  const RenderProjects = memo(({ item, index }: { item: any; index: number }) => {
    return (
      <Swipeable
        key={index}
        renderRightActions={() => renderLeftActions(item.id)}
        onSwipeableWillOpen={() => handleSwipe(item.id)}>
        <RenderProjectTimer
          index={index}
          item={item}
          onPlayHandle={() => onPlayHandle(index)}
          onGetOneProject={() => onGetOneProject(item)}
        />
      </Swipeable>
    );
  });

  const onCalculate = () => {
    if (projectTimerList.length) {
      navigation.navigate(APP_ROUTES.PROJECT_TIMER_CALCULATOR as never);
    }
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Project Timer"
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <ButtonComp
                width={90}
                title="Calculate"
                onPress={onCalculate}
                paddingVertical={8}
              />
            }
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.projects}>
              <RN.View style={styles.totalTime}>
                <TextView text="On this week" />
                <TextView text={`Total: ${calculatedTotalTime}`} />
              </RN.View>
              <RN.View style={styles.flatList}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={
                    <ListEmptyComp title="No project timer yet" />
                  }
                  data={projectTimerList}
                  renderItem={({ item, index }) => (
                    <RenderProjects item={item} index={index} />
                  )}
                />
              </RN.View>
            </RN.View>
            <RN.View style={styles.btnBox}>
              <StartBtn
                icon={<Images.Svg.btnAddIcon />}
                primary
                elWidth={55}
                subWidth={70}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.NEW_PROJECT_TIMER as never)
                }
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(ProjectTimer);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight - 110,
    justifyContent: 'space-between',
  },
  flatList: {
    height: '100%',
  },
  totalTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projects: {
    gap: 10,
    height: '85%',
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
  btnBox: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    width: '100%',
  },
});
