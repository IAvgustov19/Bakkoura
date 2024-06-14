import React, { useCallback, useEffect, useState } from 'react';
import { Images } from '../../assets';
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
import { observer } from 'mobx-react-lite';
import { windowHeight } from '../../utils/styles';
import { useNavigation } from '@react-navigation/native';
import { APP_ROUTES } from '../../navigation/routes';
import TodayEvent from './components/TodayEvent';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { db } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Alert, Modal, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import PasswordPrompt from './secureEntry/SecureAuth';

const rnBiometrics = new ReactNativeBiometrics();

const HomeScreen = () => {
  const { whichWatch, homeCurrentTime } = useRootStore().homeClockStore;
  const { getPersonalState } = useRootStore().personalAreaStore;
  const { nearDay, filterNearDay, allEventsData } = useRootStore().calendarStore;
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPromptVisible, setPromptVisible] = useState(false);

  useEffect(() => {
    getPersonalState();
    filterNearDay();
    // checkAuthentication(); 
  }, []);

  // const checkAuthentication = async () => {
  //   const authType = await fetchUserAuthType();
  //   if (authType === 'Password') {
  //     console.log('haaaa')
  //     promptForPassword();
  //   } else if (authType === 'FingerPrint') {
  //     promptForFingerprint();
  //   }
  // };

  // const fetchUserAuthType = async () => {
  //   const user = auth().currentUser;
  //   if (user) {
  //     const userDoc = await db.collection('users').doc(user.uid).get();
  //     return userDoc.data()?.secureEntry;
  //   }
  //   return null;
  // };

  // const promptForPassword = async () => {
  //   const storedCredentials = await Keychain.getGenericPassword();
  //   console.log(storedCredentials)
  //   if (!storedCredentials) {
  //     setPromptVisible(true);
  //   }
  // };

  // const handleSubmitPassword = (inputPassword) => {
  //   // Handle password submission here
  //   console.log('Submitted password:', inputPassword);
  //   setPromptVisible(false);
  //   setIsAuthenticated(true);
  // };

  // const handleCancelPrompt = () => {
  //   // Handle cancel action
  //   console.log('Prompt canceled');
  //   setPromptVisible(false);
  // };

  // const promptForFingerprint = async () => {
  //   const { available } = await rnBiometrics.isSensorAvailable();
  //   if (available) {
  //     const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
  //     if (success) {
  //       setIsAuthenticated(true);
  //     } else {
  //       Alert.alert('Authentication Failed', 'Fingerprint authentication failed');
  //     }
  //   } else {
  //     Alert.alert('Fingerprint not supported', 'Your device does not support fingerprint authentication');
  //   }
  // };

  // const logOut = async () => {
  //   await AsyncStorage.removeItem('token');
  //   const user = auth().currentUser;
  //   if (user) {
  //     await auth().signOut();
  //   }
  //   const googleUser = await GoogleSignin.getCurrentUser();
  //   if (googleUser) {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //   }
  // };

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

  // if (!isAuthenticated) {
  //   return (
  //     <LinearContainer>
  //       <RN.View style={styles.container}>
  //         <TextView title="Please authenticate to continue" />
  //       </RN.View>
  //       <PasswordPrompt // Render PasswordPrompt when authentication is required
  //         isVisible={isPromptVisible}
  //         onSubmit={handleSubmitPassword}
  //         onCancel={handleCancelPrompt}
  //         hasBiometrics={true} // You can set this based on your logic
  //       />
  //     </LinearContainer>
  //   );
  // }

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
                <RN.TouchableOpacity
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.PERSONAL_STACK as never)
                  }
                  // onPress={() => logOut()}
                >
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
