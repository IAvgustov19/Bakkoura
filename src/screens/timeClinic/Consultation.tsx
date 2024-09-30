import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
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

import {t} from '../../i18n'

type Props = {};

const Consultation: React.FC<Props> = ({}) => {
  const [accept, setAccept] = React.useState(false);
  const navigation = useNavigation();
  const {setOrderState, orderState} = useRootStore().marketStore;
  const {onSubmitEmail, sendEmailLoading} = useRootStore().timeBiotic;
  const {onHandleWebVIew} = useRootStore().marketStore;

  const AcceptPrivacy = () => {
    setOrderState('isAccept', !accept);
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

  const onHandleCategory = () => {
    navigation.navigate(APP_ROUTES.MARKET_WEB_VIEW as never);
    onHandleWebVIew(`${t("privacy_link")}`);
  };

  const onSendEmail = () => {
    onSubmitEmail(orderState, 'Consultation', () =>
      navigation.navigate(APP_ROUTES.CONTACT_THANKS as never),
    );
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={`${t("Consultation")}`}
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
          />
          <RN.ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <TextView
                text={
                  `${t("Consultation_text")}`
                }
              />
              <FormContainer bottomInputPress={Scroll} />
              <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} white />
                <RN.View style={styles.privacyText}>
                  <RN.Text style={styles.privacyInfo}>
                    {`${t("your_data_safe")}`}
                  </RN.Text>
                  <RN.Pressable onPress={onHandleCategory}>
                    <RN.Text style={styles.privacyLink}>{t("I_accept")}</RN.Text>
                  </RN.Pressable>
                </RN.View>
              </RN.View>
              <ButtonComp
                title={`${t("send")}`}
                icon={
                  sendEmailLoading ? (
                    <ActivityIndicator
                      color={COLORS.black}
                      style={{marginTop: 3}}
                    />
                  ) : (
                    <GiveImage source={Images.Img.eye} />
                  )
                }
                onPress={onSendEmail}
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
