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
import { db } from '../../config/firebase';
import { observer } from 'mobx-react-lite';
import { windowHeight } from '../../utils/styles';
import { useNavigation } from '@react-navigation/native';
import { APP_ROUTES } from '../../navigation/routes';
import TodayEvent from './components/TodayEvent';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ActivityIndicator, Text } from 'react-native';
import { COLORS } from '../../utils/colors';
import TextView from '../../components/Text/Text';
import { t } from '../../i18n';

const HomeScreen = () => {
  const { whichWatch, homeCurrentTime } = useRootStore().homeClockStore;
  const { getPersonalState } = useRootStore().personalAreaStore;
  const { nearDay, filterNearDay, allEventsData } = useRootStore().calendarStore;
  const navigation = useNavigation();
  const { personalAreaData, updateLoading } = useRootStore().personalAreaStore;
  const [userData, setUserData] = useState(null);
  const [activity, setActivity] = useState(false);

  const {
    userData: messageData,
  } = useRootStore().messangerStore;


  useEffect(() => {
    const checkUnreadMessages = () => {
      const hasUnread = messageData.some(user => user.unreadMessages > 0);
      setActivity(hasUnread);
    };

    checkUnreadMessages();
  }, [messageData]);


  const fetchUserData = async uid => {
    try {
      const userDoc = await db
        .collection('etaps')
        .where('uid', '==', uid)
        .get();
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

  const [avatarLoading, setAvatarLoading] = useState(true);

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
            rightItem={
              <RN.View style={styles.profile}>
                <RN.TouchableOpacity
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.MESSENGER as never)
                  }>
                  <Images.Svg.messageIcon/>
                  {activity && <RN.View style={styles.activity} />}
                </RN.TouchableOpacity>
                <RN.TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.PERSONAL_STACK as never)
                  }>
                  {personalAreaData?.avatar ? (
                    <RN.View style={styles.imageContainer}>
                      <Images.Svg.profileBackground width={55} height={55} />
                      <RN.Image
                        source={{ uri: personalAreaData.avatar }}
                        style={styles.profileImg}
                        onLoadEnd={() => setAvatarLoading(false)}
                      />
                      {avatarLoading || updateLoading ? (
                        <RN.View style={styles.loadingBox}>
                          <ActivityIndicator
                            color={COLORS.black}
                            style={{ marginTop: 3 }}
                          />
                        </RN.View>
                      ) : null}
                    </RN.View>
                  ) : (
                    <Images.Svg.userIcon width={50} height={50} />
                  )}
                </RN.TouchableOpacity>
              </RN.View>
            }
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.watchBox}>
              <TextView
                style={[styles.title, { marginTop: -15 }]}
                text={`${personalAreaData.name}, ${t("Message to You!")}`}
              />
              <TextView
                fonWeight="300"
                style={[styles.title, { marginTop: 5 }]}
                title={`${t("Today is your day! Do something good!")}`}
              />
              <RN.View style={styles.renderWatchs}>{renderWatchs()}</RN.View>
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
    fontSize: 14,
    // marginTop: 5,
  },
  profile: {
    flexDirection: 'row',
    gap: 10,
    justifyContent:'center',
    alignItems:'center'
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
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  profileImg: {
    width: 45,
    height: 45,
    borderRadius: 22,
    position: 'absolute',
    zIndex: 2,
  },
  renderWatchs: {
    marginTop: 9,
  },
  activity: {
    height: 9,
    width: 9,
    right: 7,
    top: 8,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'red',
  }
});
