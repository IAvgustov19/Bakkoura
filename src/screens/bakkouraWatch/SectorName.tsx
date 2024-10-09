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

const SectorName = () => {
  const navigation = useNavigation();
  const {setNewSelectState, clearName, newSelectState} =
    useRootStore().bakkouraWatchStore;
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={t("name")}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.nameBox}>
              <Input
                placeholder={t("name")}
                icon={<Images.Svg.deleteIcon />}
                iconPress={clearName}
                value={newSelectState.name}
                onChangeText={e => setNewSelectState('name', e)}
              />
              <TextView text={`${t("enter_task_name")}`} />
            </RN.View>
            <StartBtn
              text={t("ok")}
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

export default observer(SectorName);

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
