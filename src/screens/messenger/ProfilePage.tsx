import LinearContainer from "../../components/LinearContainer/LinearContainer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import ArrowLeftBack from "../../components/ArrowLeftBack/ArrowLeftBack";
import { ProfilerOnRenderCallback, useEffect, useState } from "react";
import { RootStackParamList } from "../../types/navigation";
import { ActivityIndicator, Linking, Modal } from "react-native";
import { fileData, MessageTypes } from "../../utils/messenger";
import { APP_ROUTES } from "../../navigation/routes";
import useRootStore from "../../hooks/useRootStore";
import { windowHeight } from "../../utils/styles";
import EmptyState from "./components/EmptyState";
import Voice from "./components/VoicePlayer";
import { COLORS } from "../../utils/colors";
import { observer } from "mobx-react-lite";
import { db } from "../../config/firebase";
import { Images } from "../../assets";
import RN from "../../components/RN";
import { formatDate } from "../../helper/formatTimeMessage";
import { fetchMessagesByRoomId, getUserNameById } from "../../services/firestoreService";

type RrofileScreenRouteProp = RouteProp<RootStackParamList, typeof APP_ROUTES.PROFILE_PAGE>;
const ProfilePage = () => {
    const route = useRoute<RrofileScreenRouteProp>();
    const navigation = useNavigation();
    const { lastSeen, name, avatar, roomId } = route.params;
    const [messages, setMessages] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [voiceData, setVoiceData] = useState<any[]>([]);
    const [links, setLinks] = useState<any[]>([]);
    const [linkData, setLinkData] = useState<any[]>([]);
    const [avatarLoading, setAvatarLoading] = useState(true);
    const [active, setActive] = useState(0);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const {
        personalAreaData,
        updateLoading,
    } = useRootStore().personalAreaStore;

    const handleImageClick = (uri: string) => {
        setSelectedImage(uri);
        setIsModalVisible(true);
    };

    useEffect(() => {
        if (roomId) {
            fetchMessagesByRoomId(roomId).then(data => {
                setMessages(data);
            });
        }
    }, [roomId]);

    useEffect(() => {
        setLinks(messages.filter(message => message.type === 'text'));
    }, [messages]);

    useEffect(() => {
        const fetchLinkData = async () => {
            const urlRegex = /(https?:\/\/[^\s]+)/g;

            const getDomainFromUrl = (url) => {
                // More comprehensive domain extraction
                const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/\s]+)/i;
                const match = url.match(domainRegex);
                if (match && match[1]) {
                    const domainParts = match[1].split('.').slice(-2).join('.');
                    return domainParts;
                }
                return 'Unknown';
            };

            console.log('Fetching messages for link data:', links);

            try {
                const data = await Promise.all(links
                    .filter(message => typeof message.text === 'string' && urlRegex.test(message.text))
                    .map(async (message) => {
                        const urls = message.text.match(urlRegex) || [];
                        if (urls.length === 0) {
                            console.log('No URLs found in message:', message.text);
                            return null;
                        }
                        const url = urls[0];
                        const domain = getDomainFromUrl(url);

                        console.log('Extracted URL:', url);
                        console.log('Extracted Domain:', domain);

                        return {
                            id: message._id,
                            title: url,
                            subtitle: `${formatDate(message.createdAt)}, ${domain}`,
                            uri: url,
                        };
                    })
                );

                const filteredData = data.filter(item => item !== null);

                console.log('Processed link data:', filteredData);
                setLinkData(filteredData);
            } catch (error) {
                console.error('Error fetching link data:', error);
            }
        };

        fetchLinkData();
    }, [links]);

    const voiceMessage = messages.filter(message => message.type === 'audio');
    useEffect(() => {
        const fetchVoiceData = async () => {
            const data = await Promise.all(voiceMessage.map(async (message, idx) => {
                const userName = await getUserNameById(message.senderId);
                return {
                    id: message._id,
                    title: `Audio Clip ${idx + 1}`,
                    subtitle: `${userName} ${formatDate(message.createdAt)}`,
                    uri: message.audio,
                };
            }));

            setVoiceData(data);
        };

        fetchVoiceData();
    }, [voiceData]);

    const imageMessages = messages.filter(message => message.type === 'image');

    const imageData = imageMessages
        .flatMap(message =>
            message.image.map((uri, index) => ({
                id: `${message._id}-${index}`,
                uri
            }))
        );

    const renderGridImages = () => {
        if (imageData.length === 0) {
            return (
                <EmptyState title="No images" />
            );
        }
        return (
            <RN.ScrollView
                style={styles.gridScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContentContainer}
            >
                <RN.View style={styles.gridContainer}>
                    {imageData.map((item) => (
                        <RN.TouchableOpacity
                            key={item.id}
                            onPress={() => handleImageClick(item.uri)}
                            style={styles.imageWrapper}
                        >
                            <RN.Image
                                source={{ uri: item?.uri }}
                                style={styles.gridImage}
                                resizeMode="cover"
                                onError={(e) => console.log('Image loading error:', e)}
                            />
                        </RN.TouchableOpacity>
                    ))}
                </RN.View>
            </RN.ScrollView>
        );
    };
    const onPlayPress = (id: string) => {
        if (playingId === id) {
            setPlayingId(null);
        } else {
            setPlayingId(id);
        }
    };
    const renderVoices = () => {
        if (voiceData.length === 0) {
            return (
                <EmptyState title="No audios" />
            );
        }
        return (
            <RN.FlatList
                data={voiceData}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridScroll}
                renderItem={({ item }) => (
                    <Voice
                        id={item.id}
                        soundSource={item.uri}
                        isPlaying={playingId === item.id}
                        onPlayPress={onPlayPress}
                        title={item.title}
                        subtitle={item.subtitle} />
                )}
            />
        );
    };
    const renderLinks = () => {
        if (linkData.length === 0) {
            return (
                <EmptyState title="No links" />
            );
        }
        return (
            <RN.ScrollView
                style={styles.gridScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContentContainer}
            >
                <RN.View style={{ gap: 5 }}>
                    {linkData.map((item) => (
                        <RN.View key={item.id} style={styles.voiceContainer}>
                            <Images.Svg.linkIcon width={40} height={40} />
                            <RN.View style={styles.voiceInfo}>
                                <RN.TouchableOpacity onPress={() => Linking.openURL(item.uri)}>
                                    <RN.Text style={[styles.voiceTitle, { color: '#007AFF' }]}>{item.title}</RN.Text>
                                </RN.TouchableOpacity>
                                <RN.Text style={styles.voiceSubTitle}>{item.subtitle}</RN.Text>
                            </RN.View>
                        </RN.View>
                    ))}
                </RN.View>
            </RN.ScrollView>
        );
    };

    const renderFiles = () => {
        if (fileData.length === 0) {
            return (
                <EmptyState title="No files" />
            );
        }
        return (
            <RN.ScrollView
                style={styles.gridScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContentContainer}
            >
                <RN.View style={{ gap: 5 }}>
                    {fileData.map((item) => (
                        <RN.View key={item.id} style={styles.voiceContainer}>
                            <Images.Svg.fileIconMedia width={40} height={40} />
                            <RN.View style={styles.voiceInfo}>
                                <RN.View style={{ flexDirection: 'row', gap: 10 }}>
                                    <RN.Text style={styles.voiceTitle}>{item.title}</RN.Text>
                                    <Images.Svg.blueArrow width={16} height={12} />
                                </RN.View>
                                <RN.Text style={styles.voiceSubTitle}>{item.subtitle}</RN.Text>
                            </RN.View>
                        </RN.View>
                    ))}
                </RN.View>
            </RN.ScrollView>
        );
    };

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

    const musicData = [];

    const renderMusic = () => {
        if (musicData.length === 0) {
            return (
                <EmptyState title="No music" />
            );
        }
        return (
            <RN.ScrollView
                style={styles.gridScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContentContainer}
            >
                <RN.View style={{ gap: 5 }}>
                    {musicData.map((item) => (
                        <RN.View key={item.id} style={styles.voiceContainer}>
                            <Images.Svg.fileIconMedia width={40} height={40} />
                            <RN.View style={styles.voiceInfo}>
                                <RN.View style={{ flexDirection: 'row', gap: 10 }}>
                                    <RN.Text style={styles.voiceTitle}>{item.title}</RN.Text>
                                    <Images.Svg.blueArrow width={16} height={12} />
                                </RN.View>
                                <RN.Text style={styles.voiceSubTitle}>{item.subtitle}</RN.Text>
                            </RN.View>
                        </RN.View>
                    ))}
                </RN.View>
            </RN.ScrollView>
        );
    };

    const renderContent = () => {
        const renderFunctions = [
            renderGridImages,
            renderVoices,
            renderLinks,
            renderFiles,
            renderMusic,
        ];

        return renderFunctions[active]();
    };
    return (
        <LinearContainer
            children={
                <RN.View style={styles.container}>
                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                    />
                    <RN.View
                        style={{ alignItems: 'center' }}>
                        {avatar ? (
                            <RN.View style={styles.imageContainer}>
                                <Images.Svg.profileBackgroundBig width={137} height={137} />
                                <RN.Image
                                    source={{ uri: avatar }}
                                    style={styles.profileImg}
                                    onLoadEnd={() => setAvatarLoading(false)}
                                />
                                {avatarLoading || updateLoading ? (
                                    <RN.View style={styles.loadingBox}>
                                        <ActivityIndicator
                                            color={COLORS.black}
                                            style={{ marginTop: 3 }}
                                        />
                                    </RN.View>
                                ) : null}
                            </RN.View>
                        ) : (
                            <Images.Svg.userIcon width={115} height={116} />
                        )}
                    </RN.View>
                    <RN.View style={styles.profileInfo}>
                        <RN.Text style={styles.name}>{name}</RN.Text>
                        <RN.Text style={styles.lastSeen}>Last seen</RN.Text>
                        <RN.Text style={styles.lastSeen}>{lastSeen ? lastSeen : 'Yesterday, 07:04'}</RN.Text>
                    </RN.View>
                    <RN.Text style={styles.name}>{personalAreaData?.phone ? personalAreaData.phone : ''}</RN.Text>
                    <RN.View style={styles.content}>
                        <RN.View style={styles.types}>
                            {renderTypes()}
                        </RN.View>
                        {renderContent()}
                    </RN.View>
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
                </RN.View>
            }
        />
    );
};

export default observer(ProfilePage);
const styles = RN.StyleSheet.create({
    container: {
        height: windowHeight,
        position: 'relative',
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    bg: {
        position: 'absolute',
    },
    cancelBtn: {
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    cancelTxt: {
        color: COLORS.grey,
        fontSize: 16,
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingBox: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    profileImg: {
        width: 115,
        height: 116,
        borderRadius: 100,
        position: 'absolute',
        zIndex: 2,
    },
    chooseBtn: {
        paddingVertical: 11,
        alignItems: 'center',
    },
    chooseText: {
        fontSize: 14,
        color: COLORS.grey,
    },
    scrollView: {},
    content: {
        height: windowHeight - windowHeight / 6,
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
    name: {
        fontSize: 18,
        paddingBottom: 4,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'RedHatDisplay-Bold',
    },
    lastSeen: {
        fontSize: 14,
        color: '#979DA2',
        textAlign: 'center',
        fontFamily: 'RedHatDisplay-Bold',
    },
    profileInfo: {
        paddingTop: 17,
        paddingBottom: 20,
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
        paddingBottom: 200,
    },
    gridContentContainer: {
        paddingBottom: 250,
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
});
