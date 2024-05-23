import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import {useNavigation} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../../../utils/styles';
import TextView from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import React, {useState} from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {observer} from 'mobx-react-lite';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, Alert} from 'react-native';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';

const LoginPassword = () => {
  const navigation = useNavigation();
  const {loginState, setLoginState, updateProfile, currentUserPassword} =
    useRootStore().personalAreaStore;
  const [updateLoading, isUpdateLoading] = useState(false);
  const [showHide, setShowHide] = useState({
    showPassword: false,
    showRepeatPassword: true,
  });

  const reauthenticate = (currentPassword: string) => {
    const user = auth().currentUser;
    const credential = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    return user.reauthenticateWithCredential(credential);
  };

  const updatePassword = () => {
    const user = auth().currentUser;
    if (loginState.email === user.email) {
      if (loginState.password === loginState.repeatPassword) {
        isUpdateLoading(true);
        reauthenticate(currentUserPassword)
          .then(() => {
            const user = auth().currentUser;
            user
              .updatePassword(loginState.password)
              .then(() => {
                console.log('Before updateProfile');
                updateProfile(() => {
                  console.log('Inside updateProfile callback');
                  navigation.goBack();
                });
                console.log('Password updated!');
              })
              .catch(error => {
                Alert.alert('Error', error.message);
              });
          })
          .catch(error => {
            Alert.alert('Error', error.message);
          })
          .finally(() => {
            isUpdateLoading(false);
          });
      } else {
        Alert.alert('Password is not same with repeat password');
      }
    } else {
      Alert.alert('Email is incorrect, please enter your current email');
    }
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
                <Images.Svg.arrowLeft />
                <TextView text="Back" />
              </RN.TouchableOpacity>
            }
            title="Login & Password"
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.inputBox}>
              <Input
                placeholder="Login"
                value={loginState.email}
                onChangeText={text => setLoginState('email', text)}
              />
            </RN.View>
            <RN.View style={styles.inputBox}>
              <Input
                secureTextEntry={showHide.showPassword}
                placeholder="Password"
                value={loginState.password}
                onChangeText={text => setLoginState('password', text)}
              />
              <RN.TouchableOpacity
                style={styles.deleteBox}
                onPress={() =>
                  setShowHide(prevData => ({
                    ...prevData,
                    showPassword: !prevData.showPassword,
                  }))
                }>
                {showHide.showPassword ? (
                  <Images.Svg.hidePassword />
                ) : (
                  <Images.Svg.showPassword />
                )}
              </RN.TouchableOpacity>
            </RN.View>
            <RN.View style={styles.inputBox}>
              <Input
                secureTextEntry={showHide.showRepeatPassword}
                placeholder="Repeat Password"
                value={loginState.repeatPassword}
                onChangeText={text => setLoginState('repeatPassword', text)}
              />
              <RN.TouchableOpacity
                style={styles.deleteBox}
                onPress={() =>
                  setShowHide(prevData => ({
                    ...prevData,
                    showRepeatPassword: !prevData.showRepeatPassword,
                  }))
                }>
                {showHide.showRepeatPassword ? (
                  <Images.Svg.hidePassword />
                ) : (
                  <Images.Svg.showPassword />
                )}
              </RN.TouchableOpacity>
            </RN.View>
            <RN.View style={styles.addBtn}>
              <StartBtn
                text={updateLoading ? '' : 'Ok'}
                icon={
                  updateLoading ? (
                    <ActivityIndicator
                      color={COLORS.black}
                      style={{marginTop: 3}}
                    />
                  ) : null
                }
                elWidth={55}
                subWidth={70}
                primary={true}
                onPress={updatePassword}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(LoginPassword);

const styles = RN.StyleSheet.create({
  container: {
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
  scrollView: {},
  content: {
    gap: 15,
    paddingTop: 25,
    height: windowHeight - windowHeight / 6,
  },
  addBtn: {
    position: 'absolute',
    // alignItems: 'center',
    bottom: 20,
    width: '100%',
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
});
