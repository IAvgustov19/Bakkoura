import * as React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {APP_ROUTES} from './routes';
import BottomTabNavigation from './BottomTabNavigation';
import OnBoardingScreen from '../screens/onBoarding/OnBoarding';
import NewEvent from '../screens/calendar/NewEventScreen';
import RepeatScreen from '../screens/calendar/RepeatScreen';
import DateScreen from '../screens/calendar/DateScreen';
import TimeScreen from '../screens/calendar/TimeScreen';
import SignInScreen from '../screens/auth/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen/SignUpScreen';
import RecoverPasswordScreen from '../screens/auth/RecoverPassword/RecoverPassword';
import VerificationCodeScreen from '../screens/auth/VerificationCode/VerificationCode';
import NewPasswordScreen from '../screens/auth/NewPassword/NewPasswordScreen';
import {observer} from 'mobx-react-lite';
import useRootStore from '../hooks/useRootStore';
import LanguageScreen from '../screens/LanguageScreen/LanguageScreen';
import StressTestDuring from '../screens/stressTest/StressTestDuring/StressTestDuring';
import NewAlarmScreen from '../screens/alarm/NewAlarm';
import NameAlarm from '../screens/alarm/NameAlarm';
import CitesScreen from '../screens/worldTime/CitesScreen';
import NewProjectTimer from '../screens/projectTimer/NewProjectTimer';
import NewProjectTimerPrice from '../screens/projectTimer/NewProjectTimerPrice';
import ProjectTimerCalculator from '../screens/projectTimer/ProjectTImerCalculator';
import AddTaskScreen from '../screens/pomodoro/AddTaskScreen';
import AddEtap from '../screens/timeTogether/AddEtap';
import DeleteEtap from '../screens/timeTogether/DeleteEtap';
import FromDate from '../screens/timeTogether/FromDate';
import LoverName from '../screens/timeTogether/LoverName';
import Synchronyze from '../screens/timeTogether/Synchronyze';
import Thanks from '../screens/timeTogether/Thanks';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {isAuthorized} = useRootStore().authStore;

  const renderPublicNavigators = () => {
    return (
      <>
        <Stack.Screen
          name={APP_ROUTES.ONBOARDING}
          component={OnBoardingScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.AUTH_SIGN_IN}
          component={SignInScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.AUTH_SIGN_UP}
          component={SignUpScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.RECOVER_PASSWORD}
          component={RecoverPasswordScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.VERIFICATION_CODE}
          component={VerificationCodeScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.NEW_PASSWORD_SCREEN}
          component={NewPasswordScreen}
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
      </>
    );
  };

  const renderPrivateNavigators = () => {
    return (
      <>
        <Stack.Screen
          name={APP_ROUTES.BOTTOM_NAVIGATION}
          component={BottomTabNavigation}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.NEW_EVENT}
          component={NewEvent}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.REPEAT}
          component={RepeatScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.DATE_SCREEN}
          component={DateScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.TIME_SCREEN}
          component={TimeScreen}
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
          name={APP_ROUTES.STRESS_TEST_DURING}
          component={StressTestDuring}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.NEW_ALARM_SCREEN}
          component={NewAlarmScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.NAME_ALARM}
          component={NameAlarm}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.CITIES_SCREEN}
          component={CitesScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.NEW_PROJECT_TIMER}
          component={NewProjectTimer}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.NEW_PROJECT_TIMER_PRICE}
          component={NewProjectTimerPrice}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.PROJECT_TIMER_CALCULATOR}
          component={ProjectTimerCalculator}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.ADD_TASK_SCREEN}
          component={AddTaskScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.ADD_ETAP}
          component={AddEtap}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.DELETE_ETAP}
          component={DeleteEtap}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.FROM_DATE}
          component={FromDate}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.LOVER_NAME}
          component={LoverName}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.SYNCHRONYZE}
          component={Synchronyze}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.THANKS}
          component={Thanks}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </>
    );
  };

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName={APP_ROUTES.BOTTOM_NAVIGATION}
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        {isAuthorized ? renderPrivateNavigators() : renderPublicNavigators()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(AppNavigator);
