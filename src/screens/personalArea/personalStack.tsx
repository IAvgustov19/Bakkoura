import React from 'react';
import Menu from './screens/menu';
import PersonalArea from './screens';
import Theme from './screens/theme';
import SecureEntry from './screens/secureEntry';
import LoginPassword from './screens/loginPassword';
import PersonalDetails from './screens/personalDetails';
import {APP_ROUTES} from '../../navigation/routes';
import LanguageScreen from '../LanguageScreen/LanguageScreen';
import {createStackNavigator} from '@react-navigation/stack';
import PersonStartScreen from './screens/personStartScreen';

const Stack = createStackNavigator();

const PersonalStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={APP_ROUTES.PERSONAL_AREA}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={APP_ROUTES.PERSONAL_AREA}
        component={PersonalArea}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.PERSONAL_DETAILS}
        component={PersonalDetails}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.SECURE_ENTRY}
        component={SecureEntry}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.THEME}
        component={Theme}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.LOGIN_PASSWORD}
        component={LoginPassword}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.LANGUAGE_SCREEN}
        component={LanguageScreen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.MENU}
        component={Menu}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.PERSON_START_SCREEN}
        component={PersonStartScreen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default PersonalStack;
