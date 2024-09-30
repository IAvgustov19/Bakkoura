import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Images } from '../../assets';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import useRootStore from '../../hooks/useRootStore';
import TextView from '../../components/Text/Text';
import { COLORS } from '../../utils/colors';
import { observer } from 'mobx-react-lite';
import RN from '../../components/RN';
import { ActivityIndicator } from 'react-native';
import { windowWidth } from '../../utils/styles';

import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

import {t} from '../../i18n'

const LanguageScreen = () => {
  const navigation = useNavigation();

  const {
    languages,
    onLanguageItemPress: onLanguageItemPressStore,
    updateLoading,
    updateProfile,
    personalAreaData,
    setLanguage,
  } = useRootStore().personalAreaStore;
  const { newUser } = useRootStore().authStore;

  const saveLanguagePreference = async (language) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
    } catch (error) {
      console.error('Failed to save language', error);
    }
  };

  const loadLanguagePreference = async () => {
    try {
      const language = await AsyncStorage.getItem('selectedLanguage');
      if (language) {
        I18n.locale = language;
        setLanguage(language);
      }
    } catch (error) {
      console.error('Failed to load language', error);
    }
  };

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const update = () => {
    updateProfile(() => navigation.goBack());
  };

  const onLanguageItemPress = async (index) => {
    const selectedLanguage = languages[index].key;
    I18n.locale = selectedLanguage;
    setLanguage(selectedLanguage);
    await saveLanguagePreference(selectedLanguage);
    onLanguageItemPressStore(index);
  };

  const renderItem = ({ item, index }) => {
    return (
      <RN.TouchableOpacity
        style={styles.languagesBox}
        onPress={() => onLanguageItemPress(index)}>
        <RadioBtn
          active={
            personalAreaData?.language
              ? personalAreaData?.language === item.key
              : newUser.language === item.key
          }
          onPress={() => onLanguageItemPress(index)}
        />
        <RN.Text style={styles.language}>{item.title}</RN.Text>
      </RN.TouchableOpacity>
    );
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={
              <RN.TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}>
                 <ArrowLeftBack onPress={() => navigation.goBack()} />
              </RN.TouchableOpacity>
            }
            title={`${t("lang")}`}
          />
          <RN.FlatList
            data={languages}
            renderItem={renderItem}
            style={styles.languages}
            keyExtractor={(item, index) => index.toString()}
          />
          <RN.View style={styles.addBtn}>
            <StartBtn
              onPress={update}
              primary={true}
              text={updateLoading ? '' : `${t("Ok")}`}
              icon={
                updateLoading ? (
                  <ActivityIndicator
                    color={COLORS.black}
                    style={{ marginTop: 3 }}
                  />
                ) : null
              }
              subWidth={70}
              elWidth={55}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(LanguageScreen);

const styles = RN.StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 15,
    position: 'relative',
  },
  bg: {
    position: 'absolute',
  },
  bgContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  // bg: {
  //   position: 'absolute',
  // },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  languages: {
    paddingHorizontal: 10,
  },
  languagesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  language: {
    color: COLORS.white,
    fontSize: 16,
  },
  addBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    width: windowWidth - 15,
  },
});
