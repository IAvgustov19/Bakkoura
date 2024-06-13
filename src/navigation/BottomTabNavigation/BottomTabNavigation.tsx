import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';
import useRootStore from '../../hooks/useRootStore';
import {bottomTabBarOptions} from './BottomTabNavigation.constants';
import MyTabbar from './components/MyTabbar';

const Tab = createBottomTabNavigator();

const BottomTabNavigation: FC = () => {
  const {inActiveMenus, initialRouteName} = useRootStore().personalAreaStore;
  // const renderTabScreenItem = useCallback(
  //   (i: (typeof bottomTabBarOptions.list)[0]) => (
  //     <Tab.Screen key={i.index} name={i.tabName} component={i.component} />
  //   ),
  //   [inActiveMenus, initialRouteName],
  // );

  const renderTabScreens = useCallback(() => {
    return bottomTabBarOptions.list
      .filter(item => !inActiveMenus.includes(item.key))
      .map(i => (
        <Tab.Screen key={i.index} name={i.tabName} component={i.component} />
      ));
  }, [inActiveMenus, initialRouteName]);

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName.routeName}
      tabBar={props => <MyTabbar {...props} />}
      screenOptions={bottomTabBarOptions.options}>
      {renderTabScreens()}
    </Tab.Navigator>
  );
};

export default observer(BottomTabNavigation);
