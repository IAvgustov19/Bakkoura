import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../../../screens/auth/SignInScreen/SignInScreen';
import OnBoardingScreen from '../../../screens/onBoarding/OnBoarding';
import {APP_ROUTES} from '../../routes';
import PasswordPrompt from '../../../screens/home/secureEntry/passwordAuth';
import FingerprintAuth from '../../../screens/home/secureEntry/fingerprintAuth';

const Stack = createStackNavigator();

const TwoStepAuth = () => {
  return (
    <Stack.Navigator
    initialRouteName={APP_ROUTES.PASSWORD}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={APP_ROUTES.PASSWORD} component={PasswordPrompt} />
      <Stack.Screen name={APP_ROUTES.FINGERPRINT} component={FingerprintAuth} />
    </Stack.Navigator>
  );
};

export default TwoStepAuth;
