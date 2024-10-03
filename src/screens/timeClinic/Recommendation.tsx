import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {
  Concept30hTexts,
  RecommendationsData,
  TimeWealthData,
} from '../../constants/timeClinic';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight, windowWidth} from '../../utils/styles';
import ConceptItem from './components/ConceptItem';
import TimeWealthCard from './components/TimeWealthCard';
import TimeWebView from './components/TimeWebView';

const Recommendation = () => {
  const navigation = useNavigation();
  const {onHandleWebVIew} = useRootStore().marketStore;
  const {setRecommendation} = useRootStore().timeClinicStore;

  const onHandleCategory = () => {
    navigation.navigate(APP_ROUTES.MARKET_WEB_VIEW as never);
    onHandleWebVIew('https://jihadbakkoura.com/');
  };

  const GetReco = (id: number) => {
    setRecommendation(id);
    navigation.navigate(APP_ROUTES.RECOMMENDATION_View as never);
  };

  const renderCards = useCallback(() => {
    return RecommendationsData.map((item, index) => {
      return (
        <TimeWealthCard
          key={index}
          title={item.title}
          texts={item.texts}
          imageUrl={item.imageUrl}
          date={item.date}
          onPress={() => GetReco(item.id)}
        />
      );
    });
  }, [RecommendationsData]);

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
              <RN.View style={styles.cardBox}>{renderCards()}</RN.View>
              {/* <TimeWebView
                linkName="jihadbakkoura.com"
                logo={<Images.Svg.jihadBakkouraSiteLogo />}
                onHandleCategory={onHandleCategory}
              /> */}
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default Recommendation;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingBottom: windowHeight / 4,
    gap: 30,
  },
  cardBox: {
    paddingVertical: 10,
    gap: 30,
  },
});
