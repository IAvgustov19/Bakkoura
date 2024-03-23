import React from 'react';
import RN from '../../components/RN';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets';

const ToDoTimer = () => {
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="To do Timer"
          />
        </RN.View>
      }
    />
  );
};

export default ToDoTimer;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
