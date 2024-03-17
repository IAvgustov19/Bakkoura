import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';

const MarketScreen = () => {
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <TextView title="Messenger screen" />
        </RN.View>
      }
    />
  );
};

export default MarketScreen;

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
