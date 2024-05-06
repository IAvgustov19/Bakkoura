import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../../assets';
import ButtonComp from '../../../../components/Button/Button';
import HeaderContent from '../../../../components/HeaderContent/HeaderContent';
import RN from '../../../../components/RN';
import SimpleBtn from '../../../../components/SimpleBtn/SimpleBtn';
import TextView from '../../../../components/Text/Text';
import {windowHeight} from '../../../../utils/styles';

type Props = {};

const Thanks: React.FC<Props> = ({}) => {
  return (
    <RN.View style={styles.container}>
      <HeaderContent leftItem={<Images.Svg.btsGreyLogo />} />
      <RN.View style={styles.content}>
        <TextView title="Thank You" />
        <TextView text="Your order has been sent. We will contact you shortly to clarify the details." />
        <SimpleBtn title={'Ok'} width={150} />
      </RN.View>
    </RN.View>
  );
};

export default Thanks;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    paddingHorizontal: 10,
    height: windowHeight - windowHeight / 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
