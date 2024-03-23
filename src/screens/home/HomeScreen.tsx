import * as React from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';

const HomeScreen = () => {
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Home"
          />
        </RN.View>
      }
    />
  );
};

export default HomeScreen;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
