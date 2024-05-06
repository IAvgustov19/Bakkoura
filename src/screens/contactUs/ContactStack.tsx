import React from 'react'
import { APP_ROUTES } from '../../navigation/routes';
import { createStackNavigator } from '@react-navigation/stack';
import ContactUs from './screens/ContactUs';
import SendIdea from './screens/SendIdea';
import WatchValuation from './screens/WatchValuation';
import Thanks from './screens/ContactThanks';
import ContactThanks from './screens/ContactThanks';

const Stack = createStackNavigator();

const ContactStack = () => {

    return (
        <Stack.Navigator initialRouteName={APP_ROUTES.CONTACT_US} screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={APP_ROUTES.SEND_IDEA}
                component={SendIdea}
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
        </Stack.Navigator>
    )
}



export default ContactStack;
