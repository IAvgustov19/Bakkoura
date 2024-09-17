import { useIsFocused, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Images } from '../../assets';
import ButtonComp from '../../components/Button/Button';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SwitchContain from '../../components/SwitchContain/SwitchContain';
import TextView from '../../components/Text/Text';
import { formatDateTime } from '../../helper/helper';
import useRootStore from '../../hooks/useRootStore';
import { APP_ROUTES } from '../../navigation/routes';
import { COLORS } from '../../utils/colors';
import { windowHeight, windowWidth } from '../../utils/styles';
import { db } from '../../config/firebase';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { updateEtapsMailInFirestore, updateEtapsSynchronizedInFirestore } from '../../services/firestoreService';
import LottieContent from '../../components/LottieContent/LottieContent';
import { Lotties } from '../../lotties/lottie';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

const TimeTogether = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [back, setBack] = useState(true);
  const [synchronized, setSynchronized] = useState<boolean>(false);
  const userEmail = auth().currentUser.email;

  const {
    etapList,
    selcetedEtap,
    getTimeFormat,
    SelectOneEtap,
    toggleTimeFormat,
    calculateDaysDifference,
    getAllEtapsFromFirestore,
    clearState,
    setData,
    getOneTask,
  } =
    useRootStore().togetherTimeStore;

  // const onLongHandle = () => {
  //   navigation.navigate(APP_ROUTES.DELETE_ETAP as never);
  // };



  const onHandleTask = (data: any) => {
    clearState();
    getOneTask(data);
    navigation.navigate(APP_ROUTES.ADD_ETAP as never);
  };



  useEffect(() => {
    const synched = async () => {
      const snapshot = await db.collection('etaps').where('synchronizedEmail', '==', userEmail).get();
      // @ts-ignore
      setSynchronized(snapshot?._docs?.some(doc => doc._data.synchronized));
    }
    synched();

  }, [])

  useEffect(() => {
    getAllEtapsFromFirestore();
  }, [isFocused, synchronized])

  useEffect(() => {
    const getAllEtapsWithSyncedEmail = async () => {
      try {
        const snapshot = await db.collection('etaps').where('synchronizedEmail', '==', userEmail).where('synchronized', '==', false).get();
        if (!snapshot.empty) {
          let alertShown = false;
          const promises = [];
          snapshot.forEach(doc => {
            const etapData = doc.data();
            const etapUid = etapData.uid;
            const promise = db.collection('users').doc(etapUid).get();
            promises.push(promise);
          });
          const users = await Promise.all(promises);
          users.forEach(user => {
            const userEmail = user?._data?.email;
            if (!alertShown) {
              alertShown = true;
              Alert.alert(
                'Sync Confirmation',
                `Do you want to accept synchronization from ${userEmail}?`,
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: async () => {
                      try {
                        await updateEtapsMailInFirestore(null);
                        await updateEtapsSynchronizedInFirestore(false);
                        setSynchronized(false);
                        console.log('Sync deleted successfully');
                      } catch (error) {
                        console.error('Error deleting sync: ', error);
                      }
                    },
                    // onPress: async () => {
                    //   await updateEtapsMailInFirestore("");
                    //   await updateEtapsSynchronizedInFirestore(false);
                    //   setSynchronized(false);
                    // },
                  },
                  {
                    text: 'OK',
                    onPress: async () => {
                      setSynchronized(true);
                      await updateEtapsSynchronizedInFirestore(true);
                    },
                  },
                ],
                { cancelable: false }
              );
            }
          });
        } else {
          console.log('No etaps found with synchronized email for the current user.');
        }
      } catch (error) {
        console.error('Error fetching etaps: ', error);
      }
    };

    getAllEtapsWithSyncedEmail();
  }, []);

  const deleteSync = async () => {
    Alert.alert(
      'Delete Sync',
      `Do you really want to delete the sync?`,
      [
        {
          text: 'Yes',
          style: 'cancel',
          onPress: async () => {
            try {
              await updateEtapsMailInFirestore(null);
              await updateEtapsSynchronizedInFirestore(false);
              setSynchronized(false);
              console.log('Sync deleted successfully');
            } catch (error) {
              console.error('Error deleting sync: ', error);
            }
          },
        },
        {
          text: 'No',
        },
      ],
      { cancelable: false }
    )
  }

  const handleToggleFormat = () => {
    toggleTimeFormat();
  };

  const renderEtapList = useCallback(() => {
    return etapList.map((item, index) => {
      return (
        <RN.View key={index}>
          <Line />
          <RN.Pressable
            onPress={() => { SelectOneEtap(item.id); setData(item); }}
            style={styles.etapList}>
            <RN.Text style={styles.etapType}>{item.type}</RN.Text>
            <TextView text={item.fromDate} />
            <RN.Text style={styles.etapDays}>{`${+calculateDaysDifference(item.fromDate) > 0 ? calculateDaysDifference(item.fromDate) : 0} days`}</RN.Text>
            <Images.Svg.dots onPress={() => onHandleTask(item)} />
          </RN.Pressable>
          <Line />
        </RN.View>
      );
    });
  }, [etapList]);

  useEffect(() => {
    console.log(getTimeFormat());
  }, [getTimeFormat])


  const lottie = useMemo(() => {
    return (
      <LottieContent
        source={Lotties.timeTogether}
        width={windowWidth - 40}
        autoPlay={true}
        speed={1}
      />
    );
  }, []);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="Time Together"
            rightItem={
              <RN.TouchableOpacity onPress={() => navigation.navigate(APP_ROUTES.TIME_TOGETHER_SLIDER as never)}>
                <Images.Svg.question fill={'gray'} width={24} height={24} />
              </RN.TouchableOpacity>
            }
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.switch}>
              <SwitchContain
                title={getTimeFormat()} // Display the current time format
                _title={getTimeFormat() ? '30h' : '24h'} // Toggle label based on current format
                back={back}
                handlePress={() => { handleToggleFormat(); setBack(e => !e) }} // Call the toggle handler
              />
            </RN.View>
            <RN.View style={styles.coupleBox}>
              <RN.View style={styles.heartBox}>
                {!(etapList.length == 0) ? lottie :
                  <Images.Svg.heartIcon width={windowWidth - 40} />
                }
              </RN.View>
              <RN.View style={styles.coupleInfo}>
                <TextView
                  style={styles.coupleTimeText}
                  title={
                    selcetedEtap.timeStamp
                      ? `${selcetedEtap.type} ${selcetedEtap.uid !== auth().currentUser.uid ? '' : `with ${selcetedEtap.name ? selcetedEtap.name : 'no Name'
                        }`}`
                      : 'Time'
                  }
                />
                <RN.Text style={styles.coupleTime}>
                  {selcetedEtap.time != '0' ? selcetedEtap.time : '00:00:00'}
                </RN.Text>
                <RN.Text style={styles.coupleDays}>
                  {+calculateDaysDifference(selcetedEtap.fromDate) > 0 ? calculateDaysDifference(selcetedEtap.fromDate) : 0} days
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
                outline={synchronized}
                width={'45%'}
                title={synchronized ? 'Synchronized' : 'Synchronize'}
                onPress={() => {
                  synchronized ? deleteSync() :
                    navigation.navigate(APP_ROUTES.SYNCHRONYZE as never)
                }}
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
    height: windowHeight / 3,
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
  switch: {
    paddingVertical: 10, width: '100%', alignItems: 'center'
  }
});
