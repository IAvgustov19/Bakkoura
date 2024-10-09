import React, {useRef, useState} from 'react';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import useRootStore from '../../hooks/useRootStore';
import {windowHeight} from '../../utils/styles';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Cancel from '../../components/Cancel/Cancel';
import TextView from '../../components/Text/Text';
import FormContainer from '../market/components/FormContainer/FormContainer';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import SimpleBtn from '../../components/SimpleBtn/SimpleBtn';
import {COLORS} from '../../utils/colors';
import {APP_ROUTES} from '../../navigation/routes';
import ButtonComp from '../../components/Button/Button';
import GiveImage from '../../components/GiveImage/GiveImage';
import {ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react-lite';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

import {t} from '../../i18n'

const SendIdea = () => {
  const navigation = useNavigation();
  const {onHandleWebVIew} = useRootStore().marketStore;
  const {themeState} = useRootStore().personalAreaStore;
  const [accept, setAccept] = useState(false);
  const {setOrderState, deleteFile, orderState} = useRootStore().marketStore;
  const {sendEmailLoading, onSubmitEmail} = useRootStore().timeBiotic;

  const AcceptPrivacy = () => {
    setOrderState('isAccept', !accept);
    setAccept(e => !e);
  };

  const onHandleCategory = () => {
    navigation.navigate(APP_ROUTES.MARKET_WEB_VIEW as never);
    onHandleWebVIew(`${t("privacy_link")}`);
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

  const onSendEmail = () => {
    onSubmitEmail(orderState, 'Send Idea', () =>
      navigation.navigate(APP_ROUTES.CONTACT_THANKS as never),
    );
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
            title={`${t("Your idea")}`}
          />
          <RN.ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.ideaInfo}>
                <TextView
                  style={styles.text}
                  color={themeState.darkGrayText}
                  text= {`${t("Idea_text")}`}
                  />
              </RN.View>
              <FormContainer bottomInputPress={Scroll} uploadAtTop black />
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
                      style={{ marginTop: 3 }}
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

export default observer(SendIdea);

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    height: WINDOW_HEIGHT,
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
  text: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.lightGrey,
  },
  scrollView: {
    zIndex: 2,
  },
  content: {
    gap: 20,
    paddingBottom: 20,
  },
  ideaInfo: {
    gap: 20,
    marginTop: 20,
  },
  privacyBox: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
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
});
