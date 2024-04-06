import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';
import WatchSwitch from './components/WatchSwitch/WatchSwitch';
import AlarmNotification from './components/AlarmNotification';
import HomeWatch24 from './components/HomeWatch24';
import HomeWatch30 from './components/HomeWatch30';
import HomeWatch30h24h from './components/HomeWatch30and24';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import {windowHeight} from '../../utils/styles';
import {COLORS} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import SwitchContain from '../../components/SwitchContain/SwitchContain';

const HomeScreen = () => {
  const {whichWatch, today, homeCurrentTime, changeWatch} =
    useRootStore().homeClockStore;
  const [watch, setWatch] = useState(true);
  const {nearDay, filterNearDay, allEventsData} = useRootStore().calendarStore;
  const navigation = useNavigation();

  useEffect(() => {
    filterNearDay();
  }, [allEventsData]);

  const onChangeWatch = () => {
    setWatch(e => !e);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <RN.View style={styles.profile}>
                <RN.TouchableOpacity
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.MESSENGER as never)
                  }>
                  <Images.Svg.messageIcon />
                </RN.TouchableOpacity>
                <RN.TouchableOpacity>
                  <Images.Svg.userIcon />
                </RN.TouchableOpacity>
              </RN.View>
            }
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.watchBox}>
              <TextView text={'Jihad, Message to You!'} />
              <TextView
                title={'Today is your day! Do something good!'}
                style={styles.title}
              />
              <RN.View>{watch ? <HomeWatch24 /> : <HomeWatch30 />}</RN.View>
              <RN.View style={styles.dateBox}>
                <RN.View style={styles.todayBox}>
                  <RN.Text style={styles.day}>{today.day}</RN.Text>
                  <RN.Text style={styles.monthYear}>{today.monthYear}</RN.Text>
                  <RN.View style={styles.dateLine}>
                    <Images.Svg.dateBottomLine />
                  </RN.View>
                </RN.View>
                <AlarmNotification
                  day={nearDay?.day}
                  info={nearDay?.name}
                  date={`${nearDay?.date}`}
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.EVENTS_SCREEN as never)
                  }
                />
              </RN.View>
            </RN.View>
            <RN.View style={styles.watchSwitch}>
              <SwitchContain
                title="24h"
                _title="30h"
                back={watch}
                handlePress={onChangeWatch}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(HomeScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    height: windowHeight - windowHeight / 3.5,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    marginTop: 5,
  },
  profile: {
    flexDirection: 'row',
    gap: 10,
  },
  dateBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: -40,
    width: '100%',
  },
  todayBox: {
    alignItems: 'center',
  },
  day: {
    fontSize: 30,
    color: COLORS.yellow,
    textAlign: 'center',
  },
  monthYear: {
    fontSize: 14,
    color: COLORS.yellow,
  },
  dateLine: {
    marginTop: 5,
  },
  watchBox: {
    height: '90%',
  },
  watchSwitch: {
    alignItems: 'center',
  },
});
