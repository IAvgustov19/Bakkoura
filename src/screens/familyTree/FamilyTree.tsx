import React from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';

const FamilyTree = () => {
  return (
    <LinearContainer
      children={
        <RN.View>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Family Tree"
          />
        </RN.View>
      }
    />
  );
};

export default FamilyTree;
