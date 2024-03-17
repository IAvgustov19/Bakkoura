import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../assets';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';

const NameAlarm = () => {
  const navigation = useNavigation();
  const {setNewAlarmState, alarmItemData} = useRootStore().alarmStore;
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Name"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.inputBox}>
            <Input
              placeholder="Name"
              value={alarmItemData.name}
              onChangeText={e => setNewAlarmState('name', e)}
            />
            <RN.TouchableOpacity
              style={styles.deleteBox}
              onPress={() => setNewAlarmState('name', '')}>
              <Images.Svg.deleteIcon />
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(NameAlarm);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  inputBox: {
    paddingHorizontal: 10,
  },
  deleteBox: {
    position: 'absolute',
    right: '7%',
    top: '30%',
  },
});
