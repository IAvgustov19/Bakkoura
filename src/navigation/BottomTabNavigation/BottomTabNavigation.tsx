import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';
import useRootStore from '../../hooks/useRootStore';
import {bottomTabBarOptions} from './BottomTabNavigation.constants';
import MyTabbar from './components/MyTabbar';

const Tab = createBottomTabNavigator();

const BottomTabNavigation: FC = () => {
  const renderTabScreenItem = (i: (typeof bottomTabBarOptions.list)[0]) => (
    <Tab.Screen key={i.index} name={i.tabName} component={i.component} />
  );
  const {inActiveMenus} = useRootStore().personalAreaStore;

  const renderTabScreens = useCallback(() => {
    return bottomTabBarOptions.list
      .filter(item => !inActiveMenus.includes(item.key))
      .map(renderTabScreenItem);
  }, [inActiveMenus]);

  return (
    <Tab.Navigator
      tabBar={props => <MyTabbar {...props} />}
      screenOptions={bottomTabBarOptions.options}>
      {renderTabScreens()}
    </Tab.Navigator>
  );
};

export default observer(BottomTabNavigation);
