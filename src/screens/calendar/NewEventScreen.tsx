import {useNavigation} from '@react-navigation/native';
import {Switch} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {KeyboardAvoidingView} from '../../components/KeyboardAvoidingView';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SoundsContent from '../../components/SoundsContent/SoundsContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextInput from '../../components/TextInputView';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {HITSLOP} from '../../utils/styles';

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
  } = useRootStore().calendarStore;
  const {onSoundItemPress, soundsData, selectedSound} =
    useRootStore().timerStore;

  useEffect(() => {
    calculateRemainingTime();
  }, [allEventsData.length]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="New Event"
            rightItem={
              <RN.TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => navigation.goBack()}>
                <RN.Text style={styles.cancelTxt}>Cancel</RN.Text>
              </RN.TouchableOpacity>
            }
          />
          <RN.View style={styles.eventsTypeList}>
            <RN.View style={styles.listItem}>
              <KeyboardAvoidingView
                children={
                  <TextInput
                    multiline={true}
                    onChangeText={e => setNewEventState('name', e as never)}
                    style={styles.listItemTextInput}
                    placeholderTextColor={COLORS.grey}
                    placeholder="Name"
                  />
                }
              />
            </RN.View>
            <RN.View style={styles.line}></RN.View>
            <RN.TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                navigation.navigate(APP_ROUTES.DATE_SCREEN as never)
              }>
              <RN.Text style={styles.listItemText}>Date</RN.Text>
              <RN.TouchableOpacity
                style={styles.listItemRight}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.DATE_SCREEN as never)
                }>
                <RN.Text style={styles.listItemRightText}>
                  {`${
                    newEventData.day < 10
                      ? `0${newEventData.day}`
                      : newEventData.day
                  }.${
                    newEventData.month < 10
                      ? `0${newEventData.month}`
                      : newEventData.month
                  }.${newEventData.year}`}
                </RN.Text>
                <Images.Svg.dateMenu />
              </RN.TouchableOpacity>
            </RN.TouchableOpacity>
            <RN.View style={styles.line}></RN.View>
            <RN.TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                navigation.navigate(APP_ROUTES.TIME_SCREEN as never)
              }>
              <RN.Text style={styles.listItemText}>Time</RN.Text>
              <RN.TouchableOpacity
                style={styles.listItemRight}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.TIME_SCREEN as never)
                }>
                <RN.Text style={styles.listItemRightText}>
                  {`${
                    newEventData.hour < 10
                      ? `0${newEventData.hour}`
                      : newEventData.hour
                  }:${
                    newEventData.minut < 10
                      ? `0${newEventData.minut}`
                      : newEventData.minut
                  }:${
                    newEventData.second < 10
                      ? `0${newEventData.second}`
                      : newEventData.second
                  }`}
                </RN.Text>
                <Images.Svg.arrowRight />
              </RN.TouchableOpacity>
            </RN.TouchableOpacity>
          </RN.View>
          <RN.View style={styles.eventsTypeList}>
            <RN.View style={styles.listItem}>
              <RN.Text style={styles.listItemText}>All day</RN.Text>
              <Switch
                value={newEventData.allDay}
                onValueChange={e => setNewEventState('allDay', e as never)}
              />
            </RN.View>
            <RN.View style={styles.line}></RN.View>
            <RN.TouchableOpacity
              style={styles.listItem}
              onPress={() => setRepeat(true)}>
              <RN.Text style={styles.listItemText}>Repeat</RN.Text>
              <RN.TouchableOpacity
                style={styles.listItemRight}
                onPress={() => setRepeat(true)}>
                <RN.Text style={styles.listItemRightText}>
                  {selectedRepeat.title}
                </RN.Text>
                <Images.Svg.arrowRight />
              </RN.TouchableOpacity>
            </RN.TouchableOpacity>
          </RN.View>
          <RN.View style={styles.eventsTypeList}>
            <RN.View style={styles.listItem}>
              <RN.Text style={styles.listItemText}>Reminder</RN.Text>
              <Switch
                value={newEventData.reminder}
                onValueChange={e => setNewEventState('reminder', e as never)}
              />
            </RN.View>
            <RN.View style={styles.line}></RN.View>
            <RN.TouchableOpacity
              style={styles.listItem}
              onPress={() => setSound(true)}>
              <RN.Text style={styles.listItemText}>Sound</RN.Text>
              <RN.TouchableOpacity
                style={styles.listItemRight}
                onPress={() => setSound(true)}>
                <RN.Text style={styles.listItemRightText}>
                  {selectedSound.title}
                </RN.Text>
                <Images.Svg.arrowRight />
              </RN.TouchableOpacity>
            </RN.TouchableOpacity>
          </RN.View>
          <RN.View style={styles.eventsTypeList}>
            <RN.View style={styles.listItem}>
              <RN.TextInput
                onChangeText={e => setNewEventState('comment', e as never)}
                style={styles.listItemTextInput}
                placeholderTextColor="#7D7D7D"
                placeholder="Comment"
              />
            </RN.View>
          </RN.View>
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
          <RN.View style={styles.addBtn}>
            <StartBtn
              onPress={() => addEvents(() => navigation.goBack())}
              primary={true}
              text="Add"
              subWidth={70}
              elWidth={55}
            />
          </RN.View>
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
    color: '#656E77',
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 10,
    height: '100%',
    // backgroundColor: 'red',
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
    // backgroundColor: COLORS.white,
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
