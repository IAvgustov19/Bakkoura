import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import RN from '../../../components/RN';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';
import TextView from '../../../components/Text/Text';
import ButtonComp from '../../../components/Button/Button';
import { APP_ROUTES } from '../../../navigation/routes';
import { windowHeight } from '../../../utils/styles';
import { Images } from '../../../assets';
import GiveImage from '../../../components/GiveImage/GiveImage';



const ContactThanks = (forIdea?: boolean) => {
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
            <TextView text={forIdea ? `for your idea, we will definitely study it and \n contact you soon!`: `Your Idea has been sent. We will contact you \n shortly to clarify the details.`} />
            <ButtonComp
              title="OK"
              width={'50%'}
              onPress={() => { }}
              icon={<GiveImage source={Images.Img.eye} />}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(ContactThanks);

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
