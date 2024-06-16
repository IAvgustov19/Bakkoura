import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback, useEffect, useState} from 'react';
import useRootStore from '../../hooks/useRootStore';
import {bottomTabBarOptions} from './BottomTabNavigation.constants';
import MyTabbar from './components/MyTabbar';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';
import { db } from '../../config/firebase';
import RN from '../../components/RN';
import PasswordPrompt from '../../screens/home/secureEntry/passwordAuth';
import FingerprintAuth from '../../screens/home/secureEntry/fingerprintAuth';


const Tab = createBottomTabNavigator();

const BottomTabNavigation: FC = () => {
  const {inActiveMenus, initialRouteName} = useRootStore().personalAreaStore;
  // const renderTabScreenItem = useCallback(
  //   (i: (typeof bottomTabBarOptions.list)[0]) => (
  //     <Tab.Screen key={i.index} name={i.tabName} component={i.component} />
  //   ),
  //   [inActiveMenus, initialRouteName],
  // );

  const renderTabScreens = useCallback(() => {
    return bottomTabBarOptions.list
      .filter(item => !inActiveMenus.includes(item.key))
      .map(i => (
        <Tab.Screen key={i.index} name={i.tabName} component={i.component} />
      ));
  }, [inActiveMenus, initialRouteName]);



  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPromptVisible, setPromptVisible] = useState(false);
  const [authType, setAuthType] = useState('');
  const [storedPassword, setStoredPassword] = useState('');


  useEffect(() => {
    checkPasswordAuth();
    setPromptVisible(true);
  }, []);


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = auth().currentUser;
        if (!user) {
          console.error('User not authenticated');
          return;
        }
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (!userDoc.exists) {
          console.error('User document not found');
          return;
        }
        const userData = userDoc.data();
        if (!userData || !userData.secureEntry) {
          console.error('Secure entry data not found');
          return;
        }
        const authType = userData.secureEntry;

        if (authType === 'Password') {
          setAuthType('Password');
        } else if (authType === 'FingerPrint') {
          setAuthType('FingerPrint');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        Alert.alert('Error', 'An error occurred while checking authentication.');
      }
    };

    checkAuthentication();
  }, []);

  const checkPasswordAuth = async () => {
    try {
      const storedCredentials = await Keychain.getGenericPassword();
      if (storedCredentials) {
        const password = storedCredentials.password;
        setStoredPassword(password);
      } else {
        setPromptVisible(true);
      }
    } catch (error) {
      console.error('Error retrieving stored password:', error);
    }
  };

  const handleSubmitPassword = useCallback(async (inputPassword) => {
    if (!storedPassword) {
      try {
        await Keychain.setGenericPassword('user', inputPassword);
        setStoredPassword(inputPassword);
        setIsAuthenticated(true);
        setPromptVisible(false);
      } catch (error) {
        console.error('Error storing password:', error);
      }
    } else if (inputPassword === storedPassword) {
      setIsAuthenticated(true);
      setPromptVisible(false);
    } else {
      console.log('Incorrect password');
      Alert.alert('Incorrect Password', 'Please enter the correct password.');
    }
  }, [storedPassword]);

  const handleAuthenticationSuccess = () => {
    setIsAuthenticated(true);
    setPromptVisible(false);
  };


  return (
    <>
    {!isAuthenticated ? (
      <RN.View>
        {authType == 'Password' && (
          <PasswordPrompt
          isVisible={isPromptVisible}
            onSubmit={handleSubmitPassword}
          />
        )}
        {authType == 'FingerPrint' && <FingerprintAuth onAuthenticationSuccess={handleAuthenticationSuccess} />}
      </RN.View>
    ) : (
    <Tab.Navigator
      initialRouteName={initialRouteName.routeName}
      tabBar={props => <MyTabbar {...props} />}
      screenOptions={bottomTabBarOptions.options}>
      {renderTabScreens()}
    </Tab.Navigator>)}
    </>
  );
};

export default observer(BottomTabNavigation);
