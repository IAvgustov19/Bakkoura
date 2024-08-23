import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import ListItemCont from '../../../components/ListItemCont/ListItemCont';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../../hooks/useRootStore';
import {Themes, ThemeTypes} from '../../../utils/themes';
import Line from '../../../components/Line/Line';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';

const Theme = () => {
  const navigation = useNavigation();
  const {
    personalAreaData,
    setPersonalAreaState,
    updateProfile,
    themeState,
    currentTheme,
    setUpdateCurrentTheme,
  } = useRootStore().personalAreaStore;
  const onUpdateProfile = () => {
    updateProfile(() => {
      navigation.goBack();
    });
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <RN.View
          style={[
            styles.eventsTypeList,
            {backgroundColor: themeState.mainBack},
          ]}>
          <ListItemCont
            rightItem={
              <RadioBtn
                active={currentTheme == item}
                onPress={() => setUpdateCurrentTheme(item)}
              />
            }
            title={item}
            onPress={() => setUpdateCurrentTheme(item)}
          />
          <Line />
        </RN.View>
      );
    },
    [personalAreaData.theme, currentTheme],
  );

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Theme"
          />
          <RN.FlatList
            data={ThemeTypes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          <RN.View style={styles.addBtn}>
            <StartBtn
              primary={true}
              text={'Ok'}
              subWidth={70}
              elWidth={55}
              onPress={onUpdateProfile}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(Theme);

const styles = RN.StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 10,
  },
  eventsTypeList: {
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  addBtn: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
    width: '100%',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
