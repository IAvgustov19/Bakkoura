import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {Concept30hTexts, FrancVillaTexts} from '../../constants/timeClicic';
import {COLORS} from '../../utils/colors';
import {windowHeight, windowWidth} from '../../utils/styles';
import ConceptItem from './components/ConceptItem';

const FrancVila = () => {
  const navigation = useNavigation();

  const renderTexts = useCallback(() => {
    return (
      <ConceptItem
        title={FrancVillaTexts.title}
        texts={FrancVillaTexts.texts}
      />
    );
  }, [FrancVillaTexts]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Franc Vila"
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.francLogoBox}>
                <Images.Svg.francVila />
              </RN.View>
              <RN.View>{renderTexts()}</RN.View>
              <RN.Text style={styles.date}>07:08.2023 - Jihad Bakkoura</RN.Text>
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default FrancVila;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingBottom: windowHeight / 8,
    gap: 15,
  },
  francLogoBox: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  date: {
    color: COLORS.grey,
    fontSize: 12,
  },
});
