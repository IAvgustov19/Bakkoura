import React from 'react';
import {Images} from '../../../assets';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import {windowWidth} from '../../../utils/styles';

const InitialScreen = () => {
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <Images.Svg.btsInitial width={windowWidth - 40} />
        </RN.View>
      }
    />
  );
};

export default InitialScreen;

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
