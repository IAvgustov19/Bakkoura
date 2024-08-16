import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';
import SetSectorTime from './components/SetSectorTime';

const SectorTime = () => {
  const navigation = useNavigation();
  const {selectStartEndTime, newSelectState, clearTime} =
    useRootStore().bakkouraWatchStore;
  const onHandleTime = () => {
    selectStartEndTime(() => navigation.goBack());
  };

  const onBackHandle = () => {
    clearTime();
    navigation.goBack();
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Time"
            rightItem={<Cancel onClose={onBackHandle} />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.from}>
              <SetSectorTime />
            </RN.View>
            <RN.View style={styles.btn}>
              <StartBtn
                text="Ok"
                elWidth={55}
                subWidth={70}
                primary
                onPress={onHandleTime}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(SectorTime);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    width: '100%',
    gap: 10,
    height: windowHeight - windowHeight / 6,
    justifyContent: 'space-between',
  },
  from: {
    height: '85%',
  },
  btn: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
