import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {JihadBakkouraTexts} from '../../constants/timeClicic';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {windowHeight} from '../../utils/styles';
import ConceptItem from './components/ConceptItem';

const JihadBakkouraTimeClinic = () => {
  const navigation = useNavigation();
  const {onHandleWebVIew} = useRootStore().marketStore;

  const onHandleCategory = () => {
    navigation.navigate(APP_ROUTES.MARKET_WEB_VIEW as never);
    onHandleWebVIew('https://jihadbakkoura.com/');
  };

  const renderText = useCallback(() => {
    return JihadBakkouraTexts.map((item, index) => {
      return <ConceptItem key={index} title={item.title} texts={item.texts} />;
    });
  }, [JihadBakkouraTexts]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Jihad Bakkoura"
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.avatarBox}>
                <RN.Image
                  style={styles.avatar}
                  source={Images.Img.jihadBakkouraAvatar}
                />
                <RN.View style={styles.textLogo}>
                  <Images.Svg.jihadBakkouraLogoTitle />
                </RN.View>
              </RN.View>
              <RN.View style={styles.textsBox}>{renderText()}</RN.View>
              <RN.Pressable
                style={styles.siteLinkBox}
                onPress={onHandleCategory}>
                <RN.Text style={styles.siteLink}>jihadbakkoura.com</RN.Text>
                <Images.Svg.jihadBakkouraSiteLogo />
              </RN.Pressable>
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default JihadBakkouraTimeClinic;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    paddingBottom: windowHeight / 8,
  },
  avatarBox: {
    width: '100%',
    height: windowHeight - windowHeight / 2.4,
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    zIndex: 1,
  },
  textLogo: {
    position: 'absolute',
    zIndex: 2,
    right: 20,
    bottom: '20%',
  },
  textsBox: {
    top: -50,
  },
  siteLinkBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  siteLink: {
    color: '#DFC188',
    fontSize: 18,
    textDecorationColor: '#DFC188',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
