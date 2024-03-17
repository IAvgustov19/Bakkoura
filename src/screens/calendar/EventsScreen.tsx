import React, {useEffect, useState} from 'react';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {Switch} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import Events from './components/Events';
import Calendars from './components/Calendars';

const EventScreen = () => {
  const {calendarCurrentTime, newEventData, calculateRemainingTime} =
    useRootStore().calendarStore;
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const renderCalendar = () => {
    if (checked) {
      return <Calendars />;
    } else {
      return <Events />;
    }
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <RN.Text style={styles.currentTime}>
                {calendarCurrentTime}
              </RN.Text>
            }
            title={checked ? 'Calendar' : 'Events'}
          />
          <RN.View style={styles.calendarBox}>{renderCalendar()}</RN.View>
          <RN.View style={styles.bottomMenu}>
            <RN.TouchableOpacity>
              <Switch value={checked} onValueChange={toggleSwitch} />
            </RN.TouchableOpacity>
            <StartBtn
              subWidth={60}
              elWidth={45}
              primary={true}
              text={'+'}
              onPress={() => navigation.navigate(APP_ROUTES.NEW_EVENT as never)}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(EventScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  calendarBox: {
    width: '100%',
  },
  bottomMenu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: '15%',
    paddingHorizontal: 10,
  },
  currentTime: {
    marginTop: 2,
    color: '#fff',
    fontSize: 14,
    width: 65,
  },
});
