import {observer} from 'mobx-react-lite';
import React, {useCallback, useRef, useState} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import OutlineBtn from '../../components/OutlineBtn/OutlineBtn';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import {windowHeight, windowWidth} from '../../utils/styles';
import {
  ConstructorParts,
  WatchConstrctorData,
} from '../../utils/watchConstructor';
import Constructor from './components/Constructor';
import ViewShot from 'react-native-view-shot';
import {COLORS} from '../../utils/colors';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';

import {t} from '../../i18n'
import Line from '../../components/Line/Line';
import Button from '../../components/Button/Button';

const WatchConstructor = () => {
  const {currentPart, setPart, setCurrentWatch} =
    useRootStore().watchConstructor;
  const {setOrderState} = useRootStore().marketStore;
  const {themeState} = useRootStore().personalAreaStore;
  const viewShotRef = useRef(null);
  const navigation = useNavigation();
  const [ideaLoading, setIdeaLoading] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: `${t("Storage Permission Required")}`,
            message:
            `${t("Access is required to send photos and videos")}`,
            buttonNeutral: `${t("Ask Me Later")}`,
            buttonNegative: `${t("Cancel")}`,
            buttonPositive: `${t("Ok")}`,
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const captureAndSaveScreenshot = async (type?: string) => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        `${t("Permission Denied")}`,
        `${t("You need to give storage permission to save the screenshot")}`,
      );
      return;
    }
    if (type === 'save') {
      viewShotRef.current.capture().then(async uri => {
        const destPath = `${
          RNFS.CachesDirectoryPath
        }/screenshot_${Date.now()}.png`;

        await RNFS.moveFile(uri, destPath);

        CameraRoll.save(destPath, {type: 'photo'})
          .then(() => {
            Alert.alert(
              `${t("Screenshot successfully Saved")}`,
              `${t("Screenshot has been saved to your gallery")}`,
            );
          })
          .catch(error => {
            console.error(error);
            Alert.alert(`${t("Error")}`, `${t("Failed to save screenshot to gallery")}`);
          });
      });
    } else {
      setIdeaLoading(true);
      viewShotRef.current
        .capture()
        .then(async uri => {
          const destPath = `${
            RNFS.CachesDirectoryPath
          }/screenshot_${Date.now()}.png`;
          await RNFS.moveFile(uri, destPath);

          const reference = storage().ref(
            `/screenshots/screenshot_${Date.now()}.png`,
          );
          await reference.putFile(destPath);
          const downloadURL = await reference.getDownloadURL();
          if (downloadURL) {
            setOrderState('file', downloadURL);
            navigation.navigate(APP_ROUTES.SEND_IDEA as never);
            console.log('avatarUri', downloadURL);
            setIdeaLoading(false);
          } else {
            Alert.alert(`${t("Something went wrong")}`);
            setIdeaLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert(`${t("Error")}`, `${t("Failed to capture and upload screenshot")}`);
        });
    }
  };

  const renderCons = useCallback(() => {
    return themeState.watchConstrctorData[currentPart].map((Item, index) => {
      return (
        <RN.View style={styles.faceCont} key={index}>
          {currentPart === 'faceTypes' ? (
            <RN.View style={styles.faceBox}>
              {/* <themeState.watchConstructor.faceBack /> */}
            </RN.View>
          ) : null}
          <RN.Pressable
            key={index}
            style={styles.part}
            onPress={() => setCurrentWatch(currentPart as never, Item)}>
            {'options' === currentPart ? (
              <RN.Image style={styles.costImage} source={Item} />
            ) : (
              <Item width={windowWidth / 5 + 6} height={100}/>
            )}
          </RN.Pressable>
        </RN.View>
      );
    });
  }, [currentPart]);

  const renderParts = useCallback(() => {
    return ConstructorParts.map((item, index) => {
      return (
        <RN.View key={index}>
          <ListItemCont
            key={index}
            title={item.title}
            rightItem={
              <RadioBtn
                active={item.key === currentPart}
                onPress={() => setPart(item.key)}
              />
            }
            onPress={() => setPart(item.key)}
            backBlack
          />
          <Line />
        </RN.View>
      );
    });
  }, [currentPart]);

  const onHandleback = () => {
    navigation.goBack();
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={`${t("Watch Constructor")}`}
            leftItem={<ArrowLeftBack onPress={onHandleback} />}
          />
          <RN.View style={styles.content}>
            <ViewShot ref={viewShotRef} style={styles.viewShot}>
              <Constructor />
            </ViewShot>
          </RN.View>
          <RN.View style={styles.btns}>
            <OutlineBtn
              text={`${t("Save in gallery")}`}
              Width={'48%'}
              Height={45}
              onPress={() => captureAndSaveScreenshot('save')}
            />
            <OutlineBtn
              text={`${t("Send idea")}`}
              Width={'48%'}
              Height={45}
              onPress={captureAndSaveScreenshot}
              icon={
                ideaLoading ? <ActivityIndicator color={COLORS.white} /> : null
              }
            />
          </RN.View>
          <RN.ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <RN.View style={styles.typesList}>{renderCons()}</RN.View>
          </RN.ScrollView>
          <RN.ScrollView
            style={styles.partsScroll}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View
              style={[styles.parts, {backgroundColor: themeState.mainBack}]}>
              {renderParts()}
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(WatchConstructor);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {},
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  typesList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: windowWidth / 25,
    paddingVertical: 10,
  },
  partsScroll: {
    height: windowHeight / 4,
  },
  parts: {
    paddingBottom: 60,
  },
  part: {
    height: 100,
    justifyContent: 'center',
  },
  viewShot: {},
  previewContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    width: '100%',
    height: '100%',
  },
  previewImage: {
    width: 300,
    height: 300,
  },
  costImage: {
    width: 80,
    height: 80,
    objectFit: 'contain',
  },
  faceCont: {
    justifyContent: 'center',
  },
  faceBox: {
    position: 'absolute',
  },
});
