import {useIsFocused, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import Cancel from '../../components/Cancel/Cancel';
import {APP_ROUTES} from '../../navigation/routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigation';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  APP_ROUTES.DIALOG_SCREEN
>;

const SearchContact = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const {themeState} = useRootStore().personalAreaStore;
  const {
    getAllUsersWithLastMessages,
    allUsers,
    getAllUsers,
    filterUsers,
    searchedUsers,
    loading, // Assuming loading is a part of MobX store
  } = useRootStore().messangerStore;

  const [active, setActive] = useState(0);
  const [search, setSearch] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  console.log('searchedUserssearchedUsers', searchedUsers);

  useEffect(() => {
    if (isFocused) {
      getAllUsers();
    }
  }, [isFocused, getAllUsers]);

  useEffect(() => {
    if (search !== '') {
      filterUsers(search);
      setSearchPerformed(true);
    } else {
      filterUsers(search);
      setSearchPerformed(false);
    }
  }, [search, navigation]);

  // const renderTypes = () => {
  //     return MessageTypes.map((item, index) => (
  //         <RN.Text
  //             key={item.id}
  //             style={[styles.typeText, active === index && { color: '#007AFF' }]}
  //             onPress={() => setActive(index)}
  //         >
  //             {item.title}
  //         </RN.Text>
  //     ));
  // };

  const renderUsers = useCallback(() => {
    // if (loading) {
    //     return <ActivityIndicator size="large" color={COLORS.white} />;
    // }

    if (searchedUsers.length === 0 && searchPerformed) {
      return <ListEmptyComp title="No user found" />;
    }

    return searchedUsers.map((item, index) => (
      <RN.TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() =>
          navigation.navigate(APP_ROUTES.DIALOG_SCREEN, {
            id: item.id,
            name: item.name,
            avatar: item.avatar,
          })
        }>
        <RN.View style={styles.imageContainer}>
          <themeState.profileBackIcon width={54} height={54} />
          <RN.Image
            source={{uri: item.avatar || null}}
            style={styles.profileImg}
          />
        </RN.View>
        <RN.Text style={[styles.name, {color: themeState.title}]}>
          {item.name}
        </RN.Text>
      </RN.TouchableOpacity>
    ));
  }, [searchedUsers, loading, navigation, search]);

  return (
    <LinearContainer>
      <RN.View style={styles.container}>
        <HeaderContent
          title="Messenger"
          rightItem={
            <Cancel
              onClose={() => navigation.navigate(APP_ROUTES.MESSENGER as never)}
            />
          }
        />
        <RN.View style={styles.content}>
          <Input
            value={search}
            onChangeText={text => setSearch(text)}
            placeholder="Enter a name"
            icon={<Images.Svg.searchIcon />}
          />
        </RN.View>
        {/* <RN.View style={styles.types}>
                    {renderTypes()}
                </RN.View> */}
        <RN.View style={{height: '80%'}}>
          <RN.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.userList}>
            {renderUsers()}
          </RN.ScrollView>
        </RN.View>
      </RN.View>
    </LinearContainer>
  );
};

export default observer(SearchContact);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingBottom: 40,
  },
  content: {},
  userList: {
    gap: 23,
    width: '100%',
    borderRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 4,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
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
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'RedHatDisplay-Bold',
  },
  types: {
    width: '100%',
    display: 'flex',
    paddingHorizontal: 10,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeText: {
    fontSize: 14,
    color: '#AAAAAA',
  },
});
