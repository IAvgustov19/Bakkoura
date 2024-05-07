import React from 'react'
import PersonalArea from './screens';
import Theme from './screens/theme';
import SecureEntry from './screens/secureEntry';
import LoginPassword from './screens/loginPassword';
import PersonalDetails from './screens/personalDetails';
import { APP_ROUTES } from '../../navigation/routes';
import LanguageScreen from '../LanguageScreen/LanguageScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ContactStack from '../contactUs/ContactStack';
import ContactUs from '../contactUs/screens/ContactUs';
import ContactThanks from '../contactUs/screens/ContactThanks';
import SendIdea from '../contactUs/screens/SendIdea';
import WatchValuation from '../contactUs/screens/WatchValuation';
import Menu from './screens/menu';

const Stack = createStackNavigator();

const PersonalStack = () => {

    return (
        <Stack.Navigator initialRouteName={APP_ROUTES.PERSONAL_AREA} screenOptions={{ headerShown: false }}>
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
            {/* menu */}

            <Stack.Screen
                name={APP_ROUTES.MENU}
                component={Menu}
                options={{
                    headerTitleAlign: 'center',
                }}
            />
            {/* nested screens */}
            <Stack.Screen
                name={APP_ROUTES.SEND_IDEA}
                component={SendIdea}
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
                name={APP_ROUTES.CONTACT_THANKS}
                component={ContactThanks}
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
        </Stack.Navigator>
    )
}



export default PersonalStack;
