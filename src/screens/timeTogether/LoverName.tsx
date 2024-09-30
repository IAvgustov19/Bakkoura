import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../assets';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextView from '../../components/Text/Text';
import {windowHeight} from '../../utils/styles';
import useRootStore from '../../hooks/useRootStore';

import {t} from '../../i18n'

const LoverName = () => {
  const navigation = useNavigation();
  const {addEtapState, setAddEtapState, clearLoverName} =
    useRootStore().togetherTimeStore;

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={`${t("Lover Name")}`}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.nameBox}>
              <Input
                placeholder={`${t("name")}`}
                icon={<Images.Svg.deleteIcon />}
                value={addEtapState.name}
                iconPress={clearLoverName}
                onChangeText={e => setAddEtapState('name', e)}
              />
              <TextView text={`${t("enter_locer_name")}`} />
            </RN.View>
            <StartBtn
              text="Ok"
              subWidth={70}
              elWidth={55}
              primary
              onPress={() => navigation.goBack()}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(LoverName);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 6,
  },
  nameBox: {
    paddingTop: 15,
    gap: 30,
  },
});
