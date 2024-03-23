import React from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';

const BakkouraWatch = () => {
  return (
    <LinearContainer
      children={
        <RN.View>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Bakkoura Watch"
          />
        </RN.View>
      }
    />
  );
};

export default BakkouraWatch;
