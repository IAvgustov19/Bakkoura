import React, {useRef, useState} from 'react';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import FormContainer from '../market/components/FormContainer/FormContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {APP_ROUTES} from '../../navigation/routes';
import useRootStore from '../../hooks/useRootStore';
import Cancel from '../../components/Cancel/Cancel';
import {windowHeight} from '../../utils/styles';
import TextView from '../../components/Text/Text';
import {COLORS} from '../../utils/colors';
import RN from '../../components/RN';
import {Images} from '../../assets';
import {ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react-lite';
import SimpleBtn from '../../components/SimpleBtn/SimpleBtn';
import CustomSelect from './components/CustomSelect';
import {Countries} from '../../utils/languages';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

import ButtonComp from '../../components/Button/Button';

import {t} from '../../i18n'
import Button from '../../components/Button/Button';
import GiveImage from '../../components/GiveImage/GiveImage';

const WatchValuation = () => {
  const navigation = useNavigation();
  const {themeState} = useRootStore().personalAreaStore;
  const [accept, setAccept] = useState(false);
  const {setOrderState, orderState} = useRootStore().marketStore;
  const {sendEmailLoading, onSubmitEmail} = useRootStore().timeBiotic;
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
    onSubmitEmail(orderState, 'Assestment Watch', () =>
      navigation.navigate(APP_ROUTES.CONTACT_THANKS as never),
    );
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          {/* <Images.Svg.bg style={styles.bg} /> */}
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title= {`${t("Assestment Watch")}`}
          />
          <RN.ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View>
              <RN.View style={styles.valuationInfo}>
                <TextView
                  style={styles.title}
                  title= {`${t("AssestmentWatch_top_title_text")}`}
                />
                <TextView
                  style={styles.text}
                  color={themeState.darkGrayText}
                  text= {`${t("AssestmentWatch_top_text")}`}
                />
              </RN.View>
              <FormContainer
                bottomInputPress={Scroll}
                uploadAtTop
                black
                withSelect
                options={Countries}
                onSelect={(e: any) => setOrderState('country', e.value)}
              />
              {/* <CustomSelect
                options={Countries}
                onSelect={(e: any) => setOrderState('country', e.value)}
                black={true}
              /> */}
              <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} />
                <RN.View style={styles.privacyText}>
                <RN.Text
                    style={[
                      styles.privacyInfo,
                      {
                        color: themeState.darkGrayText,
                      },
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
              <TextView
                style={[styles.text, styles.pv39]}
                color={themeState.darkGrayText}
                text= {`${t("AssestmentWatch_bottom_text")}`}
              />
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(WatchValuation);

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 10,
    height: WINDOW_HEIGHT,
  },
  bg: {
    zIndex: 1,
    height: '100%',
    position: 'absolute',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: COLORS.lightGrey,
  },
  pv39: {
    paddingTop: 39,
    paddingBottom:0,
  },
  scrollView: {
    zIndex: 2,
  },
  valuationInfo: {
    gap: 20,
    marginVertical: 20,
  },
  privacyBox: {
    gap: 15,
    paddingTop: 20,
    paddingBottom: 35,
    flexDirection: 'row',
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
