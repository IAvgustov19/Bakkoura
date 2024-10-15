import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import useRootStore from '../../hooks/useRootStore';
import {windowHeight} from '../../utils/styles';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Cancel from '../../components/Cancel/Cancel';
import TextView from '../../components/Text/Text';
import OutlineBtn from '../../components/OutlineBtn/OutlineBtn';
import FormContainer from '../market/components/FormContainer/FormContainer';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import {COLORS} from '../../utils/colors';
import ButtonComp from '../../components/Button/Button';
import GiveImage from '../../components/GiveImage/GiveImage';
import {observer} from 'mobx-react-lite';
import {ActivityIndicator, Alert} from 'react-native';
import {APP_ROUTES} from '../../navigation/routes';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

import {t} from '../../i18n'

const ContactUs = () => {
  const navigation = useNavigation();
  const {themeState} = useRootStore().personalAreaStore;
  const [accept, setAccept] = useState(false);
  const {setOrderState, orderState} = useRootStore().marketStore;
  const {onSubmitEmail, sendEmailLoading} = useRootStore().timeBiotic;
  const {onHandleWebVIew} = useRootStore().marketStore;

  const AcceptPrivacy = () => {
    setOrderState('isAccept', !accept);
    setAccept(e => !e);
  };

  const scrollViewRef = useRef(null);

  const onHandleCategory = () => {
    navigation.navigate(APP_ROUTES.MARKET_WEB_VIEW as never);
    onHandleWebVIew(`${t("privacy_link")}`);
  };

  const Scroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: windowHeight - windowHeight / 4,
        animated: true,
      });
    }
  };

  const onSendEmail = () => {
    if (orderState.type) {
      onSubmitEmail(orderState, orderState.type, () =>
        navigation.navigate(APP_ROUTES.CONTACT_THANKS as never),
      );
    } else {
      Alert.alert(`${t("Please select who you would like to contact")}`);
    }
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          {/* <RN.View style={styles.bgContainer}>
            <Images.Svg.bg style={styles.bg} />
          </RN.View> */}
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("Contact Us")}`}
          />
          <RN.ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.contactInfo}>
                <TextView
                  style={styles.headerText}
                  text={`${t("Select who you would like to contact")}`}
                  color={themeState.darkGrayText}
                />
                <OutlineBtn
                  text={`${t("General Director")}`}
                  Width={'100%'}
                  Height={56}
                  borderColor={
                    orderState.type === 'General Director'
                      ? COLORS.yellow
                      : '#496380'
                  }
                  textColor={orderState.type === 'General Director'
                    ? COLORS.yellow
                    : '#496380'}
                  customStyle={styles.br40}
                  onPress={() => setOrderState('type', 'General Director')}
                />
                <OutlineBtn
                  text={`${t("Developer")}`}
                  Width={'100%'}
                  Height={56}
                  borderColor={
                    orderState.type === 'Developer' ? COLORS.yellow : '#496380'
                  }
                  textColor={orderState.type === 'Developer' ? COLORS.yellow : '#496380'}
                  customStyle={styles.br40}
                  onPress={() => setOrderState('type', 'Developer')}
                />
                <OutlineBtn
                  text={`${t("Technical Support")}`}
                  Width={'100%'}
                  Height={56}
                  borderColor={
                    orderState.type === 'Technical Support'
                      ? COLORS.yellow
                      : '#496380'
                  }
                  textColor={orderState.type === 'Technical Support'
                    ? COLORS.yellow
                    : '#496380'}
                  customStyle={styles.br40}
                  onPress={() => setOrderState('type', 'Technical Support')}
                  paddingVertical={15}
                />
                <TextView
                  style={styles.text}
                  color={themeState.darkGrayText}
                  text={`${t("Contact_text")}`}
                /> 
              </RN.View>
              <FormContainer bottomInputPress={Scroll} black />
              <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} />
                <RN.View style={styles.privacyText}>
                <RN.Text
                    style={[
                      styles.privacyInfo,
                      {color: themeState.darkGrayText},
                    ]}>
                  {t('your_data_safe')}
                  </RN.Text>
                  <RN.Pressable onPress={onHandleCategory}>
                  <RN.Text
                      style={[styles.privacyLink, {color: themeState.yellow}]}>{t('I_accept')}</RN.Text>
    </RN.Pressable>
                </RN.View>
              </RN.View>
              <ButtonComp
               title={`${t('send')}`}
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

export default observer(ContactUs);

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight,
    paddingHorizontal: 10,
  },
  bgContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  bg: {
    zIndex: 1,
    height: '100%',
    position: 'absolute',
  },
  headerText: {
    fontSize: 12,
    color: COLORS.a,
  },
  text: {
    fontSize: 12,
    paddingTop: 20,
    color: COLORS.lightGrey,
  },
  btn: {
    bottom: '5%',
    position: 'absolute',
  },
  scrollView: {
    zIndex: 2,
  },
  content: {
    paddingBottom: 50,
  },
  contactInfo: {
    gap: 20,
    marginVertical: 20,
  },
  privacyBox: {
    flexDirection: 'row',
    gap: 15,
    paddingTop: 20,
    paddingBottom: 35,
  },
  privacyText: {
    gap: 5,
  },
  privacyInfo: {
    color: COLORS.white,
  },
  privacyLink: {
    color: '#ECC271',
  },
  br40: {
    borderRadius: 40,
    backgroundColor: '#272F35',
  },
});
