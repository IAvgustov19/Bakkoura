import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useRef, useState} from 'react';
import {Images} from '../../assets';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import RN from '../../components/RN';
import SimpleBtn from '../../components/SimpleBtn/SimpleBtn';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import {COLORS} from '../../utils/colors';
import {windowHeight} from '../../utils/styles';
import FormContainer from './components/FormContainer/FormContainer';
import {APP_ROUTES} from '../../navigation/routes';
import Thanks from './components/thanks/Thanks';
import {ActivityIndicator} from 'react-native';
import ButtonComp from '../../components/Button/Button';
import GiveImage from '../../components/GiveImage/GiveImage';

const OrderScreen = () => {
  const navigation = useNavigation();
  const [accept, setAccept] = useState(false);
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
    onHandleWebVIew('https://www.bakkoura.com/privacy-policy');
  };

  const onSendEmail = () => {
    onSubmitEmail(orderState, 'Order', () =>
      navigation.navigate(APP_ROUTES.ORDER_THANKS as never),
    );
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Order"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.orderInfo}>
                <TextView
                  text={
                    "We are probably the world's best wristwatch couturiers because, like you, we understand your desires.We are the first in the history of the world to dare to offer a truly unique and luxurious solution for those who want to create something very personal, but at the same time understandable and timeless.MAISON DE COUTURE"
                  }
                />
                <TextView
                  text={
                    "BAKKOURA is the only atelier in the world that will translate you into a brand. Each person's story is unique, it cannot be repeated or falsified, we help you to write your own legend, because this brand is you yourself."
                  }
                />
              </RN.View>
              <FormContainer bottomInputPress={Scroll} black />
              <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} />
                <RN.View style={styles.privacyText}>
                  <RN.Text style={styles.privacyInfo}>
                    Your personal data are guaranteed to be safe and will not be
                    handed over to third parties.
                  </RN.Text>
                  <RN.Pressable onPress={onHandleCategory}>
      <RN.Text style={styles.privacyLink}>I accept the privacy policy.</RN.Text>
    </RN.Pressable>
                </RN.View>
              </RN.View>
              <ButtonComp
                // width={150}
                title="Send"
                icon={
                  sendEmailLoading ? (
                    <ActivityIndicator
                      color={COLORS.black}
                      style={{marginTop: 6}}
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

export default observer(OrderScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  scrollView: {},
  content: {
    gap: 20,
    paddingBottom: 110,
  },
  orderInfo: {
    gap: 20,
    marginVertical: 20,
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
