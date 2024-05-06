import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import ButtonComp from '../../components/Button/Button';
import GiveImage from '../../components/GiveImage/GiveImage';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';

const ConsultationThanks = () => {
  const navigation = useNavigation();
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <TextView title="Thank You" />
            <TextView text="Your consultation request has been sent. We will contact you shortly!" />
            <ButtonComp
              title={'Ok'}
              width={150}
              icon={<GiveImage source={Images.Img.eye} />}
              onPress={() =>
                navigation.navigate(APP_ROUTES.TIME_CLINIC as never)
              }
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default ConsultationThanks;

const styles = RN.StyleSheet.create({
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
