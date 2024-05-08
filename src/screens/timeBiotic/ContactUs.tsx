import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import useRootStore from '../../hooks/useRootStore';
import { windowHeight } from '../../utils/styles';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Cancel from '../../components/Cancel/Cancel';
import TextView from '../../components/Text/Text';
import OutlineBtn from '../../components/OutlineBtn/OutlineBtn';
import FormContainer from '../market/components/FormContainer/FormContainer';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import SimpleBtn from '../../components/SimpleBtn/SimpleBtn';
import { APP_ROUTES } from '../../navigation/routes';
import { COLORS } from '../../utils/colors';


const ContactUs = () => {
  const navigation = useNavigation();


  const [accept, setAccept] = useState(false);
  const { setOrderState, deleteFile } = useRootStore().marketStore;

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

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <RN.View style={styles.bcContainer}>
            <Images.Svg.bg style={styles.bg} />
          </RN.View>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
            title="Contact Us"
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
                  text={`Select who you would like to contact `}
                />
                <OutlineBtn text='General Director' Width={'100%'} Height={45} borderColor={COLORS.f5} textColor={COLORS.lightGrey} />
                <OutlineBtn text='Developer' Width={'100%'} Height={45} borderColor={COLORS.f5} textColor={COLORS.lightGrey} />
                <OutlineBtn text='Technical Support' Width={'100%'} Height={45} borderColor={COLORS.f5} textColor={COLORS.lightGrey} />
                <TextView
                  style={styles.text}
                  text={`Send Your letter now and We will contact you shortly \n to clarify the details.`}
                />
              </RN.View>
              <FormContainer bottomInputPress={Scroll} />
              <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} white />
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
              <SimpleBtn title="Send" onPress={() => navigation.navigate(APP_ROUTES.CONTACT_THANKS as never)} />
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default ContactUs;

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight,
    paddingHorizontal: 10,
  },
  bcContainer: {
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
    paddingBottom: 110,
  },
  contactInfo: {
    gap: 20,
    marginVertical: 20,
  },
  privacyBox: {
    flexDirection: 'row',
    gap: 15,
    paddingTop: 20,
    paddingBottom: 35
  },
  privacyText: {
    gap: 5,
  },
  privacyInfo: {
    color: COLORS.white,
  },
  privacyLink: {
    color: COLORS.blue,
  },

});
