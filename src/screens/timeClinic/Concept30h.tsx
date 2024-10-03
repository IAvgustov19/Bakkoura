import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {Concept30hTexts} from '../../constants/timeClinic';
import {Concept30hTexts_ar} from '../../constants/timeClinic_ar';
import {windowHeight, windowWidth} from '../../utils/styles';
import ConceptItem from './components/ConceptItem';

import {t} from '../../i18n'
import l from '../../i18n'

const Concept30h = () => {
  const navigation = useNavigation();

  const renderTexts = useCallback(() => {
    return Concept30hTexts.map((item, index) => {
      return <ConceptItem key={index} title={item.title} texts={item.texts} />;
    });
  }, [Concept30hTexts]);

  const renderTexts_ar = useCallback(() => {
    return Concept30hTexts.map((item, index) => {
      return <ConceptItem key={index} title={item.title} texts={item.texts} />;
    });
  }, [Concept30hTexts_ar]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("30H Concept")}`}
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.conceptImageBox}>
                <RN.Image
                  style={styles.conceptImage}
                  source={Images.Img.concept30h}
                />
              </RN.View>
              {
                l.locale ==='en'?
                <RN.View>{renderTexts()}</RN.View>
                :
                <RN.View>{renderTexts_ar()}</RN.View>
              }
              
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default Concept30h;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingBottom: windowHeight / 8,
    gap: 15,
  },
  conceptImageBox: {
    width: '100%',
    height: 220,
  },
  conceptImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});
