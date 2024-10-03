import { useNavigation } from '@react-navigation/native';
import useRootStore from '../../../hooks/useRootStore';
import React, { useRef, useState } from 'react';
import { windowHeight } from '../../../utils/styles';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import { Images } from '../../../assets';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Cancel from '../../../components/Cancel/Cancel';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import { COLORS } from '../../../utils/colors';
import ButtonComp from '../../../components/Button/Button';
import GiveImage from '../../../components/GiveImage/GiveImage';
import { ActivityIndicator } from 'react-native';
import { APP_ROUTES } from '../../../navigation/routes';
const [accept, setAccept] = useState(false);


import {t} from '../../../i18n'

const SendIdea = () => {
    const navigation = useNavigation();

    const { onSubmitEmail, sendEmailLoading } = useRootStore().timeBiotic;
    const { setOrderState, orderState } = useRootStore().marketStore;
    const { onHandleWebVIew } = useRootStore().marketStore;

    const onSendEmail = () => {
          onSubmitEmail(orderState, orderState.type, () =>
            navigation.navigate(APP_ROUTES.THANKS as never),
          );
      };

      const AcceptPrivacy = () => {
        setOrderState('isAccept', !accept);
        setAccept(e => !e);
      }

      const onHandleCategory = () => {
        navigation.navigate(APP_ROUTES.MARKET_WEB_VIEW as never);
        onHandleWebVIew(`${t("privacy_link")}`);
      };

    return (
        <LinearContainer
            children={
                <RN.ScrollView showsVerticalScrollIndicator={false}>
                    <RN.View style={styles.container}>
                        <Images.Svg.bg style={styles.bg} />
                        <HeaderContent
                            leftItem={<Images.Svg.btsRightLinear />}
                            rightItem={<Cancel onClose={() => navigation.goBack()} />}
                            title={`${t("Your idea")}`}
                        />
                        <RN.Text style={styles.text}>
                        `${t("Idea_text")}`
                        </RN.Text>
                        <RN.View style={styles.privacyBox}>
                <RadioBtn active={accept} onPress={AcceptPrivacy} />
                <RN.View style={styles.privacyText}>
                  <RN.Text style={styles.privacyInfo}>
                  `${t('your_data_safe')}`
                  </RN.Text>
                  <RN.Pressable onPress={onHandleCategory}>
      <RN.Text style={styles.privacyLink}>`${t('I_accept')}`</RN.Text>
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
            }
        />
    );
};

export default SendIdea;

const styles = RN.StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        height: windowHeight,
        paddingHorizontal: 10,
    },
    bg: {
        left: 1,
        height: '100%',
        position: 'absolute',
    },
    text: {
        fontSize: 14,
        lineHeight: 18,
        color: '#D9D9D9',
        fontWeight: '400',
        textAlign: 'center',
    },
    btn: {
        bottom: '5%',
        position: 'absolute',
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

});
