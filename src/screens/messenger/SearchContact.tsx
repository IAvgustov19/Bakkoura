// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { observer } from 'mobx-react-lite';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Images } from '../../assets';
// import HeaderContent from '../../components/HeaderContent/HeaderContent';
// import Input from '../../components/Input/Input';
// import Line from '../../components/Line/Line';
// import LinearContainer from '../../components/LinearContainer/LinearContainer';
// import RN from '../../components/RN';
// import useRootStore from '../../hooks/useRootStore';
// import { COLORS } from '../../utils/colors';
// import Cancel from '../../components/Cancel/Cancel';
// import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';
// import { MessageTypes } from '../../utils/messenger';
// import { APP_ROUTES } from '../../navigation/routes';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../types/navigation';


// type NavigationProp = StackNavigationProp<RootStackParamList, APP_ROUTES.DIALOG_SCREEN>;

// const SearchContact = () => {
//     const navigation = useNavigation<NavigationProp>();
//     const isFocused = useIsFocused();
//     const {
//         getAllUsers,
//         allUsers,
//         userData,
//         getAllUsersWithLastMessages,
//         filterUsers,
//     } = useRootStore().messangerStore;

//     const [active, setActive] = useState(0);
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         // getAllUsers();
//         getAllUsersWithLastMessages();
//     }, [isFocused]);

//     useEffect(() => {
//         filterUsers(search);
//     }, [search])


//     useEffect(() => {
//         console.log('userData', userData)
//     }, [])

//     const renderTypes = () => {
//         return MessageTypes.map((item, index) => {
//             return (
//                 <RN.Text
//                     key={item.id}
//                     style={[styles.typeText, active === index && { color: '#007AFF' }]}
//                     onPress={() => setActive(index)}
//                 >
//                     {item.title}
//                 </RN.Text>
//             );
//         });
//     }

//     const renderUsers = useCallback(() => {
//         {
//             return userData.length > 0 ? (
//                 userData.map((item, index) => {
//                     return (
//                         <RN.TouchableOpacity style={styles.item} key={index}
//                             onPress={() => navigation.navigate(APP_ROUTES.DIALOG_SCREEN, {
//                                 id: item.id,
//                                 name: item.name,
//                                 avatar: item.avatar
//                             })}
//                         >
//                             <RN.View style={styles.imageContainer}>
//                                 <Images.Svg.profileBackground width={54} height={54} />
//                                 <RN.Image
//                                     source={{ uri: item.avatar || null }}
//                                     style={styles.profileImg}
//                                 />
//                             </RN.View>
//                             <RN.Text style={styles.name}>{item.name}</RN.Text>
//                         </RN.TouchableOpacity>
//                     );
//                 })
//             ) : (
//                 <ListEmptyComp title="No user has found" />
//             );
//         }
//     }, [userData]);



//     return (
//         <LinearContainer
//             children={
//                 <RN.View style={styles.container}>
//                     <HeaderContent
//                         title="Messenger"
//                         rightItem={<Cancel onClose={() => navigation.goBack()} />}
//                     />
//                     <RN.View style={styles.content}>
//                         <Input
//                             value={search}
//                             onChangeText={(text) => setSearch(text)}
//                             placeholder="Enter a name"
//                             icon={<Images.Svg.searchIcon />}
//                         />
//                     </RN.View>
//                     <RN.View style={styles.types}>
//                         {renderTypes()}
//                     </RN.View>
//                     <RN.ScrollView horizontal={true} contentContainerStyle={styles.userList} showsHorizontalScrollIndicator={false}>
//                         {renderUsers()}
//                     </RN.ScrollView>
//                 </RN.View>
//             }
//         />
//     );
// };

// export default observer(SearchContact);

// const styles = RN.StyleSheet.create({
//     container: {
//         paddingHorizontal: 5,
//         paddingBottom: 30,
//     },
//     content: {},
//     userList: {
//         gap: 23,
//         height: '80%',
//         marginTop: 20,
//         borderRadius: 5,
//         paddingVertical: 5,
//         paddingHorizontal: 4,
//         display: 'flex',
//         flexDirection: 'row',
//     },
//     countryBox: {
//         paddingHorizontal: 10,
//     },
//     country: {
//         color: COLORS.white,
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 20,
//     },
//     item: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     imageContainer: {
//         position: 'relative',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     profileImg: {
//         width: 47,
//         height: 47,
//         borderRadius: 35,
//         position: 'absolute',
//         zIndex: 2,
//     },
//     name: {
//         fontSize: 12,
//         color: '#FFFFFF',
//         fontFamily: 'RedHatDisplay-Bold',
//     },
//     types: {
//         gap: 25,
//         width: '100%',
//         display: 'flex',
//         paddingHorizontal: 4,
//         marginVertical: 15,
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     typeText: {
//         fontSize: 14,
//         color: '#AAAAAA',
//     }
// });
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import { COLORS } from '../../utils/colors';
import Cancel from '../../components/Cancel/Cancel';
import { MessageTypes } from '../../utils/messenger';
import { APP_ROUTES } from '../../navigation/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';

type NavigationProp = StackNavigationProp<RootStackParamList, APP_ROUTES.DIALOG_SCREEN>;

const SearchContact = () => {
    const navigation = useNavigation<NavigationProp>();
    const isFocused = useIsFocused();
    const {
        getAllUsersWithLastMessages,
        allUsers,
        getAllUsers,
        filterUsers,
        loading // Assuming loading is a part of MobX store
    } = useRootStore().messangerStore;

    const [active, setActive] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (isFocused) {
            getAllUsers(); // Fetch users
        }
    }, [isFocused, getAllUsers]);

    useEffect(() => {
        filterUsers(search);
    }, [search, filterUsers]);

    const renderTypes = () => {
        return MessageTypes.map((item, index) => (
            <RN.Text
                key={item.id}
                style={[styles.typeText, active === index && { color: '#007AFF' }]}
                onPress={() => setActive(index)}
            >
                {item.title}
            </RN.Text>
        ));
    };

    const renderUsers = useCallback(() => {
        if (loading) {
            return <ActivityIndicator size="large" color={COLORS.white} />;
        }

        if (allUsers.length === 0) {
            return <ListEmptyComp title="No user found" />;
        }

        return allUsers.map((item, index) => (
            <RN.TouchableOpacity
                style={styles.item}
                key={index}
                onPress={() => navigation.navigate(APP_ROUTES.DIALOG_SCREEN, {
                    id: item.id,
                    name: item.name,
                    avatar: item.avatar
                })}
            >
                <RN.View style={styles.imageContainer}>
                    <Images.Svg.profileBackground width={54} height={54} />
                    <RN.Image
                        source={{ uri: item.avatar || null }}
                        style={styles.profileImg}
                    />
                </RN.View>
                <RN.Text style={styles.name}>{item.name}</RN.Text>
            </RN.TouchableOpacity>
        ));
    }, [allUsers, loading, navigation]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        console.log('eventeventeventeventeventeventevent', event)
        const isEndReached = contentOffset.x + layoutMeasurement.width >= contentSize.width - 20;

        console.log("Scroll event:", {
            contentOffset: contentOffset.x,
            contentSize: contentSize.width,
            layoutMeasurement: layoutMeasurement.width,
            isEndReached,
        });

        if (isEndReached && !loading) {
            console.log("End of scroll reached. Fetching more users...");
            getAllUsers(); // Fetch more users when end is reached
        }
    };

    return (
        <LinearContainer>
            <RN.View style={styles.container}>
                <HeaderContent
                    title="Messenger"
                    rightItem={<Cancel onClose={() => navigation.goBack()} />}
                />
                <RN.View style={styles.content}>
                    <Input
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        placeholder="Enter a name"
                        icon={<Images.Svg.searchIcon />}
                    />
                </RN.View>
                <RN.View style={styles.types}>
                    {renderTypes()}
                </RN.View>
                <RN.ScrollView
                    horizontal={true}
                    contentContainerStyle={styles.userList}
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {renderUsers()}
                </RN.ScrollView>
            </RN.View>
        </LinearContainer>
    );
};

export default observer(SearchContact);

const styles = RN.StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingBottom: 30,
    },
    content: {},
    userList: {
        gap: 23,
        height: '80%',
        marginTop: 20,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 4,
        display: 'flex',
        flexDirection: 'row',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImg: {
        width: 47,
        height: 47,
        borderRadius: 35,
        position: 'absolute',
        zIndex: 2,
    },
    name: {
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'RedHatDisplay-Bold',
    },
    types: {
        gap: 25,
        width: '100%',
        display: 'flex',
        paddingHorizontal: 4,
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    typeText: {
        fontSize: 14,
        color: '#AAAAAA',
    }
});
