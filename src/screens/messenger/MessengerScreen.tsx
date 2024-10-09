import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';

import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {RootStackParamList} from '../../types/navigation';
import LoadingScreen from '../auth/Loading/LoadingScreen';
import {APP_ROUTES} from '../../navigation/routes';
import useRootStore from '../../hooks/useRootStore';
import MessageItem from './components/MessageItem';
import {windowWidth} from '../../utils/styles';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import RN from '../../components/RN';
import { t } from '../../i18n';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  APP_ROUTES.DIALOG_SCREEN
>;

const MessengerScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const {
    loading: storeLoading,
    userData,
    getAllUsersWithLastMessages,
  } = useRootStore().messangerStore;
  const {themeState} = useRootStore().personalAreaStore;

  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const previousUserDataRef = useRef(userData);

  const formatTimestampToTime = timestamp => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (isFocused && !loading) {
      setLoading(true);
      getAllUsersWithLastMessages()
        .then(() => {
          setDataLoaded(true);
          previousUserDataRef.current = userData;
        })
        .finally(() => setLoading(false));
    }
  }, [isFocused, getAllUsersWithLastMessages]);

  const renderItems = useCallback(() => {
    const sortedUserData = [...userData].sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) return 0;
      const aDate: any = new Date(a.lastMessage.createdAt);
      const bDate: any = new Date(b.lastMessage.createdAt);
      return bDate - aDate;
    });

    return sortedUserData.map((item, index) => {
      const createdAt = item.lastMessage?.createdAt;
      const formattedTime = createdAt ? formatTimestampToTime(createdAt) : '';

      return (
        <MessageItem
          unreadMessages={item.unreadMessages}
          onNavigate={() =>
            navigation.navigate(APP_ROUTES.DIALOG_SCREEN, {
              id: item.id,
              name: item.name,
              avatar: item.avatar,
            })
          }
          key={index}
          avatar={item.avatar}
          name={item.name}
          description={
            item.lastMessage?.audio
              ? `${t("Voice message")}`
              : item.lastMessage?.video
                ? `${t("Video message")}`
                : item.lastMessage?.text || ''
          }
          time={formattedTime}
        />
      );
    });
  }, [userData, navigation]);

  return (
    <LinearContainer>
      <View style={styles.container}>
        <HeaderContent
          leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
          rightItem={
            <RN.View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <themeState.searchBtn
              width={39}
              height={39}
              onPress={() =>
                navigation.navigate(APP_ROUTES.SEARCH_CONTACT as never)
              }
            />
              <RN.TouchableOpacity onPress={() => navigation.navigate(APP_ROUTES.MESSENGER_SLIDER as never)}>
              <Images.Svg.question fill={'gray'} width={24} height={24} />
              </RN.TouchableOpacity>
            </RN.View>
            
          }
          title={`${t("Messenger")}`}
        />
        <View style={styles.content}>
          {loading ? (
            <LoadingScreen loading={loading} setLoading={() => {}} />
          ) : userData.length === 0 ? (
            <View style={styles.center}>
              <Text style={[styles.text, {color: themeState.title}]}>{t("There are no dialogues")}</Text>
            </View>
          ) : (
            <ScrollView
              style={styles.flatList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {renderItems()}
            </ScrollView>
          )}
          {!loading && (
            <View style={styles.startBtnContainer}>
              <StartBtn
                elWidth={55}
                subWidth={75}
                icon={<Images.Svg.btnAddIcon />}
                primary
                onPress={() => navigation.navigate(APP_ROUTES.ADD_USER as never)}
              />
            </View>
          )}
        </View>
      </View>
    </LinearContainer>
  );
};

export default observer(MessengerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  flatList: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: -30,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontFamily:'RedHatDisplay-Regular'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:100
  },
  startBtnContainer: {
    position: 'absolute',
    bottom: 50,
    width: windowWidth - 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
