import React from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';

const Podcasts = () => {
  return (
    <LinearContainer
      children={
        <RN.View>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Podcasts"
          />
        </RN.View>
      }
    />
  );
};

export default Podcasts;
