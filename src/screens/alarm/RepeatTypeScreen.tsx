import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {COLORS} from '../../utils/colors';
import {WeekRepeatData} from '../../utils/repeat';
import {windowHeight} from '../../utils/styles';

const RepeatTypeScreen = () => {
  const {
    alarmItemData,
    onSelectRepeat,
    onRepeatCancelPress,
    selectedRepeat,
    onRepeatOkPress,
  } = useRootStore().alarmStore;
  const navigation = useNavigation();

  const OnRepeatCancelPress = () => {
    onRepeatCancelPress();
    navigation.goBack();
  };

  const OnRepeatOkPress = () => {
    onRepeatOkPress();
    navigation.goBack();
  };

  const renderDays = useCallback(() => {
    return WeekRepeatData.map((item, index) => {
      return (
        <ListItemCont
          key={index}
          backBlack
          title={item.title}
          onPress={() => onSelectRepeat(item.title)}
          rightItem={
            <RadioBtn
              active={!!selectedRepeat.find(e => e === item.title)}
              onPress={() => onSelectRepeat(item.title)}
            />
          }
        />
      );
    });
  }, [alarmItemData, selectedRepeat]);
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Repeat"
            rightItem={<Cancel onClose={OnRepeatCancelPress} />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.listBox}>{renderDays()}</RN.View>
            <RN.View>
              <StartBtn
                text="Ok"
                primary
                elWidth={60}
                subWidth={75}
                onPress={OnRepeatOkPress}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(RepeatTypeScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight - windowHeight / 5,
    justifyContent: 'space-between',
  },
  listBox: {
    backgroundColor: COLORS.black,
    borderRadius: 5,
  },
});
