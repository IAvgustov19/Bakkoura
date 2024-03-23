import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import ButtonComp from '../../components/Button/Button';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';

const Synchronyze = () => {
  const navigation = useNavigation();
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
            <Input placeholder="Email" />
            <ButtonComp
              width={'50%'}
              title={'Send'}
              onPress={() => navigation.navigate(APP_ROUTES.THANKS as never)}
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
    paddingHorizontal: 10,
  },
  content: {
    paddingHorizontal: 10,
    height: windowHeight - windowHeight / 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
