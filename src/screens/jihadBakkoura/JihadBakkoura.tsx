import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListFooter from '../../components/ListFooter/ListFooter';
import LottieContent from '../../components/LottieContent/LottieContent';
import RN from '../../components/RN';
import { TimeClinicList } from '../../constants/timeClinic';
import { APP_ROUTES } from '../../navigation/routes';
import { windowHeight } from '../../utils/styles';
import TimeClinicListItem from '../timeClinic/components/TimeClinicListItem';
import { AboutList } from '../../constants/aboutCompany';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

import {t} from '../../i18n'
import l from '../../i18n'

const JihadBakkoura = () => {
  const navigation = useNavigation();

  const renderItem = useCallback(
    ({ item }) => {
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
           leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("About Company")}`}
          />
          <RN.View style={styles.content}>
            <RN.FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatlist}
              data={AboutList}
              renderItem={({ item }) => renderItem({ item })}
              ListFooterComponent={<ListFooter />}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(JihadBakkoura);

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
