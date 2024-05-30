import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback, useEffect} from 'react';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import {bottomTabBarOptions} from './BottomTabNavigation.constants';
import MyTabbar from './components/MyTabbar';
import firestore from '@react-native-firebase/firestore';

const Tab = createBottomTabNavigator();

const BottomTabNavigation: FC = () => {
  const renderTabScreenItem = (i: (typeof bottomTabBarOptions.list)[0]) => (
    <Tab.Screen key={i.index} name={i.tabName} component={i.component} />
  );
  const {getPersonalState, getUsersState, users, inActiveMenus} =
    useRootStore().personalAreaStore;
  const {currentUserEmail} = useRootStore().authStore;

  const renderTabScreens = useCallback(() => {
    return bottomTabBarOptions.list
      .filter(item => !inActiveMenus.includes(item.key))
      .map(renderTabScreenItem);
  }, [inActiveMenus]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const usersData = snapshot?.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        getUsersState(usersData);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getPersonalState();
  }, [users, currentUserEmail]);

  return (
    <Tab.Navigator
      tabBar={props => <MyTabbar {...props} />}
      screenOptions={bottomTabBarOptions.options}>
      {renderTabScreens()}
    </Tab.Navigator>
  );
};

export default observer(BottomTabNavigation);
