import React from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';

const JihadBakkoura = () => {
  return (
    <LinearContainer
      children={
        <RN.View>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Jihad Bakkoura"
          />
        </RN.View>
      }
    />
  );
};

export default JihadBakkoura;
