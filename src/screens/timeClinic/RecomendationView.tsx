import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {
  Concept30hTexts,
  RecommendationViewData,
} from '../../constants/timeClinic';
import {COLORS} from '../../utils/colors';
import {windowHeight, windowWidth} from '../../utils/styles';
import ConceptItem from './components/ConceptItem';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import {normalizeHeight} from '../../utils/dimensions';

const RecommendationView = () => {
  const navigation = useNavigation();
  const {recommendationData} = useRootStore().timeClinicStore;

  const renderTexts = useCallback(() => {
    return (
      <ConceptItem
        title={recommendationData.title}
        texts={recommendationData.texts}
      />
    );
  }, [recommendationData]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Recommendations"
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.francLogoBox}>
                <RN.Image
                  style={styles.image}
                  source={recommendationData.imageUrl}
                />
              </RN.View>
              <RN.View>{renderTexts()}</RN.View>
              {/* <RN.Text style={styles.date}>07.08.2023 - Jihad Bakkoura</RN.Text> */}
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(RecommendationView);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingBottom: windowHeight / 4,
    gap: 15,
  },
  francLogoBox: {
    alignItems: 'center',
    width: '100%',
    height: 250,
  },
  date: {
    color: COLORS.grey,
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
