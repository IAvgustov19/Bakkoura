import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RN from '../../components/RN';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';
import SoundsContent from '../../components/SoundsContent/SoundsContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import SetAlarmClock from './components/SetAlarmClock';

const NewAlarmScreen = () => {
  const navigation = useNavigation();
  const [repeat, setRepeat] = useState(false);
  const [leter, setLeter] = useState(true);
  const [sound, setSound] = useState(false);
  const [vibration, setVibation] = useState(true);

  const {
    onRepeatItemPress,
    onSoundItemPress,
    weekRepeatData,
    soundData,
    setNewAlarmState,
    alarmItemData,
    selectedSound,
    selectedRepeat,
    createAlarm,
  } = useRootStore().alarmStore;

  console.log(alarmItemData);

  const onSetLeter = () => {
    setNewAlarmState('leter', leter);
    setLeter(e => !e);
  };

  const CreateAlarm = () => {
    createAlarm();
    navigation.navigate(APP_ROUTES.ALARM_SCREEN as never);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Alarm Clock"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <RN.View>
              <RN.View style={styles.setClock}>
                <SetAlarmClock />
              </RN.View>
              <RN.View style={styles.listsBox}>
                <ListItemCont
                  title="Repeat"
                  value={selectedRepeat.title}
                  onPress={() => setRepeat(e => !e)}
                />
                <Line />
                <ListItemCont
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.NAME_ALARM as never)
                  }
                  title="Name"
                  value={alarmItemData.name}
                />
              </RN.View>
              <RN.View style={styles.listsBox}>
                <RN.View style={styles.eventsTypeList}>
                  <RN.View style={styles.listItem}>
                    <RN.Text style={styles.listItemText}>Reminder</RN.Text>
                    <SimpleSwitch active={leter} handlePress={onSetLeter} />
                  </RN.View>
                </RN.View>
                <Line />
                <ListItemCont
                  onPress={() => setSound(e => !e)}
                  title="Sound"
                  value={selectedSound.title}
                />
              </RN.View>
            </RN.View>
            <StartBtn
              elWidth={55}
              subWidth={70}
              primary
              text="Add"
              onPress={CreateAlarm}
            />
          </RN.View>
          <SoundsContent
            headerTitle="Repeat"
            data={weekRepeatData}
            onItemPress={onRepeatItemPress as never}
            headerLeftItem={
              <ArrowLeftBack onPress={() => setRepeat(e => !e)} title="Back" />
            }
            onClose={() => setRepeat(e => !e)}
            modalVisible={repeat}
            okBtn
            okBtnText="Ok"
            onPressBtn={() => setRepeat(e => !e)}
          />
          <SoundsContent
            headerTitle="Sound"
            data={soundData}
            onItemPress={onSoundItemPress as never}
            headerLeftItem={
              <ArrowLeftBack onPress={() => setSound(e => !e)} title="Back" />
            }
            onClose={() => setSound(e => !e)}
            modalVisible={sound}
            vibral
            vibrationActive={vibration}
            setVibrationActive={() => setVibation(e => !e)}
            myMusic
            okBtn
            okBtnText="Ok"
            onPressBtn={() => setSound(e => !e)}
          />
        </RN.View>
      }
    />
  );
};

export default observer(NewAlarmScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    height: '100%',
  },
  content: {
    justifyContent: 'space-between',
    height: '85%',
  },
  setClock: {
    height: '50%',
  },
  listsBox: {
    backgroundColor: COLORS.black,
    borderRadius: 5,
    marginTop: 10,
  },
  eventsTypeList: {
    backgroundColor: '#0D0D0D',
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    width: '100%',
  },
  listItemText: {
    color: '#7D7D7D',
    fontSize: 16,
  },
});
