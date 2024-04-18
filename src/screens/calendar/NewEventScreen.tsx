import {useNavigation} from '@react-navigation/native';
import {Switch} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import {KeyboardAvoidingView} from '../../components/KeyboardAvoidingView';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RN from '../../components/RN';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';
import SoundsContent from '../../components/SoundsContent/SoundsContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextInput from '../../components/TextInputView';
import {formattedDate, formattedTime} from '../../helper/helper';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {HITSLOP, windowHeight} from '../../utils/styles';

const NewEventScreen = () => {
  const navigation = useNavigation();
  const [repeat, setRepeat] = useState(false);
  const [sound, setSound] = useState(false);
  const {
    onRepeatItemPress,
    repeatData,
    selectedRepeat,
    setNewEventState,
    newEventData,
    addEvents,
    calculateRemainingTime,
    allEventsData,
    isUpdate,
    clearState,
  } = useRootStore().calendarStore;
  const {onSoundItemPress, soundsData, selectedSound} =
    useRootStore().timerStore;

  useEffect(() => {
    calculateRemainingTime();
  }, [allEventsData.length]);

  const onHandleGoBack = () => {
    navigation.goBack();
    clearState();
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="New Event"
            rightItem={<Cancel onClose={onHandleGoBack} />}
          />
          <RN.ScrollView style={styles.scrollView}>
            <RN.View style={styles.content}>
              <RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <RN.View style={styles.listItem}>
                    <TextInput
                      multiline={true}
                      onChangeText={e => setNewEventState('name', e as never)}
                      style={[
                        styles.listItemTextInput,
                        {paddingTop: RN.Platform.OS === 'ios' ? 18 : 10},
                      ]}
                      placeholderTextColor={COLORS.grey}
                      placeholder="Name"
                      value={newEventData.name}
                    />
                  </RN.View>
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Date"
                    value={
                      formattedDate(
                        newEventData.day,
                        newEventData.month,
                        newEventData.year,
                        0,
                      ) as never
                    }
                    rightItem={<Images.Svg.dateMenu />}
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.DATE_SCREEN as never)
                    }
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Time"
                    value={formattedTime(
                      newEventData.hour,
                      newEventData.minut,
                      newEventData.second,
                    )}
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.TIME_SCREEN as never)
                    }
                  />
                </RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <ListItemCont
                    title="All day"
                    rightVertical={5}
                    rightItem={
                      <SimpleSwitch
                        active={newEventData.allDay}
                        handlePress={() =>
                          setNewEventState(
                            'allDay',
                            !newEventData.allDay as never,
                          )
                        }
                      />
                    }
                    onPress={() => setSound(true)}
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Repeat"
                    value={selectedRepeat.title}
                    onPress={() => setRepeat(true)}
                  />
                </RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <ListItemCont
                    title="Reminder"
                    rightVertical={5}
                    rightItem={
                      <SimpleSwitch
                        active={newEventData.reminder}
                        handlePress={() =>
                          setNewEventState(
                            'reminder',
                            !newEventData.reminder as never,
                          )
                        }
                      />
                    }
                    onPress={() => setSound(true)}
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Sound"
                    value={selectedSound.title}
                    onPress={() => setSound(true)}
                  />
                </RN.View>
                <KeyboardAvoidingView
                  children={
                    <RN.View style={styles.eventsTypeList}>
                      <RN.View style={styles.listItem}>
                        <TextInput
                          multiline={true}
                          onChangeText={e =>
                            setNewEventState('comment', e as never)
                          }
                          style={[
                            styles.listItemTextInput,
                            {paddingTop: RN.Platform.OS === 'ios' ? 16 : 0},
                          ]}
                          placeholderTextColor={COLORS.grey}
                          placeholder="Coment"
                          value={newEventData.comment}
                        />
                      </RN.View>
                    </RN.View>
                  }
                />
              </RN.View>
              <RN.View style={styles.addBtn}>
                <StartBtn
                  onPress={() => addEvents(() => navigation.goBack())}
                  primary={true}
                  text={isUpdate ? 'Ok' : 'Add'}
                  subWidth={70}
                  elWidth={55}
                />
              </RN.View>
            </RN.View>
          </RN.ScrollView>
          <SoundsContent
            headerTitle="Repeat"
            data={repeatData}
            onItemPress={onRepeatItemPress as never}
            headerLeftItem={
              <RN.TouchableOpacity
                hitSlop={HITSLOP}
                onPress={() => setRepeat(e => !e)}>
                <Images.Svg.arrowLeft />
              </RN.TouchableOpacity>
            }
            onClose={() => setRepeat(e => !e)}
            modalVisible={repeat}
          />
          <SoundsContent
            headerTitle="Sounds"
            data={soundsData}
            onItemPress={onSoundItemPress as never}
            headerLeftItem={
              <ArrowLeftBack onPress={() => setSound(e => !e)} title="Back" />
            }
            onClose={() => setSound(e => !e)}
            modalVisible={sound}
          />
        </RN.View>
      }
    />
  );
};

export default observer(NewEventScreen);

const styles = RN.StyleSheet.create({
  cancelBtn: {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  cancelTxt: {
    color: COLORS.grey,
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 10,
    height: '100%',
  },
  scrollView: {},
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
    width: '100%',
  },
  listItemTextInput: {
    color: COLORS.white,
    fontSize: 16,
    width: '100%',
    height: 60,
    alignItems: 'flex-end',
    // backgroundColor: 'red',
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
