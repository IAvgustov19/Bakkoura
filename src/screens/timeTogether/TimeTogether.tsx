import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {Images} from '../../assets';
import ButtonComp from '../../components/Button/Button';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import TextView from '../../components/Text/Text';
import {formatDateTime} from '../../helper/helper';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {windowHeight, windowWidth} from '../../utils/styles';

const TimeTogether = () => {
  const navigation = useNavigation();
  const [back, setBack] = useState(true);
  const {etapList, selcetedEtap, SelectOneEtap} =
    useRootStore().togetherTimeStore;

  const onLongHandle = () => {
    navigation.navigate(APP_ROUTES.DELETE_ETAP as never);
  };

  const renderEtapList = useCallback(() => {
    return etapList.map((item, index) => {
      return (
        <RN.View key={index}>
          <Line />
          <RN.Pressable
            onPress={() => SelectOneEtap(item.id)}
            onLongPress={onLongHandle}
            style={styles.etapList}>
            <RN.Text style={styles.etapType}>{item.type}</RN.Text>
            <TextView text={item.fromDate} />
            <RN.Text style={styles.etapDays}>{`${item.days}days`}</RN.Text>
          </RN.Pressable>
          <Line />
        </RN.View>
      );
    });
  }, [etapList]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Couple Time"
            rightItem={
              <SwitchContain
                title="24h"
                _title="30h"
                back={back}
                handlePress={() => setBack(e => !e)}
              />
            }
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.coupleBox}>
              <RN.View style={styles.heartBox}>
                <Images.Svg.heartIcon width={windowWidth - 40} />
              </RN.View>
              <RN.View style={styles.coupleInfo}>
                <TextView
                  style={styles.coupleTimeText}
                  title={
                    selcetedEtap.timeStamp
                      ? `${selcetedEtap.type} with ${
                          selcetedEtap.name ? selcetedEtap.name : 'no Name'
                        }`
                      : 'Time'
                  }
                />
                <RN.Text style={styles.coupleTime}>
                  {selcetedEtap.time != '0' ? selcetedEtap.time : '00:00:00'}
                </RN.Text>
                <RN.Text style={styles.coupleDays}>
                  {selcetedEtap.days} days
                </RN.Text>
                <RN.Text style={styles.coupleDate}>
                  {selcetedEtap.fromDate != '0'
                    ? selcetedEtap.fromDate
                    : '00/00/0000'}
                </RN.Text>
              </RN.View>
            </RN.View>
            <RN.View style={styles.btns}>
              <ButtonComp
                width={'45%'}
                title={'Add Etap +'}
                outline
                onPress={() =>
                  navigation.navigate(APP_ROUTES.ADD_ETAP as never)
                }
              />
              <ButtonComp
                width={'45%'}
                title={'Synchronize'}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.SYNCHRONYZE as never)
                }
              />
            </RN.View>
            <RN.View style={styles.etapScrollView}>
              <RN.ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {renderEtapList()}
              </RN.ScrollView>
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(TimeTogether);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight - windowHeight / 4,
  },
  coupleBox: {
    height: windowHeight - windowHeight / 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBox: {
    position: 'absolute',
    paddingTop: 20,
  },
  coupleInfo: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coupleTimeText: {
    marginTop: 10,
  },
  coupleTime: {
    color: COLORS.white,
    fontSize: 46,
    fontWeight: '300',
  },
  coupleDays: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '200',
    lineHeight: 25,
  },
  coupleDate: {
    color: COLORS.yellow,
    fontSize: 16,
    marginTop: 15,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  etapScrollView: {
    height: windowHeight / 4,
  },
  etapList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  etapType: {
    fontSize: 18,
    color: COLORS.white,
  },
  etapDays: {
    fontSize: 16,
    color: COLORS.white,
  },
});
