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

const DeleteEtap = () => {
  const navigation = useNavigation();
  const {onDeleteOneEtap} = useRootStore().togetherTimeStore;
  const deleteHandle = () => {
    onDeleteOneEtap();
    navigation.goBack();
  };
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Delete"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <TextView title="Are you sure?" />
            <TextView text="When you remove the relationship timer from Sandy, it cannot be restored. " />
            <StartBtn text="Delete" onPress={deleteHandle} />
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
