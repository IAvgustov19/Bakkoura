import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import RN from '../../components/RN';
import { StyleSheet } from 'react-native';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import { Images } from '../../assets/index';
import TextView from '../../components/Text/Text';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { APP_ROUTES } from '../../navigation/routes';
import { observer } from 'mobx-react-lite';
import useRootStore from '../../hooks/useRootStore';
import { FlatList, RectButton, Swipeable } from 'react-native-gesture-handler';
import { COLORS } from '../../utils/colors';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';
import { windowHeight } from '../../utils/styles';
import ButtonComp from '../../components/Button/Button';
import RenderProjectTimer from './components/RenderProjectTimer';
import ListFooter from '../../components/ListFooter/ListFooter';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import { t } from '../../i18n';

const ProjectTimer = () => {
  const {
    projectTimerList,
    playProject,
    calculatedTotalTime,
    handleDeleteProjectTimer,
    getOneProjectTimer,
    fetchProjectTimers,
  } = useRootStore().projectTimer;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchProjectTimers();
  }, [isFocused]);

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
            title={t("Project Timer")}
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            rightItem={
              <RN.TouchableOpacity onPress={() => navigation.navigate(APP_ROUTES.PROJECT_TIMER_SLIDER as never)}>
                <Images.Svg.question fill={'gray'} width={24} height={24} />
              </RN.TouchableOpacity>
            }
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.switch}>
              <ButtonComp
                width={90}
                title={t("calc")}
                onPress={onCalculate}
                paddingVertical={8}
              />
            </RN.View>
            <RN.View style={styles.projects}>
              <RN.View style={styles.totalTime}>
                <TextView/>
                <TextView text={`${t("total")} ${calculatedTotalTime}`} />
              </RN.View>
              <RN.View style={styles.flatList}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={
                    <ListEmptyComp title={t("No project timer yet")} />
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
    height: '95%',
  },
  totalTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projects: {
    gap: 10,
    // height: '85%',
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
    bottom: 20,
    width: '100%',
  },
  switch: {
    paddingVertical: 10, width: '100%', alignItems: 'center'
  }
});
