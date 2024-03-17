import {useNavigation} from '@react-navigation/native';
import {Switch} from '@rneui/base';
import React from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SoundsContent from '../../components/SoundsContent/SoundsContent';
import useRootStore from '../../hooks/useRootStore';
import {RepeatData} from '../../utils/repeat';
import {HITSLOP} from '../../utils/styles';

const RepeatScreen = () => {
  const navigation = useNavigation();
  const {onRepeatItemPress} = useRootStore().calendarStore;

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="New Event"
            rightItem={
              <RN.TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => navigation.goBack()}>
                <RN.Text style={styles.cancelTxt}>Cancel</RN.Text>
              </RN.TouchableOpacity>
            }
          />
          <RN.View style={styles.eventsTypeList}></RN.View>
        </RN.View>
      }
    />
  );
};

export default RepeatScreen;

const styles = RN.StyleSheet.create({
  cancelBtn: {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  cancelTxt: {
    color: '#656E77',
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 10,
  },
  eventsTypeList: {
    backgroundColor: '#0D0D0D',
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
  },
  listItemText: {
    color: '#7D7D7D',
    fontSize: 16,
  },
  line: {
    backgroundColor: '#131F28',
    width: '100%',
    height: 1,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  listItemRightText: {
    color: '#7D7D7D',
  },
});
