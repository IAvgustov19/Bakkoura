import React, { useCallback, useEffect, useState } from 'react';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import WatchSwitch from './components/WatchSwitch/WatchSwitch';
import AlarmNotification from './components/AlarmNotification';
import HomeWatch24 from './components/HomeWatch24';
import HomeWatch30 from './components/HomeWatch30';
import HomeWatch30h24h from './components/HomeWatch30and24';
import useRootStore from '../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import { windowHeight } from '../../utils/styles';
import auth from '@react-native-firebase/auth';
import TodayEvent from './components/TodayEvent';
import { APP_ROUTES } from '../../navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid, Text } from 'react-native';
import Notifications from '../../notification/localPush';
import { db } from '../../config/firebase';

const HomeScreen = () => {

  const { whichWatch, homeCurrentTime } = useRootStore().homeClockStore;
  const { getPersonalState } = useRootStore().personalAreaStore;
  const { nearDay, filterNearDay, allEventsData } = useRootStore().calendarStore;
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await db.collection('etaps').where('uid', '==', uid).get();
      if (userDoc) {
        const repeatArray = userDoc.docs.map(doc => doc.data());
        setUserData(repeatArray);
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getPersonalState();
    filterNearDay();
    const currentUser = auth().currentUser;
    fetchUserData(currentUser.uid);
  }, []);

  const handleScheduleNotification = () => {
    userData.forEach(item => {
      const currentDate:any = new Date();
      const fromDate: any = new Date(item.fromDateFormat);
      const targetTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 25, 0); 
      let notificationMessage = '';
      const repeatLower = item.repeat.toLowerCase(); 
      const daysDating = Math.floor((currentDate - fromDate) / (1000 * 60 * 60 * 24));
  
      switch (repeatLower) {
        case 'daily':
          notificationMessage = `${item.type} with ${item.name}. ${daysDating} days.`;
          Notifications.scheduleNotification(targetTime, notificationMessage, 'day', 24 * 60 * 60 * 1000);
          break;
        case 'monthly':
          notificationMessage = `${item.type} with ${item.name}.${daysDating} days.`;
          Notifications.scheduleNotification(targetTime, notificationMessage, 'month', 30 * 24 * 60 * 60 * 1000);
          break;
        case 'yearly':
          notificationMessage = `${item.type} with ${item.name}. ${daysDating} days.`;
          Notifications.scheduleNotification(targetTime, notificationMessage, 'year', 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          console.log(`Invalid repeat type for ${item.name}`);
      }
    });
  };
  
  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'Allow this app to send you notifications.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      handleScheduleNotification()
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    getPersonalState();
    filterNearDay();

  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    const user = auth().currentUser;
    if (user) {
      await auth().signOut();
    }
    const googleUser = await GoogleSignin.getCurrentUser();
    if (googleUser) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
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
                  onPress={() => navigation.navigate(APP_ROUTES.MESSENGER as never)}>
                  <Images.Svg.messageIcon />
                </RN.TouchableOpacity>
                <RN.TouchableOpacity
                  onPress={() => navigation.navigate(APP_ROUTES.PERSONAL_STACK as never)}>
                  <Images.Svg.userIcon />
                </RN.TouchableOpacity>
              </RN.View>
            }
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.watchBox}>
              <Text>Jihad, Message to You!</Text>
              <Text style={styles.title}>
                Today is your day! Do something good!
              </Text>
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
