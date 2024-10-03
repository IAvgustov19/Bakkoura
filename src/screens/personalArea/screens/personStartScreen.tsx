import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';

import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import ListItemCont from '../../../components/ListItemCont/ListItemCont';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import Checkbox from '../../../components/Checkbox/Checkbox';
import {windowHeight} from '../../../utils/styles';
import TextView from '../../../components/Text/Text';
import {MenuItems} from '../../../utils/menuItems';
import {COLORS} from '../../../utils/colors';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {observer} from 'mobx-react-lite';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';
import useRootStore from '../../../hooks/useRootStore';
import {PersonalMenuType} from '../../../types/personalArea';
import {ActivityIndicator} from 'react-native';
import ListFooter from '../../../components/ListFooter/ListFooter';
import Cancel from '../../../components/Cancel/Cancel';
import Line from '../../../components/Line/Line';

const PersonStartScreen = () => {
  const navigation = useNavigation();
  const {
    personalAreaData,
    setPersonStartScreen,
    updateProfile,
    updateLoading,
    initialRouteName,
    onSetInitial,
    themeState,
  } = useRootStore().personalAreaStore;
  const onPress = (item: PersonalMenuType, index: number) => {
    setPersonStartScreen(item);
  };

  const renderItem = useCallback(
    ({item, index}: {item: PersonalMenuType; index: number}) => {
      return (
        <RN.View
          style={[
            styles.eventsTypeList,
            {backgroundColor: themeState.mainBack},
          ]}>
          <ListItemCont
            title={item.title}
            onPress={() => onPress(item, index)}
            rightItem={
              <Checkbox
                active={
                  personalAreaData.initialRouteName
                    ? personalAreaData.initialRouteName === item.routeName
                    : initialRouteName.routeName === item.routeName
                }
                onPress={() => onPress(item, index)}
              />
            }
          />
          <Line />
        </RN.View>
      );
    },
    [initialRouteName, personalAreaData.initialRouteName],
  );

  const onUpdateProfile = () => {
    updateProfile(() => {
      onSetInitial();
      navigation.navigate(initialRouteName.routeName as never);
    });
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
            title="Menu"
          />
          <RN.View style={styles.content}>
            <RN.FlatList
              showsVerticalScrollIndicator={false}
              data={MenuItems}
              renderItem={renderItem}
              keyExtractor={item => item.key}
              ListFooterComponent={<ListFooter />}
            />
            <RN.View style={styles.addBtn}>
              <StartBtn
                primary={true}
                text={updateLoading ? '' : 'Ok'}
                icon={
                  updateLoading ? (
                    <ActivityIndicator
                      color={COLORS.black}
                      style={{marginTop: 3}}
                    />
                  ) : null
                }
                subWidth={70}
                elWidth={55}
                onPress={onUpdateProfile}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(PersonStartScreen);

const styles = RN.StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 15,
  },
  content: {
    paddingBottom: 110,
  },
  eventsTypeList: {
    borderRadius: 3,
    paddingHorizontal: 5,
    backgroundColor: '#0D0D0D',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  addBtn: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: windowHeight / 8,
  },
});
