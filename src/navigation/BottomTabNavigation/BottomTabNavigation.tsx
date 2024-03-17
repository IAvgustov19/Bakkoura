import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import RN from '../../components/RN';
import {bottomTabBarOptions} from './BottomTabNavigation.constants';
import MyTabbar from './components/MyTabbar';

const Tab = createBottomTabNavigator();

const BottomTabNavigation: FC = () => {
  const renderTabScreenItem = (i: (typeof bottomTabBarOptions.list)[0]) => (
    <Tab.Screen key={i.index} name={i.tabName} component={i.component} />
  );

  const renderTabScreens = () =>
    bottomTabBarOptions.list.map(renderTabScreenItem);

  return (
    <Tab.Navigator
      tabBar={props => <MyTabbar {...props} />}
      screenOptions={bottomTabBarOptions.options}>
      {renderTabScreens()}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
