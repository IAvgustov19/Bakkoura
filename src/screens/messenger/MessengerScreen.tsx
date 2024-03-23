import React from 'react';
import RN from '../../components/RN';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets';

const MessengerScreen = () => {
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Messenger"
          />
        </RN.View>
      }
    />
  );
};

export default MessengerScreen;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
