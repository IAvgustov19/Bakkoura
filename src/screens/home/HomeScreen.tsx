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
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import TodayEvent from './components/TodayEvent';

const HomeScreen = () => {
  // function getDate() {
  //   const subscriber = firestore()
  //     .collection('users')
  //     .onSnapshot(documentSnapshot => {
  //       console.log('User data: ', documentSnapshot.docs);
  //     });
  // }
  // useEffect(() => {
  //   getDate();
  // }, []);

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

  const renderWatchs = useCallback(() => {
    switch (whichWatch) {
      case 1:
        return <HomeWatch30h24h />;
      case 2:
        return <HomeWatch24 />;
      case 3:
        return <HomeWatch30 />;
      default:
        return <HomeWatch30h24h />;
    }
  }, [whichWatch]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Home"
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
              <RN.View>{renderWatchs()}</RN.View>
              <RN.View style={styles.dateBox}>
                <TodayEvent
                  day={nearDay?.day}
                  title={nearDay?.name}
                  date={nearDay?.date}
                />
                <AlarmNotification
                  time24={homeCurrentTime.time24}
                  time30={homeCurrentTime.time30}
                  extraTime={homeCurrentTime.timeExtra as never}
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.EVENTS_SCREEN as never)
                  }
                />
              </RN.View>
            </RN.View>
            <RN.View style={styles.watchSwitch}>
              <WatchSwitch />
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
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight - windowHeight / 3.3,
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
  watchBox: {
    height: '90%',
  },
  watchSwitch: {
    alignItems: 'center',
    top: -windowHeight / 20,
  },
});
