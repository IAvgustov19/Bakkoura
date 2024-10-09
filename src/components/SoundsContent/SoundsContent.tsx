import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Images } from '../../assets';
import useRootStore from '../../hooks/useRootStore';
import { SoundsData } from '../../utils/sounds';
import { windowHeight } from '../../utils/styles';
import Cancel from '../Cancel/Cancel';
import HeaderContent from '../HeaderContent/HeaderContent';
import LinearContainer from '../LinearContainer/LinearContainer';
import ListItemCont from '../ListItemCont/ListItemCont';
import RN from '../RN';
import SimpleSwitch from '../SimpleSwitch/SimpleSwitch';
import StartBtn from '../StopStartBtn/StopStartBtn';
import { t } from '../../i18n';
import Line from '../Line/Line';
import RadioBtn from '../RadioBtn/RadioBtn';
import {COLORS} from '../../utils/colors';

type Props = {
  modalVisible?: boolean;
  headerLeftItem?: React.ReactNode;
  headerRightItem?: React.ReactNode;
  headerTitle?: string;
  onClose?: () => void;
  onSelect?: () => void;
  data?: any[];
  onItemPress?: () => void;
  myMusic?: boolean;
  myMusicValue?: string;
  vibral?: boolean;
  vibrationActive?: boolean;
  setVibrationActive?: () => void;
  okBtn?: boolean;
  okBtnText?: string;
  onPressBtn?: () => void;
  onSelectMyMusic?: () => void;
};

const Item = ({data, title, active, index, onPress}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <>
      <RN.TouchableOpacity style={[styles.item]} onPress={() => onPress(index)}>
        <RN.Text
          style={[
            styles.title,
            {color: active ? themeState.title : COLORS.grey},
          ]}>
          {title}
        </RN.Text>
        <RadioBtn active={active} onPress={() => onPress(index)} />
      </RN.TouchableOpacity>
      {index === data.length - 1 ? null : <Line />}
    </>
  );
};

const SoundsContent: React.FC<Props> = ({
  modalVisible,
  onClose,
  headerLeftItem,
  headerRightItem,
  headerTitle,
  data,
  onItemPress,
  myMusic,
  vibral,
  vibrationActive,
  setVibrationActive,
  okBtn,
  onPressBtn,
  okBtnText,
  onSelectMyMusic,
  myMusicValue,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <LinearContainer
        children={
          <RN.View style={styles.centeredView}>
            <RN.View style={styles.modalView}>
              <HeaderContent title={headerTitle} leftItem={headerLeftItem} />
              <RN.View
                style={[
                  styles.listsBox,
                  {backgroundColor: themeState.mainBack},
                ]}>
                <RN.FlatList
                  data={data}
                  renderItem={({ item, index }) => (
                    <Item
                      data={data}
                      title={item.title}
                      active={item.active}
                      index={index}
                      onPress={onItemPress}
                    />
                  )}
                />
              </RN.View>
              <RN.View style={styles.more}>
                {vibral ? (
                  <RN.View
                    style={[
                      styles.eventsTypeList,
                      {backgroundColor: themeState.mainBack},
                    ]}>
                    <RN.View style={styles.listItem}>
                      <RN.Text style={styles.listItemText}>
                      {t("Vibro signal")}
                      </RN.Text>
                      <SimpleSwitch
                        active={vibrationActive}
                        handlePress={setVibrationActive}
                      />
                    </RN.View>
                  </RN.View>
                ) : null}
                {myMusic ? (
                  <ListItemCont title={`${t("My music")}`} value={`${t("Not selected")}`} backBlack onPress={onSelectMyMusic}/>
                ) : null}
              </RN.View>
            </RN.View>
            {okBtn ? (
              <StartBtn
                primary
                subWidth={70}
                elWidth={55}
                text={okBtnText}
                onPress={onPressBtn}
              />
            ) : null}
          </RN.View>
        }
      />
    </RN.Modal>
  );
};

export default observer(SoundsContent);

const styles = RN.StyleSheet.create({
  centeredView: {
    height: '85%',
    // backgroundColor: 'red',
  },
  modalView: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 5,
  },
  listsBox: {
    width: '100%',
    padding: 10,
    backgroundColor: '#0D0D0D',
    borderRadius: 6,
    marginBottom: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    color: '#7D7D7D',
    fontSize: 16,
  },
  activeRadio: {
    borderWidth: 1,
    borderColor: '#ECC271',
    borderRadius: 10,
  },

  eventsTypeList: {
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
    width: '100%',
  },
  listItemText: {
    color: '#7D7D7D',
    fontSize: 16,
  },
  more: {
    gap: 5,
  },
});
