/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {observer} from 'mobx-react-lite';
import RN from './src/components/RN';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <>
      <RN.StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <AppNavigator />
    </>

  );
};

export default observer(App);
