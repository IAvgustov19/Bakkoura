import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Switch} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useRef, useState} from 'react';
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
import Line from '../../components/Line/Line';
import { t } from '../../i18n';

const NewEventScreen = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState(false);
  const {
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
  const {themeState} = useRootStore().personalAreaStore;

  const onSetAllDay = () => {
    setTimeout(() => {
      setNewEventState('allDay', !newEventData.allDay as never);
      setNewEventState('hour', 0 as never);
      setNewEventState('minut', 0 as never);
      setNewEventState('second', 0 as never);
    }, 200);
  };

  useEffect(() => {
    calculateRemainingTime();
  }, [allEventsData.length]);

  const onHandleGoBack = () => {
    navigation.goBack();
    clearState();
  };

  const scrollViewRef = useRef(null);

  const Scroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: windowHeight - windowHeight / 4,
        animated: true,
      });
    }
  };

  const addEvent = () => {
    addEvents(() => navigation.goBack());
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={`${t("Event")}`}
            rightItem={<Cancel onClose={onHandleGoBack} />}
          />
          <RN.ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View>
                <RN.View
                  style={[
                    styles.eventsTypeList,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  <RN.View style={styles.listItem}>
                    <TextInput
                      multiline={true}
                      onChangeText={e => setNewEventState('name', e as never)}
                      style={[
                        styles.listItemTextInput,
                        {
                          paddingTop: RN.Platform.OS === 'ios' ? 18 : 10,
                          color: themeState.title,
                        },
                      ]}
                      placeholderTextColor={COLORS.grey}
                      placeholder={`${t("name")}`}
                      value={newEventData.name}
                      maxLength={40}
                    />
                  </RN.View>
                  <Line />
                  <ListItemCont
                    title={`${t("date")}`}
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
                  {!newEventData.allDay ? (
                    <>
                      <Line />
                      <ListItemCont
                        title={`${t("Time")}`}
                        value={formattedTime(
                          newEventData.hour,
                          newEventData.minut,
                          newEventData.second,
                        )}
                        onPress={() =>
                          navigation.navigate(APP_ROUTES.TIME_SCREEN as never)
                        }
                      />
                    </>
                  ) : null}
                </RN.View>
                <RN.View
                  style={[
                    styles.eventsTypeList,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  <ListItemCont
                    title={`${t("all day")}`}
                    rightVertical={5}
                    rightItem={
                      <SimpleSwitch
                        active={newEventData.allDay}
                        handlePress={onSetAllDay}
                      />
                    }
                  />
                  <Line />
                  <ListItemCont
                    title={`${t("repeat")}`}
                    value={newEventData.repeat}
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.REPEAT as never)
                    }
                  />
                </RN.View>
                <RN.View
                  style={[
                    styles.eventsTypeList,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  <ListItemCont
                    title={`${t("reminder")}`}
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
                  />
                  <Line />
                  <ListItemCont
                    title={`${t("sound")}`}
                    value={selectedSound.title}
                    onPress={() => setSound(true)}
                  />
                </RN.View>
                <RN.View
                  style={[
                    styles.eventsTypeList,
                    {backgroundColor: themeState.mainBack},
                  ]}>
                  <RN.View style={styles.listItem}>
                    <TextInput
                      multiline={true}
                      onChangeText={e =>
                        setNewEventState('comment', e as never)
                      }
                      style={[
                        styles.listItemTextInput,
                        {
                          paddingTop: RN.Platform.OS === 'ios' ? 16 : 0,
                          color: themeState.title,
                        },
                      ]}
                      placeholderTextColor={COLORS.grey}
                      placeholder={`${t("comment")}`}
                      value={newEventData.comment}
                      onPressIn={Scroll}
                      onKeyPress={Scroll}
                      maxLength={200}
                    />
                  </RN.View>
                </RN.View>
              </RN.View>
              <RN.View style={styles.addBtn}>
                <StartBtn
                  onPress={addEvent}
                  primary={true}
                  text={`${t("ok")}`}
                  subWidth={70}
                  elWidth={55}
                />
              </RN.View>
            </RN.View>
          </RN.ScrollView>
          <SoundsContent
            headerTitle={`${t("sound")}`}
            data={soundsData}
            onItemPress={onSoundItemPress as never}
            headerLeftItem={
              <ArrowLeftBack onPress={() => {
                navigation.goBack()
                navigation.navigate(APP_ROUTES.NEW_EVENT as never)
              }} />
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
    paddingHorizontal: 5,
    height: windowHeight,
  },
  scrollView: {
    // height: windowHeight / 5,
  },
  content: {
    justifyContent: 'space-between',
    paddingBottom: windowHeight / 2.2,
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
    height: "100%",
    minHeight:60,
    alignItems: 'flex-end',
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
    width: '100%',
    bottom: windowHeight / 4,
  },
});
