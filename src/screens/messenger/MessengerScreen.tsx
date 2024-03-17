import React from 'react';
import RN from '../../components/RN';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextView from '../../components/Text/Text';

const MessengerScreen = () => {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={['#323D45', '#1B2024', '#0C0C0C']}>
      <RN.View style={styles.container}>
        <TextView title="Messenger screen" />
      </RN.View>
    </LinearGradient>
  );
};

export default MessengerScreen;

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
