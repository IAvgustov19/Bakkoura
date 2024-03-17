import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import {HITSLOP} from '../../../utils/styles';

const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const {setAuthorized} = useRootStore().authStore;
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
            <RN.View style={styles.formBox}>
              <TextView style={styles.label} text="New password" />
              <Input placeholder="7777777" />
              <TextView style={styles.label} text="Confirm password" />
              <Input placeholder="7777777" />
            </RN.View>
            <RN.View style={styles.sendBtn}>
              <ButtonComp onPress={setAuthorized} title="Save" />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default NewPasswordScreen;

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
