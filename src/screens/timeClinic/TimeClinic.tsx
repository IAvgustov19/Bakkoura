import React from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SwitchContain from '../../components/SwitchContain/SwitchContain';

const TimeClinic = () => {
  return (
    <LinearContainer
      children={
        <RN.View>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Time Clinic"
            rightItem={<SwitchContain title="24h" _title="30h" back={true} />}
          />
        </RN.View>
      }
    />
  );
};

export default TimeClinic;
