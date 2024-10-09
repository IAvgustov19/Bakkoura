import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import Input from '../../../components/Input/Input';
import {windowHeight} from '../../../utils/styles';
import TextView from '../../../components/Text/Text';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../../hooks/useRootStore';
import {ActivityIndicator} from 'react-native';
import {COLORS} from '../../../utils/colors';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';

import {t} from '../../../i18n'

const PersonalDetails = () => {
  const navigation = useNavigation();

  const {
    personalAreaData,
    setPersonalAreaState,
    updateProfile,
    updateLoading,
    themeState,
  } = useRootStore().personalAreaStore;

  const updateName = () => {
    updateProfile(() => navigation.goBack());
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          {/* <RN.View style={styles.bgContainer}>
            <Images.Svg.bg style={styles.bg} />
          </RN.View> */}
          <HeaderContent
            leftItem={
              <RN.TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}>
                <ArrowLeftBack onPress={() => navigation.goBack()} />
              </RN.TouchableOpacity>
            }
            title={`${t("name")}`}
          />
          <RN.ScrollView>
            <RN.View style={styles.content}>
              <RN.View style={styles.inputBox}>
                <Input
                  placeholder={`${t("name")}`}
                  value={personalAreaData ? personalAreaData?.name : 'User'}
                  onChangeText={text => setPersonalAreaState('name', text)}
                  icon={<themeState.delete />}
                  iconPress={() => setPersonalAreaState('name', ' ' as never)}
                />
              </RN.View>
              <RN.View style={styles.addBtn}>
                <StartBtn
                  primary={true}
                  text={updateLoading ? '' : `${t("ok")}`}
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
                  onPress={updateName}
                />
              </RN.View>
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(PersonalDetails);

const styles = RN.StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 10,
  },
  bgContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  scrollView: {},
  content: {
    paddingTop: 25,
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 6,
  },
  addBtn: {
    bottom: 20,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inputBox: {
    paddingHorizontal: 5,
  },
  deleteBox: {
    position: 'absolute',
    right: '7%',
    top: '30%',
  },
  bg: {
    position: 'absolute',
  },
});
