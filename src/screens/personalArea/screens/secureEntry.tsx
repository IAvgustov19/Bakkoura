import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Images } from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import ListItemCont from '../../../components/ListItemCont/ListItemCont';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import { observer } from 'mobx-react-lite';
import useRootStore from '../../../hooks/useRootStore';
import { COLORS } from '../../../utils/colors';
import { ActivityIndicator, Alert, Linking, Platform } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { APP_ROUTES } from '../../../navigation/routes';
import { RootStackParamList } from '../../../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

import {t} from '../../../i18n'
import l from '../../../i18n'
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';

type NavigationProp = StackNavigationProp<RootStackParamList, APP_ROUTES.PASSWORD>;
import Line from '../../../components/Line/Line';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecureEntry = () => {
  const navigation = useNavigation<NavigationProp>();


  const {
    onSecureEntryItemPress,
    updateProfile,
    secureEntries,
    updateLoading,
    personalAreaData,
    themeState,
  } = useRootStore().personalAreaStore;

  const [localSecureEntries, setLocalSecureEntries] = useState(secureEntries);

  useEffect(() => {
    setLocalSecureEntries(secureEntries);
  }, [secureEntries]);

  const updateSecure = async () => {
    try {

      const selected = localSecureEntries.find(entry => entry.active);

      const isBiometricSelected = selected && selected.title === 'Biometry';

      const biometryOptions = await FingerprintScanner.isSensorAvailable()
        .then(() => true)
        .catch(() => false);


      if (!biometryOptions && isBiometricSelected) {
        Alert.alert(
          `${t("Biometry not set up")}`,
          `${t("You have not set up any biometric data. Please add your fingerprint in settings")}`,
          [
            {
              text: `${t("Go to Settings")}`,
              onPress: () => {
                if (Platform.OS === 'android') {
                  Linking.openSettings();
                } else {
                  Alert.alert(
                    `${t("Unsupported")}`,
                    `${t("This feature is only supported on Android")}`,
                  );
                }
              },
            },
            {
              text: `${t("Cancel")}`,
              style: 'cancel',
            },
          ],
        );
      } else {
        updateProfile(() => navigation.goBack());
      }
    } catch (error) {
      Alert.alert(`${t("Error")}`, `${t("Failed to check biometry")}`);
    }
  };

  const handleItemPress = async (index: number) => {
    const biometryOptions = await FingerprintScanner.isSensorAvailable()
      .then(() => true)
      .catch(() => false);
    if (index === 1 && !biometryOptions) {
      const newData = localSecureEntries.map((item, i) => ({
        ...item,
        active: i === index ? !item.active : false,
      }));
      setLocalSecureEntries(newData);
    } else {
      if (index == 0) {
        navigation.navigate(APP_ROUTES.PASSWORD as never);
      }
      onSecureEntryItemPress(index);
    }
  };


  const TranslateOption = (title) => {
    if(title == 'Password'){
      return l.locale == 'English' ? 'Password' : 'كلمة المرور'
    }
    else if(title == 'Biometry'){
      return l.locale == 'English' ? 'Biometry': 'القياس الحيوي'
    }
    else if(title == 'Free'){
      return l.locale == 'English' ? 'Free' : 'مجانًا'
    }
  }

  const renderItem = ({ item, index }) => {
    const isActive = localSecureEntries[index]?.active ?? false;
   // console.log('isActiveisActive', isActive);
   console.log(AsyncStorage.removeItem('secureEntry'))

    return (
      <RN.View
        style={[styles.eventsTypeList, {backgroundColor: themeState.mainBack}]}>
        <ListItemCont
          rightItem={
            <RadioBtn
              active={isActive}
              onPress={() => handleItemPress(index) as never}
            />
          }
          title={
            <RN.Text
              color={
                item.title === personalAreaData?.secureEntry
                  ? themeState.title
                  : '#7D7D7D'
              }>
              {TranslateOption(item.title)}
            </RN.Text>
          }
          onPress={() => handleItemPress(index)}
        />
      </RN.View>
    );
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
            title={`${t("Secure Entry")}`}
          />
          <RN.FlatList
            data={secureEntries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          <RN.View style={styles.addBtn}>
            <StartBtn
              onPress={updateSecure}
              primary={true}
              text={updateLoading ? '' : `${t("ok")}`}
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

export default observer(SecureEntry);

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
  bg: {
    position: 'absolute',
  },
  eventsTypeList: {
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  line: {
    backgroundColor: '#131F28',
    width: '100%',
    height: 1,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
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
});
