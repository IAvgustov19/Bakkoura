import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import ButtonComp from '../../components/Button/Button';
import GeneralModal from '../../components/GeneralModal/GeneralModal';
import GiveImage from '../../components/GiveImage/GiveImage';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {windowHeight} from '../../utils/styles';
import FormContainer from './components/FormContainer';
import Thanks from './Thanks';

type Props = {};

const Consultation: React.FC<Props> = ({}) => {
  const [accept, setAccept] = React.useState(false);
  const navigation = useNavigation();

  const AcceptPrivacy = () => {
    setAccept(e => !e);
  };

  const scrollViewRef = useRef(null);

  const Scroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: windowHeight - windowHeight / 4,
        animated: true,
      });
    }
  };

  const onHandleSend = () => {
    navigation.navigate(APP_ROUTES.CONSULTATION_THANKS as never);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Consultation"
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
          />
          <RN.ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <TextView
                text={
                  "BAKKOURA is the only atelier in the world that will translate you into a brand. Each person's story is unique, it cannot be repeated or falsified, we help you to write your own legend, because this brand is you yourself."
                }
              />
              <FormContainer bottomInputPress={Scroll} />
              <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} />
                <RN.View style={styles.privacyText}>
                  <RN.Text style={styles.privacyInfo}>
                    Your personal data are guaranteed to be safe and will not be
                    handed over to third parties.
                  </RN.Text>
                  <RN.Text style={styles.privacyLink}>
                    I accept the privacy policy.
                  </RN.Text>
                </RN.View>
              </RN.View>
              <ButtonComp
                title="Send"
                icon={<GiveImage source={Images.Img.eye} />}
                onPress={onHandleSend}
              />
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(Consultation);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    gap: 15,
    paddingBottom: 210,
  },
  privacyBox: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
    width: '100%',
    marginBottom: 20,
  },
  privacyText: {
    width: '80%',
    gap: 5,
  },
  privacyInfo: {
    color: COLORS.grey,
    writingDirection: 'ltr',
  },
  privacyLink: {
    color: COLORS.yellow,
  },
});
