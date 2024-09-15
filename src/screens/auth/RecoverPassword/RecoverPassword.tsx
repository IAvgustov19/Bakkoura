import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Images } from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import GiveImage from '../../../components/GiveImage/GiveImage';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import { APP_ROUTES } from '../../../navigation/routes';
import { HITSLOP } from '../../../utils/styles';


import authh from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { db } from '../../../config/firebase';

const RecoverPasswordScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(email)
  })


  console.log(users)
  useEffect(() => {
    const getUsers = async () => {
      try {
        const snapshot = await db.collection('users').get();
        const emails = snapshot.docs.map(doc => doc.data().email);
        setUsers(emails);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);
  console.log(JSON.stringify(users, null, 2))

  const resetPassword = async (email: string) => {
    if (!users.includes(email)) {
      Alert.alert('User with this email doesnt exist');
    } else {
      try {
        await authh().sendPasswordResetEmail(email);
        Alert.alert('Check your email to change your password', 'Press ok to get sign in page', [
          { text: 'OK', onPress: () => navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never) },
        ])
      } catch (err) {
        Alert.alert(err)
      }
    }
  }

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={
              <RN.TouchableOpacity
                hitSlop={HITSLOP}
                style={styles.backBtn}
                onPress={() => navigation.goBack()}>
                <Images.Svg.arrowLeft />
                <TextView text="Back" />
              </RN.TouchableOpacity>
            }
          />
          <RN.View style={styles.centerBox}>
            <TextView title="Recover password" />
            <TextView
              style={styles.further}
              text="If Your account exist, an email will be sent with further instructions."
            />
            <RN.View style={styles.formBox}>
              <TextView style={styles.label} text="Email" />
              <Input
                value={email}
                placeholder="bakkourainfo@gmail.com"
                onChangeText={(text) => setEmail(text)}
              />
            </RN.View>
            <RN.View style={styles.sendBtn}>
              <ButtonComp
                onPress={() => resetPassword(email)}
                // onPress={() =>
                //   navigation.navigate(APP_ROUTES.VERIFICATION_CODE as never)
                // }
                title="Send"
                icon={<GiveImage source={Images.Img.eye} />}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default RecoverPasswordScreen;

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  centerBox: {
    marginTop: '35%',
  },
  further: {
    marginTop: 10,
  },
  formBox: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 30,
  },
  label: {
    marginLeft: 20,
  },
  sendBtn: {
    marginTop: 20,
  },
});
