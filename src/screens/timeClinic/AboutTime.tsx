import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {AboutTimeData, TimeClinicList} from '../../constants/timeClinic';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';
import TimeClinicListItem from './components/TimeClinicListItem';

import {t} from '../../i18n'
import l from '../../i18n'

import { AboutTimeData_ar } from '../../constants/timeClinic_ar';

const AboutTime = () => {
  const navigation = useNavigation();
  const {setAboutTimeInfo} = useRootStore().timeClinicStore;

  const onHandleAboutTime = (id: number, navigate: string) => {
    setAboutTimeInfo(id);
    navigation.navigate(navigate as never);
  };

  const renderItem = useCallback(
    ({item}) => {
      return (
        <TimeClinicListItem
          title={item.title}
          onPressItem={() => onHandleAboutTime(item.id, item.navigate)}
        />
      );
    },
    [AboutTimeData],
  );

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t('About Time')}`}
          />
          {l.locale === 'English' 
          ? 
          <RN.View style={styles.content}>
          <RN.FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            data={AboutTimeData}
            renderItem={({item}) => renderItem({item})}
          />
        </RN.View>
          :
          <RN.View style={styles.content}>
            <RN.FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatlist}
              data={AboutTimeData_ar}
              renderItem={({item}) => renderItem({item})}
            />
          </RN.View>}
          
        </RN.View>
      }
    />
  );
};

export default observer(AboutTime);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    gap: 5,
    paddingBottom: 100,
  },
  flatlist: {},
});
