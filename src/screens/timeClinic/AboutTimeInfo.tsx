import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import {windowHeight} from '../../utils/styles';
import AboutTimeInfoItem from './components/AboutTImeInfoItem';

const AboutTimeInfo = () => {
  const navigation = useNavigation();
  const {aboutTimeInfo} = useRootStore().timeClinicStore;

  const renderInfo = useCallback(() => {
    return aboutTimeInfo.info?.map((item, index) => {
      return (
        <AboutTimeInfoItem key={index} text={item.text} author={item.author} />
      );
    });
  }, [aboutTimeInfo]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="About Time"
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>{renderInfo()}</RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(AboutTimeInfo);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingHorizontal: 5,
    gap: 30,
    paddingTop: 10,
    paddingBottom: 100,
  },
});
