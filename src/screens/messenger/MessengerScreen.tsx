import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import { Images } from '../../assets';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import { APP_ROUTES } from '../../navigation/routes';
import MessageItem from './components/MessageItem';
import useRootStore from '../../hooks/useRootStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import LoadingScreen from '../auth/Loading/LoadingScreen';
import { windowWidth } from '../../utils/styles';
import { observer } from 'mobx-react-lite';
import RN from '../../components/RN';
type NavigationProp = StackNavigationProp<RootStackParamList, APP_ROUTES.DIALOG_SCREEN>;

const MessengerScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const {
    loading: storeLoading,
    userData,
    getAllUsersWithLastMessages,
  } = useRootStore().messangerStore;

  const [loading, setLoading] = useState(storeLoading);
  const formatTimestampToTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getAllUsersWithLastMessages().finally(() => setLoading(false));
    }
  }, [getAllUsersWithLastMessages]);

  const renderItems = useCallback(() => {
    const sortedUserData = [...userData].sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) return 0;
      return b.lastMessage.createdAt.seconds - a.lastMessage.createdAt.seconds;
    });

    return sortedUserData.map((item, index) => (
      <MessageItem
        onNavigate={() =>
          navigation.navigate(APP_ROUTES.DIALOG_SCREEN, {
            id: item.id,
            name: item.name,
            avatar: item.avatar
          })
        }
        key={index}
        avatar={item.avatar}
        name={item.name}
        description={item.lastMessage?.text ?? 'Hi! Please call me at 16...'}
        time={item.lastMessage ? formatTimestampToTime(item.lastMessage.createdAt.seconds) : ''}
      />
    ));
  }, [userData]);

  return (
    <LinearContainer>
      <View style={styles.container}>
        <HeaderContent
          leftItem={<Images.Svg.btsRightLinear />}
          rightItem={
            <Images.Svg.searchButton width={39} height={39} onPress={() => navigation.navigate(APP_ROUTES.SEARCH_CONTACT as never)} />
          }
          title="Messenger"
        />
        <View style={styles.content}>
          {loading ? (
              <LoadingScreen loading={loading} setLoading={() => { }}/>
          ) : userData.length === 0 ? (
            <View style={styles.center}>
              <Text style={styles.text}>There are no dialogues</Text>
            </View>
          ) : (
            <ScrollView
              style={styles.flatList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {renderItems()}
            </ScrollView>
          )}
          {!loading &&
            <View style={styles.startBtnContainer}>
              <StartBtn
                elWidth={55}
                subWidth={75}
                icon={<Images.Svg.btnAddIcon />}
                primary
                onPress={() => navigation.navigate(APP_ROUTES.SEARCH_CONTACT as never)}
              />
            </View>
          }
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
    marginBottom: 55,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtnContainer: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth - 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
