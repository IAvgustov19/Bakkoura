import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useState} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListFooter from '../../components/ListFooter/ListFooter';
import LottieContent from '../../components/LottieContent/LottieContent';
import RN from '../../components/RN';
import {TimeClinicList, TimeClinicListType} from '../../constants/timeClicic';
import {Lotties} from '../../lotties/lottie';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';
import TimeClinicListItem from './components/TimeClinicListItem';

const TimeClinic = () => {
  const navigation = useNavigation();

  const renderItem = useCallback(
    ({item}) => {
      return (
        <TimeClinicListItem
          title={item.title}
          text={item.info}
          isBtn={item.isbtn}
          onPressItem={() => navigation.navigate(item.navigate as never)}
          onPressBtn={() =>
            navigation.navigate(APP_ROUTES.CONSULTATION as never)
          }
        />
      );
    },
    [TimeClinicList],
  );

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Time Clinic"
          />
          <RN.View style={styles.content}>
            <RN.FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatlist}
              data={TimeClinicList}
              renderItem={({item}) => renderItem({item})}
              ListFooterComponent={<ListFooter />}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(TimeClinic);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    gap: 5,
    paddingBottom: 20,
  },
  flatlist: {
    height: windowHeight - windowHeight / 7,
  },
});
