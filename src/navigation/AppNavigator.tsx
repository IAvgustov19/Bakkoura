import * as React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { APP_ROUTES } from './routes';
import BottomTabNavigation from './BottomTabNavigation';
import OnBoardingScreen from '../screens/onBoarding/OnBoarding';
import NewEvent from '../screens/calendar/NewEventScreen';
import RepeatScreen from '../screens/calendar/RepeatScreen';
import RepeatEtap from '../screens/timeTogether/RepeatEtap';
import DateScreen from '../screens/calendar/DateScreen';
import TimeScreen from '../screens/calendar/TimeScreen';
import SignInScreen from '../screens/auth/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen/SignUpScreen';
import RecoverPasswordScreen from '../screens/auth/RecoverPassword/RecoverPassword';
import VerificationCodeScreen from '../screens/auth/VerificationCode/VerificationCode';
import NewPasswordScreen from '../screens/auth/NewPassword/NewPasswordScreen';
import { observer } from 'mobx-react-lite';
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
import { Keyboard } from 'react-native';
import CreateSector from '../screens/bakkouraWatch/CreateSector';
import SectorName from '../screens/bakkouraWatch/SectorName';
import SectorColor from '../screens/bakkouraWatch/SectorColor';
import SectorTime from '../screens/bakkouraWatch/SectorTime';
import NewTask from '../screens/todoTimer/NewTask';
import TodoGoal from '../screens/todoTimer/TodoGoal';
import TaskName from '../screens/todoTimer/TaskName';
import TodoTimerHistory from '../screens/todoTimer/TodoTimerHistory';
import OneMonthAndEvents from '../screens/calendar/OneMonthAndEvents';
import OrderScreen from '../screens/market/OrderScreen';
import MarketWebView from '../screens/market/MarketVebWiew';
import Consultation from '../screens/timeClinic/Consultation';
import TimeManagement from '../screens/timeClinic/TimeManagement';
import ConsultationThanks from '../screens/timeClinic/Thanks';
import TheBook from '../screens/timeClinic/TheBook';
import JihadBakkouraTimeClinic from '../screens/timeClinic/JihadBakkouraTimeClinic';
import Concept30h from '../screens/timeClinic/Concept30h';
import PersonalStack from '../screens/personalArea/personalStack';
import SendIdea from '../screens/timeBiotic/SendIdea';
import ContactThanks from '../screens/timeBiotic/ContactThanks';
import ContactUs from '../screens/timeBiotic/ContactUs';
import WatchValuation from '../screens/timeBiotic/WatchValuation';
import BtsNavigation from '../screens/timeBiotic/BtsNavigation';
import WatchThanks from '../screens/timeBiotic/WatchThanks';
import IdeaThanks from '../screens/timeBiotic/IdeaThanks';

import AboutTime from '../screens/timeClinic/AboutTime';
import AboutTimeInfo from '../screens/timeClinic/AboutTimeInfo';
import TimeWealth from '../screens/timeClinic/TimeWealth';
import FrancVila from '../screens/timeClinic/FrancVila';
import OrderThanks from '../screens/market/components/thanks/Thanks';
import firestore from '@react-native-firebase/firestore';
import WatchConstructor from '../screens/watchConstructor/WatchConstructor';
import Wallpapers from '../screens/timeBiotic/Wallpapers';
import auth from '@react-native-firebase/auth';
import PasswordPrompt from '../screens/home/secureEntry/passwordAuth';
import FingerprintAuth from '../screens/home/secureEntry/fingerprintAuth';
import RepeatTypeScreen from '../screens/alarm/RepeatTypeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { getPersonalState } = useRootStore().personalAreaStore;
  const [keyboardStatus, setKeyboardStatus] = React.useState('');

  React.useEffect(() => {
    getPersonalState();
  }, []);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const { isAuthorized } = useRootStore().authStore;

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
          name={APP_ROUTES.ONE_MONTH_AND_EVENTS}
          component={OneMonthAndEvents}
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
          name={APP_ROUTES.REPEAT_ETAP}
          component={RepeatEtap}
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
        <Stack.Screen
          name={APP_ROUTES.CREATE_SECTOR}
          component={CreateSector}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.SECTOR_NAME}
          component={SectorName}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.SECTOR_COLOR}
          component={SectorColor}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.SECTOR_TIME}
          component={SectorTime}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.NEW_TASK}
          component={NewTask}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.TODO_GOAL}
          component={TodoGoal}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.TASK_NAME}
          component={TaskName}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.TODO_TIMER_HISTORY}
          component={TodoTimerHistory}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.ORDER_SCREEN}
          component={OrderScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.ORDER_THANKS}
          component={OrderThanks}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.MARKET_WEB_VIEW}
          component={MarketWebView}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.CONSULTATION}
          component={Consultation}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.TIME_MANAGEMENT}
          component={TimeManagement}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.CONSULTATION_THANKS}
          component={ConsultationThanks}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.THE_BOOK}
          component={TheBook}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.JIHAD_BAKKOURA_TIME_CLINIC}
          component={JihadBakkouraTimeClinic}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.CONCEPT_30H}
          component={Concept30h}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.PERSONAL_STACK}
          component={PersonalStack}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.ABOUT_TIME}
          component={AboutTime}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.SEND_IDEA}
          component={SendIdea}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.ABOUT_TIME_INFO}
          component={AboutTimeInfo}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.CONTACT_THANKS}
          component={ContactThanks}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.TIME_WEALTH}
          component={TimeWealth}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.WATCH_THANKS}
          component={WatchThanks}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.FRANS_VILA}
          component={FrancVila}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.IDEA_THANKS}
          component={IdeaThanks}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.CONTACT_US}
          component={ContactUs}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.WATCH_VALUATION}
          component={WatchValuation}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.BTS_NAVIGATION}
          component={BtsNavigation}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.WATCH_CONSTRUCTOR}
          component={WatchConstructor}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={APP_ROUTES.WALLPAPERS}
          component={Wallpapers}
          options={{
            headerTitleAlign: 'center',
          }}
        />



      </>
    );
  };
        <Stack.Screen
          name={APP_ROUTES.REPEAT_TYPE_SCREEN}
          component={RepeatTypeScreen}
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
        detachInactiveScreens={true}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        {/* {!isAuthorized && renderPublicNavigators() || renderPrivateNavigators()} */}
        {!isAuthorized && renderPublicNavigators() || renderPrivateNavigators()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(AppNavigator);
