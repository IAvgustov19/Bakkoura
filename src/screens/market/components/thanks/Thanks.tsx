import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Images } from '../../../../assets';
import ButtonComp from '../../../../components/Button/Button';
import HeaderContent from '../../../../components/HeaderContent/HeaderContent';
import RN from '../../../../components/RN';
import SimpleBtn from '../../../../components/SimpleBtn/SimpleBtn';
import TextView from '../../../../components/Text/Text';
import { windowHeight } from '../../../../utils/styles';
import { useNavigation } from '@react-navigation/native';
import LinearContainer from '../../../../components/LinearContainer/LinearContainer';
import Cancel from '../../../../components/Cancel/Cancel';

type Props = {};

const OrderThanks: React.FC<Props> = ({ }) => {
  const navigation = useNavigation();
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={
              <RN.TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}>
                <Images.Svg.arrowLeft />
                <TextView text="Back" />
              </RN.TouchableOpacity>
            }
            rightItem={<Cancel onClose={() => navigation.goBack()}/>}
            />
          {/* <HeaderContent leftItem={<Images.Svg.btsGreyLogo /> */}
          <RN.View style={styles.content}>
            <TextView title="Thank You" />
            <TextView text="Your order has been sent. We will contact you shortly to clarify the details." />
            <SimpleBtn title={'Ok'} width={150} onPress={() => navigation.goBack()}/>
          </RN.View>
        </RN.View>
      } />
  );
};

export default OrderThanks;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingHorizontal: 10,
    height: windowHeight - windowHeight / 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
