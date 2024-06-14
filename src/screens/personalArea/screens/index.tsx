import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Images} from '../../../assets';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import * as ImagePicker from 'react-native-image-picker';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import ListItemCont from '../../../components/ListItemCont/ListItemCont';
import {APP_ROUTES} from '../../../navigation/routes';
import {windowHeight} from '../../../utils/styles';
import {COLORS} from '../../../utils/colors';
import RN from '../../../components/RN';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../../hooks/useRootStore';
import {ActivityIndicator} from 'react-native';
import StorageApi, {
  pickImageFromDevice,
} from '../../../store/personalArea/avatar';

const PersonalArea = () => {
  const {
    personalAreaData,
    setPersonalAreaState,
    updateProfile,
    updateLoading,
    initialRouteNameChanged,
  } = useRootStore().personalAreaStore;
  const [avatarLoading, setAvatarLoading] = useState(true);

  const onUploadImage = async () => {
    setAvatarLoading(true);
    try {
      const result = await pickImageFromDevice({
        width: 400,
        height: 400,
        withCircleOverlay: true,
      });

      const url = await StorageApi.uploadImage({
        file: result,
      });

      if (url) {
        setPersonalAreaState('avatar', url as never);
        updateProfile();
      }
    } catch (err) {
      console.log(['[Error-onUploadImage]:', err]);
    }
  };

  const navigation = useNavigation();
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          {/* <Images.Svg.bg style={styles.bg} /> */}
          <HeaderContent
            rightItem={
              <RN.TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => navigation.goBack()}>
                <RN.Text style={styles.cancelTxt}>Cancel</RN.Text>
              </RN.TouchableOpacity>
            }
            title="Personal Area"
          />
          <RN.ScrollView showsVerticalScrollIndicator={false}>
            <RN.TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={onUploadImage}>
              {personalAreaData?.avatar ? (
                <RN.View style={styles.imageContainer}>
                  <Images.Svg.profileBackground width={79} height={79} />
                  <RN.Image
                    source={{uri: personalAreaData.avatar}}
                    style={styles.profileImg}
                    onLoadEnd={() => setAvatarLoading(false)}
                  />
                  {avatarLoading || updateLoading ? (
                    <RN.View style={styles.loadingBox}>
                      <ActivityIndicator
                        color={COLORS.black}
                        style={{marginTop: 3}}
                      />
                    </RN.View>
                  ) : null}
                </RN.View>
              ) : (
                <Images.Svg.userIcon width={79} height={79} />
              )}
            </RN.TouchableOpacity>
            <RN.TouchableOpacity
              style={styles.chooseBtn}
              onPress={onUploadImage}>
              <RN.Text style={styles.chooseText}>Choose a photo</RN.Text>
            </RN.TouchableOpacity>
            <RN.View style={styles.content}>
              <RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <ListItemCont
                    title={personalAreaData ? personalAreaData.name : 'User'}
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.PERSONAL_DETAILS as never)
                    }
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Login & Password"
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.LOGIN_PASSWORD as never)
                    }
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Secure Entry"
                    value={
                      personalAreaData ? personalAreaData?.secureEntry : 'Free'
                    }
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.SECURE_ENTRY as never)
                    }
                  />
                </RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <ListItemCont
                    title="Organize Menu"
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.MENU as never)
                    }
                  />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont
                    title="Start Screen"
                    value={initialRouteNameChanged?.title}
                    onPress={() =>
                      navigation.navigate(
                        APP_ROUTES.PERSON_START_SCREEN as never,
                      )
                    }
                  />
                </RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <ListItemCont
                    title="Language"
                    value={
                      personalAreaData ? personalAreaData.language : 'English'
                    }
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
                    }
                  />
                </RN.View>
                <RN.View style={styles.eventsTypeList}>
                  <ListItemCont title="Important Dates" onPress={() => {}} />
                  <RN.View style={styles.line}></RN.View>
                  <ListItemCont title="Couple Time" onPress={() => {}} />
                </RN.View>
              </RN.View>
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(PersonalArea);

const styles = RN.StyleSheet.create({
  container: {
    height: windowHeight,
    position: 'relative',
    paddingHorizontal: 15,
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
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    zIndex: 2,
  },
  chooseBtn: {
    paddingVertical: 11,
    alignItems: 'center',
  },
  chooseText: {
    fontSize: 14,
    color: COLORS.grey,
  },
  scrollView: {},
  content: {
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 6,
  },
  eventsTypeList: {
    backgroundColor: '#0D0D0D',
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  line: {
    backgroundColor: '#131F28',
    width: '100%',
    height: 1,
  },
});
