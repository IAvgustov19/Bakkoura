import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
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
import { t } from '../../i18n';
import DocumentPicker from 'react-native-document-picker';
import {Sounds} from '../../assets';
import storage from '@react-native-firebase/storage';

const NewAlarmScreen = () => {
  const navigation = useNavigation();
  const [leter, setLeter] = useState(true);
  const [sound, setSound] = useState(false);
  const [vibration, setVibation] = useState(true);

  const {
    onSoundItemPress,
    soundData,
    setNewAlarmState,
    alarmItemData,
    selectedSound,
    selectedRepeat,
    createAlarm,
    onSelectSoundFronDevice,
  } = useRootStore().alarmStore;
  const {themeState} = useRootStore().personalAreaStore;
  // console.log('newAlarmState', alarmItemData);

  const selectMusicFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      // const fileUri = decodeURIComponent(res[0].uri);
      const fileUri = decodeURIComponent(res[0].uri);
      const fileName = res[0].name;

      // Step 2: Upload the file to Firebase Storage
      const storageRef = storage().ref(`alarm_sounds/${fileName}`);
      const uploadTask = await storageRef.putFile(fileUri);

      // Step 3: Get the download URL
      const downloadURL = await storageRef.getDownloadURL();
      const data = {
        id: 0,
        title: res[0].name,
        url: downloadURL,
        active: true,
      };
      onSelectSoundFronDevice(data);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Cancel choosing');
      } else {
        throw err;
      }
    }
  };
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
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("Alarm Clock")}`}
          />
          <RN.View style={styles.content}>
            <RN.View>
              <RN.View style={styles.setClock}>
                <SetAlarmClock />
              </RN.View>
              <RN.View
                style={[
                  styles.listsBox,
                  {backgroundColor: themeState.mainBack},
                ]}>
                <ListItemCont
                  title={`${t("repeat")}`}
                  value={
                    selectedRepeat.join().length > 20
                      ? selectedRepeat.join().slice(0, 20) + '...'
                      : selectedRepeat.join()
                  }
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.REPEAT_TYPE_SCREEN as never)
                  }
                  // backBlack
                />
                <Line />
                <ListItemCont
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.NAME_ALARM as never)
                  }
                  title={`${t("name")}`}
                  value={alarmItemData.name}
                  // backBlack
                />
              </RN.View>
              <RN.View
                style={[
                  styles.listsBox,
                  {backgroundColor: themeState.mainBack},
                ]}>
                <RN.View
                  style={[
                    styles.eventsTypeList,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  <RN.View style={styles.listItem}>
                    <RN.Text style={[styles.listItemText, {color:themeState.darkGrayText}]}>{`${t("reminder")}`}</RN.Text>
                    <SimpleSwitch active={leter} handlePress={onSetLeter} />
                  </RN.View>
                </RN.View>
                <Line />
                <ListItemCont
                  onPress={() => setSound(e => !e)}
                  title={`${t("sound")}`}
                  value={
                    selectedSound.title.length > 20
                      ? selectedSound.title.slice(0, 17) + '...'
                      : selectedSound.title
                  }
                  // backBlack
                />
              </RN.View>
            </RN.View>
            <StartBtn
              elWidth={55}
              subWidth={70}
              primary
              text={`${t("add")}`}
              onPress={CreateAlarm}
            />
          </RN.View>
          <SoundsContent
            headerTitle={`${t("sound")}`}
            data={soundData}
            onItemPress={onSoundItemPress as never}
            headerLeftItem={
              <ArrowLeftBack onPress={() => {
                navigation.goBack()
                navigation.navigate(APP_ROUTES.NEW_ALARM_SCREEN as never)
              }} />
            }
            onClose={() => setSound(e => !e)}
            modalVisible={sound}
            vibral
            vibrationActive={vibration}
            setVibrationActive={() => setVibation(e => !e)}
            myMusic
            okBtn
            okBtnText={`${t("ok")}`}
            onPressBtn={() => setSound(e => !e)}
            onSelectMyMusic={selectMusicFile}
            myMusicValue={
              selectedSound.id === 0
                ? selectedSound.title.length > 20
                  ? selectedSound.title.slice(0, 17) + '...'
                  : selectedSound.title
                : ''
            }
          />
        </RN.View>
      }
    />
  );
};

export default observer(NewAlarmScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
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
    paddingRight: 5,
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
    fontSize: 16,
  },
});
