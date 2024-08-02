// import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
// import RN from '../../components/RN';
// import LinearContainer from '../../components/LinearContainer/LinearContainer';
// import HeaderContent from '../../components/HeaderContent/HeaderContent';
// import { Images } from '../../assets';
// import StartBtn from '../../components/StopStartBtn/StopStartBtn';
// import { useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
// import { windowHeight, windowWidth } from '../../utils/styles';
// import { APP_ROUTES } from '../../navigation/routes';
// import { Text } from 'react-native';
// import MessageItem from './components/MessageItem';
// import { formatDateTime, secondsToHMS } from '../../helper/helper';
// import useRootStore from '../../hooks/useRootStore';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../types/navigation';
// import { db } from '../../config/firebase';
// import auth from '@react-native-firebase/auth';
// import { getAllUsersFromFirestore } from '../../services/firestoreService';
// import { observer } from 'mobx-react-lite';
// import LoadingScreen from '../auth/Loading/LoadingScreen';

// type NavigationProp = StackNavigationProp<RootStackParamList, APP_ROUTES.DIALOG_SCREEN>;
// const MessengerScreen = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const {
//     loading,
//     userData,
//     getAllUsersWithLastMessages,
//   } = useRootStore().messangerStore;


//   function formatTimestampToTime(seconds) {
//     const date = new Date(seconds * 1000);
//     let hours = date.getHours();
//     let minutes = date.getMinutes();

//     const formattedHours = hours < 10 ? '0' + hours : hours;
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

//     return `${formattedHours}:${formattedMinutes}`;
//   }

//   useFocusEffect(() => {
//     getAllUsersWithLastMessages();
//   });

//   const renderItems = useCallback(() => {
//     return userData.map((item, index) => {
//       return (
//         <MessageItem
//           onNavigate={() =>
//             navigation.navigate(APP_ROUTES.DIALOG_SCREEN, {
//               id: item.id,
//               name: item.name,
//               avatar: item.avatar
//             })
//           }
//           key={index}
//           avatar={item.avatar}
//           name={item.name}
//           description={
//             item.lastMessage.text ??
//             ' Hi! Please call me at 16...'
//           }
//           time={formatTimestampToTime(item.lastMessage.createdAt.seconds)}
//         />
//       );
//     });
//   }, [userData]);

//   return (
//     <LinearContainer
//       children={
//         <RN.View style={styles.container}>
//           <HeaderContent
//             leftItem={<Images.Svg.btsRightLinear />}
//             rightItem={
//               <Images.Svg.searchButton width={39} height={39} onPress={() => navigation.navigate(APP_ROUTES.SEARCH_CONTACT as never)} />
//             }
//             title="Messenger"
//           />
//           <RN.View style={styles.content}>
//             {loading ? <LoadingScreen loading={loading} setLoading={() => { }} /> : userData.length == 0 ?
//               <RN.View style={styles.center}>
//                 <Text style={styles.text}>There are no dialogues</Text>
//               </RN.View>
//               :
//               <RN.ScrollView
//                 style={styles.flatList}
//                 showsHorizontalScrollIndicator={false}
//                 showsVerticalScrollIndicator={false}>
//                 {renderItems()}
//               </RN.ScrollView>
//             }
//             <RN.View style={{ position: 'absolute', display: 'flex', width: windowWidth - 12, bottom: 0, justifyContent: 'center', alignItems: 'center', }}>
//               <StartBtn
//                 elWidth={55}
//                 subWidth={75}
//                 icon={<Images.Svg.btnAddIcon />}
//                 primary
//                 onPress={() =>
//                   navigation.navigate(APP_ROUTES.SEARCH_CONTACT as never)
//                 }
//               />
//             </RN.View>
//           </RN.View>
//         </RN.View>
//       }
//     />
//   );
// };

// export default observer(MessengerScreen);

// const styles = RN.StyleSheet.create({
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     // alignItems: 'center',
//     paddingHorizontal: 5,
//   },
//   flatList: {
//     height: '100%',
//   },
//   content: {
//     display: 'flex',
//     // backgroundColor: 'red',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     // justifyContent: 'space-between',
//     height: windowHeight - windowHeight / 4
//   },
//   text: {
//     fontSize: 20,
//     color: 'white',
//   },
//   center: {
//     display: 'flex',
//     height: '90%',
//     width: windowWidth,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
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
            <LoadingScreen loading={loading} setLoading={() => {}} />
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
          <View style={styles.startBtnContainer}>
            <StartBtn
              elWidth={55}
              subWidth={75}
              icon={<Images.Svg.btnAddIcon />}
              primary
              onPress={() => navigation.navigate(APP_ROUTES.SEARCH_CONTACT as never)}
            />
          </View>
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
    marginBottom: 70, 
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
    bottom: 10, // Adjust as needed
    width: windowWidth - 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
