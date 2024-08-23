import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {TheBookTexts} from '../../constants/timeClinic';
import {windowHeight} from '../../utils/styles';
import TheBookitem from './components/TheBookItem';
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
  }, [TheBookTexts]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Book"
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>{renderBooks()}</RN.View>
          </RN.ScrollView>
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
    paddingBottom: windowHeight / 8,
  },
});
