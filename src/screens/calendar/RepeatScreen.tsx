import {useNavigation} from '@react-navigation/native';
import {Switch} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {RepeatData} from '../../utils/repeat';
import {windowHeight} from '../../utils/styles';
import { t } from '../../i18n';

const RepeatScreen = () => {
  const navigation = useNavigation();
  const {
    onRepeatItemPress,
    selectedRepeat,
    newEventData,
    onSelectRepeat,
    onCancelRepeat,
  } = useRootStore().calendarStore;

  const onCancel = () => {
    navigation.goBack();
    onCancelRepeat();
  };
  const onSelect = () => {
    navigation.goBack();
    onSelectRepeat();
  };

  const renderRepeat = useCallback(() => {
    return RepeatData.map((item, index) => {
      return (
        <ListItemCont
          key={index}
          title={item.title}
          rightItem={
            <RadioBtn
              active={item.id === selectedRepeat.id}
              onPress={() => onRepeatItemPress(index)}
            />
          }
          onPress={() => onRepeatItemPress(index)}
        />
      );
    });
  }, [selectedRepeat, newEventData]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={`${t("repeat")}`}
            rightItem={<Cancel onClose={onCancel} />}
          />
          <RN.View style={styles.eventsTypeList}>{renderRepeat()}</RN.View>
          <RN.View style={styles.btnBox}>
            <StartBtn
              primary
              text={`${t("Ok")}`}
              elWidth={65}
              subWidth={80}
              onPress={onSelect}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(RepeatScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    height: windowHeight,
  },
  eventsTypeList: {
    backgroundColor: '#0D0D0D',
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  btnBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
    width: '100%',
  },
});
