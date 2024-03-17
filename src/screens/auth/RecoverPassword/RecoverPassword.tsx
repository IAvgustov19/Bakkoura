import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {APP_ROUTES} from '../../../navigation/routes';
import {HITSLOP} from '../../../utils/styles';

const RecoverPasswordScreen = () => {
  const navigation = useNavigation();
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
              <Input placeholder="bakkourainfo@gmail.com" />
            </RN.View>
            <RN.View style={styles.sendBtn}>
              <ButtonComp
                onPress={() =>
                  navigation.navigate(APP_ROUTES.VERIFICATION_CODE as never)
                }
                title="Send"
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
