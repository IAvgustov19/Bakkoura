import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import ButtonComp from '../../components/Button/Button';
import GiveImage from '../../components/GiveImage/GiveImage';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';
import {TimeManagementTexts} from '../../constants/timeClinic';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';

const TimeManagement = () => {
  const navigation = useNavigation();
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="TIme Management"
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.textInfo}>
              <TextView style={styles.title} title="Consultation" />
              <TextView text={TimeManagementTexts.first} />
              <TextView text={TimeManagementTexts.second} />
              <TextView
                text={TimeManagementTexts.third}
                style={styles.thirdText}
              />
              <TextView text={TimeManagementTexts.fourth} />
              <TextView text={TimeManagementTexts.fifth} />
            </RN.View>
            <ButtonComp
              title="Sign up for a consultation"
              onPress={() =>
                navigation.navigate(APP_ROUTES.CONSULTATION as never)
              }
              icon={<GiveImage source={Images.Img.eye} />}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(TimeManagement);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 5,
  },
  textInfo: {
    gap: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  thirdText: {
    fontWeight: '800',
  },
});
