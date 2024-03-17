import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import RN from '../../components/RN';
import SwitchBtn from '../../components/SwitchBtn/SwitchBtn';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import TabbarItem from '../../components/TabbarItem/TabbarItem';
import TextView from '../../components/Text/Text';

const HomeScreen = () => {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={['#323D45', '#1B2024', '#0C0C0C']}>
      <View style={styles.container}>
        <TextView title="Home screen" />
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
