import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import ButtonComp from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import TextView from '../../../components/Text/Text';
import {BG, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../../navigation/routes';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import RN from '../../../components/RN';
import {windowHeight} from '../../../utils/styles';
import useRootStore from '../../../hooks/useRootStore';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';

const SignInScreen = () => {
  const navigation = useNavigation();
  const {setAuthorized} = useRootStore().authStore;
  const [remember, setRemember] = useState(false);

  const RememberMe = () => {
    setRemember(e => !e);
  };

  return (
    <LinearContainer
      children={
        <RN.ScrollView>
          <View style={styles.container}>
            {/* <View style={styles.light}>
              <Image source={BG.light} />
            </View> */}
            <HeaderContent
              leftItem={
                <View style={styles.logo}>
                  <Images.Svg.btsRightLinear width={80} />
                </View>
              }
              rightItem={
                <TouchableOpacity
                  style={styles.localize}
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
                  }>
                  <Images.Svg.en width={50} />
                </TouchableOpacity>
              }
            />
            <View style={styles.titleBox}>
              <TextView title="Hello Friend!" />
              <TextView text="Start tracking and improving Your Live!" />
            </View>
            <View style={styles.formBox}>
              <TextView style={styles.label} text="Login" />
              <Input placeholder="JB" />
              <TextView style={styles.label} text="Password" />
              <Input placeholder="77777" />
            </View>
            <View style={styles.forgotBox}>
              <TouchableOpacity style={styles.rememberMe} onPress={RememberMe}>
                <RadioBtn active={remember} onPress={RememberMe} />
                <TextView text="Remember me" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(APP_ROUTES.RECOVER_PASSWORD as never)
                }>
                <TextView style={styles.forgot} text="Forgot Your Password?" />
              </TouchableOpacity>
            </View>
            <View style={styles.signUp}>
              <ButtonComp
                title="Sign in"
                // icon={<Images.Svg.eye />}
                onPress={setAuthorized}
              />
            </View>
            <View style={styles.orWithSocial}>
              <TextView text="Or Sign Up using" />
              <View style={styles.socialBox}>
                <TouchableOpacity>
                  <Images.Svg.f />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Images.Svg.x />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Images.Svg.g />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.needAcc}>
              <TextView text="Need un Account?" />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(APP_ROUTES.AUTH_SIGN_UP as never)
                }>
                <TextView style={styles.signUpText} text="Sign Up" />
              </TouchableOpacity>
            </View>
          </View>
        </RN.ScrollView>
      }
    />
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  Russs: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    height: windowHeight - 40,
    paddingHorizontal: 15,
    // paddingTop: 30,
  },
  logo: {},
  localize: {
    marginTop: -5,
  },
  titleBox: {
    marginTop: 50,
    gap: 10,
  },
  // light: {
  //   position: 'absolute',
  //   top: -30,
  //   left: 100,
  //   transform: [{translateX: -75}],
  // },
  formBox: {
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 40,
  },
  label: {
    marginLeft: 20,
  },
  forgotBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  forgot: {
    color: '#ECC271',
  },
  signUp: {
    marginTop: 30,
  },
  orWithSocial: {
    marginTop: 25,
    gap: 15,
  },
  socialBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  needAcc: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    gap: 10,
    left: 15,
  },
  signUpText: {
    color: '#ECC271',
  },
});
