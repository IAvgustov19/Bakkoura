import React from 'react';
import {StyleSheet} from 'react-native';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';

const Metronome = () => {
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

export default Metronome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
