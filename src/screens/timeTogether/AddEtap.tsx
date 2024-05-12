import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
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

const AddEtap = () => {
  const navigation = useNavigation();
  const {
    addEtapState,
    onStatusItemPress,
    onControlItemPress,
    statusData,
    controlData,
    setAddEtapState,
    createNewEtap,
    clearState,
  } = useRootStore().togetherTimeStore;
  const [repeat, setRepeat] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [control, setControl] = useState(false);

  const onHandleNavigation = (route: string) => {
    navigation.navigate(route as never);
  };

  const onSetReminder = () => {
    setAddEtapState('reminder', reminder);
    setReminder(e => !e);
  };

  const AddNewEtap = () => {
    createNewEtap(() => onHandleNavigation(APP_ROUTES.TIME_TOGETHER));
  };

  const ClearState = () => {
    navigation.navigate(APP_ROUTES.TIME_TOGETHER as never);
    clearState();
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Etap"
            rightItem={<Cancel onClose={ClearState} />}
          />
          <RN.ScrollView style={styles.scrollView}>
            <RN.View style={styles.content}>
              <RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <ListItemCont
                    title="Name"
                    value={addEtapState.name}
                    onPress={() => onHandleNavigation(APP_ROUTES.LOVER_NAME)}
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Status"
                    value={addEtapState.type}
                    onPress={() => setRepeat(e => !e)}
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="From"
                    value={
                      addEtapState.fromDate == '0' ? '' : addEtapState.fromDate
                    }
                    onPress={() => onHandleNavigation(APP_ROUTES.FROM_DATE)}
                  />
                </RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <RN.View style={styles.listItem}>
                    <RN.Text style={styles.listItemText}>Reminder</RN.Text>
                    <SimpleSwitch
                      active={reminder}
                      handlePress={onSetReminder}
                    />
                  </RN.View>
                </RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <ListItemCont
                    title="Control"
                    value={addEtapState.control}
                    onPress={() => setControl(e => !e)}
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Delete"
                    onPress={() => onHandleNavigation(APP_ROUTES.DELETE_ETAP)}
                  />
                </RN.View>
              </RN.View>
              <RN.View style={styles.addBtn}>
                <StartBtn
                  onPress={AddNewEtap}
                  primary={true}
                  text="Ok"
                  subWidth={70}
                  elWidth={55}
                />
              </RN.View>
            </RN.View>
            <SoundsContent
              headerTitle="Status"
              data={statusData}
              onItemPress={onStatusItemPress as never}
              headerLeftItem={
                <ArrowLeftBack
                  onPress={() => setRepeat(e => !e)}
                  title="Back"
                />
              }
              onClose={() => setRepeat(e => !e)}
              modalVisible={repeat}
              okBtn
              okBtnText="Ok"
              onPressBtn={() => setRepeat(e => !e)}
            />
            <SoundsContent
              headerTitle="Control"
              data={controlData}
              onItemPress={onControlItemPress as never}
              headerLeftItem={
                <ArrowLeftBack
                  onPress={() => setControl(e => !e)}
                  title="Back"
                />
              }
              onClose={() => setControl(e => !e)}
              modalVisible={control}
              okBtn
              okBtnText="Ok"
              onPressBtn={() => setControl(e => !e)}
            />
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
    color: '#7D7D7D',
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
    marginLeft: 15,
  },
});
