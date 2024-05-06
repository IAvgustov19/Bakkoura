import React, { useRef, useState } from 'react';
import RN from '../../../components/RN';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import { Images } from '../../../assets';
import Cancel from '../../../components/Cancel/Cancel';
import { useNavigation } from '@react-navigation/native';
import { windowHeight } from '../../../utils/styles';
import { APP_ROUTES } from '../../../navigation/routes';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import { COLORS } from '../../../utils/colors';
import useRootStore from '../../../hooks/useRootStore';
import TextView from '../../../components/Text/Text';
import SimpleBtn from '../../../components/SimpleBtn/SimpleBtn';
import FormContainer from '../../market/components/FormContainer/FormContainer';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

const WatchValuation = () => {
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
          <Images.Svg.bg style={styles.bg} />
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
            title="Watch Valuation"
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
                  title={'Send us an application or give us a call'}
                />
                <TextView
                  style={styles.text}
                  text={`The magic begins when you're ready.Within 15 days, we will review \n your application and decide if a Bakkoura expert is ready to dedicate \n time to develop your brand.The concept of a work of art made with \n soul can only be realized for those who have values, goals and \n methods that match ours \n Send us an application or give us a call`}
                />
              </RN.View>
              <FormContainer bottomInputPress={Scroll} uploadAtTop />
              <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} white/>
                <RN.View style={styles.privacyText}>
                  <RN.Text style={styles.privacyInfo}>
                    {`Your personal data are guaranteed to be safe \n and will not be handed over to third parties.`}
                  </RN.Text>
                  <RN.Text style={styles.privacyLink}>
                    I accept the privacy policy.
                  </RN.Text>
                </RN.View>
              </RN.View>
                <SimpleBtn title="Send" onPress={() => navigation.navigate(APP_ROUTES.CONTACT_THANKS as never)} />
              <TextView
                style={[styles.text, styles.pv39]}
                text={`But that's not all. To learn how to embody beautiful and strong \n souls in watches, we have spent years studying more than just \n watchmaking. Psychology, art history, biographies of great people,\n fine arts, philosophy - all this knowledge has taught us how to feel \n people and create brands.`}
              />
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default WatchValuation;

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 10,
    height: WINDOW_HEIGHT,
  },
  bg: {
    left: 1,
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
    paddingVertical: 39,
  },
  scrollView: {
    zIndex: 2,
  },
  valuationInfo: {
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
    color: COLORS.blue,
  },

});
