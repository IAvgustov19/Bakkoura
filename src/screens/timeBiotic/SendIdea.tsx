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

const SendIdea = () => {
  const navigation = useNavigation();

  const [accept, setAccept] = useState(false);
  const {setOrderState, deleteFile, orderState} = useRootStore().marketStore;
  const {sendEmailLoading, onSubmitEmail} = useRootStore().timeBiotic;

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
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
            title="Your Idea"
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
                  text={`Your preferences are very important to us. We strive to satisfy your most sophisticated tastes. Just imagine, \n you have the opportunity to realize your idea in the  \n most exquisite form!`}
                />
              </RN.View>
              <FormContainer bottomInputPress={Scroll} uploadAtTop black />
              <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} white />
                <RN.View style={styles.privacyText}>
                  <RN.Text style={styles.privacyInfo}>
                    {`Your personal data are guaranteed to be safe \n and will not be handed over to third parties.`}
                  </RN.Text>
                  <RN.Text style={styles.privacyLink}>
                    I accept the privacy policy.
                  </RN.Text>
                </RN.View>
              </RN.View>
              <SimpleBtn
                title="Send"
                icon={
                  sendEmailLoading ? (
                    <ActivityIndicator
                      color={COLORS.black}
                      style={{marginTop: 3}}
                    />
                  ) : null
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
    paddingBottom: windowHeight / 5,
  },
  ideaInfo: {
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
