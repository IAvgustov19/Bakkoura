import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import ButtonComp from '../../components/Button/Button';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';
import { APP_ROUTES } from '../../navigation/routes';
import { windowHeight } from '../../utils/styles';
import { db } from '../../config/firebase';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { updateEtapsMailInFirestore } from '../../services/firestoreService';

const Synchronyze = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const onSend = async () => {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    const userExists = !userSnapshot.empty;
    const currentUser = auth().currentUser;
    const currentUserEmail = currentUser.email;

    if (userExists) {
      Alert.alert(
        'Synchronize invite sent!',
        '',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
      updateEtapsMailInFirestore(email);
    } else {
      Alert.alert('There is no user with this email');
    }
  }

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Synchronyze"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <TextView title="Synchronyze" />
            <TextView text="Enter your loved one's email address. We will send a request to confirm the status of your relationship." />
            <Input
              value={email}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
            <ButtonComp
              width={'50%'}
              title={'Send'}
              onPress={onSend}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(Synchronyze);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingHorizontal: 10,
    height: windowHeight - windowHeight / 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
