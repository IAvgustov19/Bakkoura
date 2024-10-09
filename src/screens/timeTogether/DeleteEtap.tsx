import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import {windowHeight} from '../../utils/styles';

import {t} from '../../i18n'
import { APP_ROUTES } from '../../navigation/routes';

const DeleteEtap = () => {
  const navigation = useNavigation();
  const {handleDeleteEtap, addEtapState} = useRootStore().togetherTimeStore;

  const deleteHandle = () => {
    navigation.navigate(APP_ROUTES.TIME_TOGETHER as never);
    handleDeleteEtap(addEtapState.id);
  };


  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={`${t("Delete")}`}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <TextView title={`${t("Are you sure you want to delete your account")}`}/>
            <TextView text={`${t("remove_lover_1")} ${addEtapState.name}, ${t("remove_lover_2")}`} />
            <StartBtn text={`${t("Delete")}`} onPress={deleteHandle} />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(DeleteEtap);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingHorizontal: 10,
    height: windowHeight - windowHeight / 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
