import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {setAuthorized} = useRootStore().authStore;
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <RN.TouchableOpacity
                style={styles.localize}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
                }>
                <Images.Svg.en width={50} />
              </RN.TouchableOpacity>
            }
          />
          <TextView title="Sign up" textAlign="center" />
          <RN.View style={styles.formBox}>
            <TextView style={styles.label} text="Name" />
            <Input placeholder="JB" />
            <TextView style={styles.label} text="Username" />
            <Input placeholder="77777" />
            <TextView style={styles.label} text="Email" />
            <Input placeholder="77777" />
            <TextView style={styles.label} text="Password" />
            <Input placeholder="77777" />
            <TextView style={styles.label} text="Country" />
            <Input placeholder="77777" />
          </RN.View>
          <RN.View style={styles.signUpBtn}>
            <ButtonComp
              onPress={setAuthorized}
              // icon={<Images.Svg.eye />}
              title="Sign Up"
            />
          </RN.View>
          <View style={styles.needAcc}>
            <TextView text="Already have un Account?" />
            <RN.TouchableOpacity
              onPress={() =>
                navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never)
              }>
              <TextView style={styles.signUpText} text="Sign In" />
            </RN.TouchableOpacity>
          </View>
        </RN.View>
      }
    />
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  // scrollView: {
  //   paddingVertical: 20,
  // },
  localize: {
    marginTop: -5,
  },
  container: {
    paddingHorizontal: 10,
    height: WINDOW_HEIGHT - 40,
  },
  formBox: {
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  label: {
    marginLeft: 10,
  },
  signUpBtn: {
    marginTop: 30,
    paddingHorizontal: 15,
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
