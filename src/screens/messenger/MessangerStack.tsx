import {createStackNavigator} from '@react-navigation/stack';
import { APP_ROUTES } from '../../navigation/routes';
import MessengerScreen from './MessengerScreen';
import DialogScreen from './DialogScreen';
import SearchContact from './SearchContact';

const Stack = createStackNavigator();

const Messanger = () => {
  return (
    <Stack.Navigator
      initialRouteName={APP_ROUTES.PERSONAL_AREA}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={APP_ROUTES.MESSENGER}
        component={MessengerScreen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.DIALOG_SCREEN}
        component={DialogScreen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.SEARCH_CONTACT}
        component={SearchContact}
        options={{
          headerTitleAlign: 'center',
        }}
      />

    </Stack.Navigator>
  );
};

export default Messanger;
