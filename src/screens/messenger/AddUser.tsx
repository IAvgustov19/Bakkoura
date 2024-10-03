import { useIsFocused, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import Cancel from '../../components/Cancel/Cancel';
import { APP_ROUTES } from '../../navigation/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import ListEmptyComp from '../../components/ListEmptyComp/ListEmtyComp';
import { fileData, SearchMessageTypes } from '../../utils/messenger';
import auth from '@react-native-firebase/auth';
import { fetchllMessages, getUserNameById } from '../../services/firestoreService';
import EmptyState from './components/EmptyState';
import { windowHeight } from '../../utils/styles';
import { t } from '../../i18n';
import { Modal } from 'react-native';

type NavigationProp = StackNavigationProp<RootStackParamList, APP_ROUTES.DIALOG_SCREEN>;

const AddUser = () => {
    const navigation = useNavigation<NavigationProp>();
    const isFocused = useIsFocused();
    const currentUserId = auth().currentUser.uid;
    const [activeType, setActiveType] = useState(SearchMessageTypes[0]);
    const {
        getAllUsersWithLastMessages,
        allUsers,
        getAllUsers,
        filterUsers,
        searchedUsers,
        loading // Assuming loading is a part of MobX store
    } = useRootStore().messangerStore;

    const [active, setActive] = useState(0);
    const [search, setSearch] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [voiceData, setVoiceData] = useState<any[]>([]);
    const [links, setLinks] = useState<any[]>([]);
    const [linkData, setLinkData] = useState<any[]>([]);
    const [avatarLoading, setAvatarLoading] = useState(true);
    const [playingId, setPlayingId] = useState<string | null>(null);


    const handleImageClick = (uri: string) => {
        setSelectedImage(uri);
        setIsModalVisible(true);
    };

    useEffect(() => {
        const fetch = async () => {
            await fetchllMessages(currentUserId).then(data => {
                setMessages(data);
            });
        }
        fetch();

    }, [currentUserId]);

    const imageMessages = messages.filter(message => message.type === 'image');

    // console.log('imageMessagesimageMessagesimageMessagesimageMessages', imageMessages);


    const imageData = imageMessages.flatMap(message => {
        return message.image.map((uri, index) => ({
            id: `${message._id}-${index}`,
            uri,
            fileName: message?.fileName
        }));
    });

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

    const renderUsers = useCallback(() => {
        // if (loading) {
        //     return <ActivityIndicator size="large" color={COLORS.white} />;
        // }

        if (searchedUsers.length === 0 && searchPerformed) {
            return <ListEmptyComp title="No user found" />;
        }
        return (
            <RN.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.userList}
            >
                {searchedUsers.map((item, index) => (
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
                ))}
            </RN.ScrollView>
        );

    }, [searchedUsers, loading, navigation, search]);


    const renderContent = () => {
        const renderFunctions = [
            renderUsers
        ];

        return renderFunctions[active]();
    };


    return (
        <LinearContainer>
            <RN.View style={styles.container}>
                <HeaderContent
                    title={`${t("Messenger")}`}
                    rightItem={<Cancel onClose={() => navigation.navigate(APP_ROUTES.MESSENGER as never)} />}
                />
                <RN.View style={styles.content}>
                    <Input
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        placeholder={`${t("Enter a name")}`}
                        icon={<Images.Svg.searchIcon />}
                    />
                </RN.View>
                <RN.View style={{ height: '80%' }}>
                    {/* <RN.ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.userList}
                    > */}
                    {renderContent()}
                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setIsModalVisible(false)}
                    >
                        <RN.TouchableOpacity
                            style={styles.modalBackdrop}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <RN.View style={styles.modalContent}>
                                {selectedImage && (
                                    <RN.Image
                                        source={{ uri: selectedImage }}
                                        style={styles.modalImage}
                                        resizeMode="contain"
                                    />
                                )}
                            </RN.View>
                        </RN.TouchableOpacity>
                    </Modal>
                    {/* </RN.ScrollView> */}
                </RN.View>
            </RN.View>
        </LinearContainer>
    );
};

export default observer(AddUser);

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
        paddingBottom: 100,
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
        paddingTop: 20,
        display: 'flex',
        marginVertical: 15,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-around',
    },
    typeText: {
        fontSize: 14,
        color: '#AAAAAA',
    },
    gridScroll: {
        // paddingBottom: 200,
    },
    gridContentContainer: {
        // paddingBottom: 250,
    },
    gridContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 5,
    },
    imageWrapper: {
        width: '32%',
    },
    gridImage: {
        width: '100%',
        aspectRatio: 1,
    },
    modalBackdrop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        width: '90%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '100%',
        height: '100%',
    },
    voiceContainer: {
        width: '100%',
        gap: 14,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
    },
    voiceItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    voiceIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    voiceTitle: {
        fontSize: 14,
        color: '#EADEDE',
        fontFamily: 'RedHatDisplay-Regular',
    },
    voiceSubTitle: {
        fontSize: 12,
        color: '#AAAAAA',
        fontFamily: 'RedHatDisplay-Regular',
    },

    voiceInfo: {
        gap: 3
    },
});
