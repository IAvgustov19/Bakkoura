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

const PersonStartScreen = () => {
  const navigation = useNavigation();
  const {
    personalAreaData,
    setPersonStartScreen,
    updateProfile,
    updateLoading,
    initialRouteName,
    onSetInitial,
  } = useRootStore().personalAreaStore;
  const onPress = (item: PersonalMenuType, index: number) => {
    setPersonStartScreen(item);
  };

  const renderItem = useCallback(
    ({item, index}: {item: PersonalMenuType; index: number}) => {
      return (
        <RN.View style={styles.eventsTypeList}>
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
          <RN.View style={styles.line}></RN.View>
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
            rightItem={
              <RN.TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => navigation.goBack()}>
                <RN.Text style={styles.cancelTxt}>Cancel</RN.Text>
              </RN.TouchableOpacity>
            }
            title="Menu"
          />
          <RN.View style={styles.content}>
            <RN.FlatList
              showsVerticalScrollIndicator={false}
              data={MenuItems}
              renderItem={renderItem}
              keyExtractor={item => item.key}
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
  bgContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
  },
  cancelBtn: {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  cancelTxt: {
    color: COLORS.grey,
    fontSize: 16,
  },
  scrollView: {},
  content: {
    paddingBottom: 110,
  },
  eventsTypeList: {
    borderRadius: 3,
    paddingHorizontal: 5,
    backgroundColor: '#0D0D0D',
  },
  line: {
    backgroundColor: '#131F28',
    width: '100%',
    height: 1,
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
