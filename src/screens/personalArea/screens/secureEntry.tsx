import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import ListItemCont from '../../../components/ListItemCont/ListItemCont';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';

import {SecureEntries} from '../../../utils/secureEntries';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import {ActivityIndicator} from 'react-native';

const SecureEntry = () => {
  const navigation = useNavigation();

  const {
    secureEntries,
    onSecureEntryItemPress,
    updateProfile,
    updateLoading,
    personalAreaData,
  } = useRootStore().personalAreaStore;

  const updateSecure = () => {
    updateProfile(() => navigation.goBack());
  };

  const renderItem = ({item, index}) => {
    return (
      <RN.View style={styles.eventsTypeList}>
        <ListItemCont
          rightItem={
            <RadioBtn
              active={item.title === personalAreaData?.secureEntry}
              onPress={() => onSecureEntryItemPress(index) as never}
            />
          }
          title={
            <RN.Text
              color={
                item.title === personalAreaData?.secureEntry
                  ? '#fff'
                  : '#7D7D7D'
              }>
              {item.title}
            </RN.Text>
          }
          onPress={() => onSecureEntryItemPress(index) as never}
        />
        <RN.View style={styles.line}></RN.View>
      </RN.View>
    );
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          {/* <RN.View style={styles.bgContainer}>
                        <Images.Svg.bg style={styles.bg} />
                    </RN.View> */}
          <HeaderContent
            leftItem={
              <RN.TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}>
                <Images.Svg.arrowLeft />
                <TextView text="Back" />
              </RN.TouchableOpacity>
            }
            title="Secure Entry"
          />
          <RN.FlatList
            data={secureEntries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          <RN.View style={styles.addBtn}>
            <StartBtn
              onPress={updateSecure}
              primary={true}
              text={updateLoading ? '' : 'Ok'}
              icon={
                updateLoading ? (
                  <ActivityIndicator
                    color={COLORS.black}
                    style={{marginTop: 3}}
                  />
                ) : null
              }
              subWidth={70}
              elWidth={55}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(SecureEntry);

const styles = RN.StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 10,
  },
  bgContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
  },
  eventsTypeList: {
    backgroundColor: '#0D0D0D',
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 5,
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
  addBtn: {
    bottom: 20,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
