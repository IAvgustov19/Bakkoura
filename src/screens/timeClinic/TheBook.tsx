import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {TheBookTexts} from '../../constants/timeClinic';
import {windowHeight} from '../../utils/styles';
import TheBookitem from './components/TheBookItem';
import {TheBookTexts_ar} from '../../constants/timeClinic_ar'
import l from '../../i18n'
import {t} from '../../i18n'
import {observer} from 'mobx-react-lite';

const TheBook = () => {
  const navigation = useNavigation();

  const renderBooks = useCallback(() => {
    return TheBookTexts.map((item, index) => {
      return (
        <TheBookitem
          key={index}
          title={item.title}
          texts={item.texts}
          page={item.id}
        />
      );
    });
  }, [ TheBookTexts ]);

  const renderBooks_ar = useCallback(() => {
    return TheBookTexts_ar.map((item, index) => {
      return (
        <TheBookitem
          key={index}
          title={item.title}
          texts={item.texts}
          page={item.id}
        />
      );
    });
  }, [ TheBookTexts_ar ]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("Book")}`}
          />
          
            {
              l.locale === 'English'?
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>{renderBooks()}</RN.View>
          </RN.ScrollView> 
          :
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>{renderBooks_ar()}</RN.View>
          </RN.ScrollView> 
            }
      
        </RN.View>
      }
    />
  );
};

export default observer(TheBook);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingBottom: 100,
  },
});
