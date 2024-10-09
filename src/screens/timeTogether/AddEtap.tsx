import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RN from '../../components/RN';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';
import SoundsContent from '../../components/SoundsContent/SoundsContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';
import {db} from '../../config/firebase';
import auth from '@react-native-firebase/auth';
import { COLORS } from '../../utils/colors';

import {t} from '../../i18n'
import Line from '../../components/Line/Line';

const AddEtap = () => {
  const navigation = useNavigation();
  const userUid = auth().currentUser.uid;
  const [synchronizedEmail, setSynchronizedEmail] = useState<string>('');
  const [synchronized, setSynchronized] = useState<boolean>(false);

  useEffect(() => {
    const getInvitedId = async () => {
      const etapDoc = await db
        .collection('etaps')
        .where('uid', '==', userUid)
        .get();
      // @ts-ignore
      const emails = etapDoc.docs.map(etap => etap._data.synchronizedEmail);
      setSynchronizedEmail(emails[emails.length - 1]);
      // @ts-ignore
      const synched = etapDoc.docs.map(etap => etap._data.synchronized);
      setSynchronized(synched[synched.length - 1]);
    };
    getInvitedId();
  });

  console.log(synchronizedEmail);

  const {
    addEtapState,
    onStatusItemPress,
    onControlItemPress,
    statusData,
    isUpdate,
    updateEtap,
    controlData,
    setAddEtapState,
    handleDeleteEtap,
    createNewEtap,
    clearState,
  } = useRootStore().togetherTimeStore;
  const {themeState} = useRootStore().personalAreaStore;
  const [repeat, setRepeat] = useState(false);
  const [reminder, setReminder] = useState(addEtapState.reminder);
  const [control, setControl] = useState(false);

  const onHandleNavigation = (route: string) => {
    navigation.navigate(route as never);
  };

  const onSetReminder = () => {
    setReminder(prev => {
      setAddEtapState('reminder', !prev);
      return !prev;
    });
  };

  const AddNewEtap = (synchronizedEmail, synchronized) => {
    createNewEtap(synchronizedEmail, synchronized, () =>
      onHandleNavigation(APP_ROUTES.TIME_TOGETHER),
    );
  };

  const ClearState = () => {
    navigation.navigate(APP_ROUTES.TIME_TOGETHER as never);
    clearState();
  };

  useEffect(() => {
    !isUpdate && clearState();
  }, []);

  const UpdateTask = () => {
    navigation.goBack();
    updateEtap(addEtapState.id);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={`${t("Etap")}`}
            rightItem={<Cancel onClose={ClearState} />}
          />
          <RN.ScrollView style={styles.scrollView}>
            <RN.View style={styles.content}>
              <RN.View>
                <RN.View
                  style={[
                    styles.eventsTypeList,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  <ListItemCont
                    title={`${t("name")}`}
                    value={addEtapState.name}
                    onPress={() => onHandleNavigation(APP_ROUTES.LOVER_NAME)}
                  />
                  <Line />
                  <ListItemCont
                    title={`${t("Status")}`}
                    value={addEtapState.type}
                    onPress={() => setRepeat(e => !e)}
                  />
                  <Line />
                  <ListItemCont
                    title={`${t("From")}`}
                    value={
                      addEtapState.fromDate == '0' ? '' : addEtapState.fromDate
                    }
                    onPress={() => onHandleNavigation(APP_ROUTES.FROM_DATE)}
                  />
                </RN.View>
                <RN.View
                  style={[
                    styles.eventsTypeList,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  <RN.View style={styles.listItem}>
                    <RN.Text style={[styles.listItemText,{color:themeState.title}]}>{`${t("reminder")}`}</RN.Text>
                    <SimpleSwitch
                      active={addEtapState.reminder}
                      handlePress={onSetReminder}
                    />
                  </RN.View>
                  <Line />
                  <ListItemCont
                    title={`${t("repeat")}`}
                    value={addEtapState.repeat}
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.REPEAT_ETAP as never)
                    }
                  />
                </RN.View>
                <RN.View
                  style={[
                    styles.eventsTypeList,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  {/* <ListItemCont
                    title={`${t("Control")}`}
                    value={addEtapState.control}
                    onPress={() => setControl(e => !e)}
                  /> */}
                  <ListItemCont
                    title={`${t("Delete")}`}
                    onPress={() => onHandleNavigation(APP_ROUTES.DELETE_ETAP)}
                  />
                </RN.View>
              </RN.View>
              {isUpdate ? (
                <RN.View style={styles.addBtn}>
                  <StartBtn
                    onPress={UpdateTask}
                    primary={true}
                    text={`${t("ok")}`}
                    subWidth={70}
                    elWidth={55}
                  />
                </RN.View>
              ) : (
                <RN.View style={styles.addBtn}>
                  <StartBtn
                    onPress={() =>
                      AddNewEtap(
                        synchronizedEmail ? synchronizedEmail : '',
                        synchronized ? synchronized : false,
                      )
                    }
                    primary={true}
                    text={`${t("add")}`}
                    subWidth={70}
                    elWidth={55}
                  />
                </RN.View>
              )}
            </RN.View>
            <SoundsContent
              headerTitle={`${t("Status")}`}
              data={statusData}
              onItemPress={onStatusItemPress as never}
              headerLeftItem={
                <ArrowLeftBack
                  onPress={() => setRepeat(e => !e)}
                  title={`${t("back")}`}
                />
              }
              onClose={() => setRepeat(e => !e)}
              modalVisible={repeat}
              okBtn
              okBtnText={`${t("ok")}`}
              onPressBtn={() => setRepeat(e => !e)}
            />
            {/* <SoundsContent
              headerTitle={`${t("Control")}`}
              data={controlData}
              onItemPress={onControlItemPress as never}
              headerLeftItem={
                <ArrowLeftBack
                  onPress={() => setControl(e => !e)}
                  title={`${t("back")}`}
                />
              }
              onClose={() => setControl(e => !e)}
              modalVisible={control}
              okBtn
              okBtnText="Ok"
              onPressBtn={() => setControl(e => !e)}
            /> */}
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(AddEtap);

const styles = RN.StyleSheet.create({
  cancelBtn: {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  cancelTxt: {
    color: '#656E77',
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 5,
    height: '100%',
  },
  scrollView: {
    height: windowHeight,
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 6,
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
    color: COLORS.grey,
    fontSize: 16,
  },
  listItemTextInput: {
    color: '#7D7D7D',
    fontSize: 16,
    width: 200,
    paddingVertical: 10,
  },
  line: {
    backgroundColor: '#131F28',
    width: '100%',
    height: 1,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  listItemRightText: {
    color: '#7D7D7D',
  },
  addBtn: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
    width: '100%',
  },
});
