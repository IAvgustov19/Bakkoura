import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import GiveImage from '../../../components/GiveImage/GiveImage';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import {KeyboardAvoidingView} from '../../../components/KeyboardAvoidingView';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import {COLORS} from '../../../utils/colors';
import {windowHeight} from '../../../utils/styles';

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
                onPress={() =>
                  navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
                }>
                <Images.Svg.en width={50} />
              </RN.TouchableOpacity>
            }
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <TextView title="Sign up" textAlign="center" />
              <RN.View style={styles.formBox}>
                <TextView style={styles.label} text="Name" />
                <Input placeholder="JB" />
                <TextView style={styles.label} text="Username" />
                <Input placeholder="77777" />
                <TextView style={styles.label} text="Email" />
                {/* <KeyboardAvoidingView
                children={ */}
                <Input placeholder="77777" />
                <TextView style={styles.label} text="Password" />
                {/* }
                /> */}
                <Input placeholder="77777" />
                <TextView style={styles.label} text="Country" />
                <Input placeholder="77777" />
              </RN.View>
              <RN.View style={styles.signUpBtn}>
                <ButtonComp
                  onPress={setAuthorized}
                  icon={<GiveImage source={Images.Img.eye} />}
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
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    paddingHorizontal: 10,
    height: WINDOW_HEIGHT - 40,
  },
  content: {
    height: windowHeight - windowHeight / 6,
    // backgroundColor: 'red',
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
