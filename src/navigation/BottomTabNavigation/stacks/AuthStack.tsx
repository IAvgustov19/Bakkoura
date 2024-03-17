import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../../../screens/auth/SignInScreen/SignInScreen';
import OnBoardingScreen from '../../../screens/onBoarding/OnBoarding';
import {APP_ROUTES} from '../../routes';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={APP_ROUTES.ONBOARDING}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={APP_ROUTES.ONBOARDING} component={OnBoardingScreen} />
      <Stack.Screen name={APP_ROUTES.AUTH_START} component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
