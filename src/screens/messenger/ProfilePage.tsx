import { ProfilerOnRenderCallback, useState } from "react";
import useRootStore from "../../hooks/useRootStore";
import LinearContainer from "../../components/LinearContainer/LinearContainer";
import RN from "../../components/RN";
import HeaderContent from "../../components/HeaderContent/HeaderContent";
import { Images } from "../../assets";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../utils/colors";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { windowHeight } from "../../utils/styles";
import ArrowLeftBack from "../../components/ArrowLeftBack/ArrowLeftBack";
import { MessageTypes } from "../../utils/messenger";
import { RootStackParamList } from "../../types/navigation";
import { APP_ROUTES } from "../../navigation/routes";

type RrofileScreenRouteProp = RouteProp<RootStackParamList, typeof APP_ROUTES.PROFILE_PAGE>;
const ProfilePage = () => {
    const route = useRoute<RrofileScreenRouteProp>();
    const navigation = useNavigation();
    const { lastSeen, name, avatar } = route.params;
    console.log(lastSeen, name, avatar);


    const {
        personalAreaData,
        updateLoading,
    } = useRootStore().personalAreaStore;
    const [avatarLoading, setAvatarLoading] = useState(true);
    const [active, setActive] = useState(0);

    const imageData = [
        { id: 1, uri: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce' }, // Unsplash example
        { id: 2, uri: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef' }, // Unsplash example
        { id: 3, uri: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664' }, // Unsplash example
        { id: 4, uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d' }, // Unsplash example
        { id: 5, uri: 'https://images.unsplash.com/photo-1485796826113-174aa68fd81b' }, // Unsplash example
        { id: 6, uri: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce' }, // Unsplash example
        { id: 7, uri: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef' }, // Unsplash example
        { id: 8, uri: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664' }, // Unsplash example
        { id: 9, uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d' }, // Unsplash example
        { id: 10, uri: 'https://images.unsplash.com/photo-1485796826113-174aa68fd81b' }, // Unsplash example
    ];


    const voiceData = [
        { id: 1, title: 'Audio Clip 1', subtitle: '17.11.23 - 09:12 - 1.2Mb - Tatyana Yanchuk' },
        { id: 2, title: 'Audio Clip 2', subtitle: '17.11.23 - 10:05 - 1.5Mb - John Doe' },
        { id: 3, title: 'Audio Clip 3', subtitle: '17.11.23 - 11:30 - 2.1Mb - Alice Johnson' },
        { id: 4, title: 'Audio Clip 4', subtitle: '17.11.23 - 12:45 - 1.8Mb - Michael Smith' },
        { id: 5, title: 'Audio Clip 5', subtitle: '17.11.23 - 13:20 - 2.3Mb - Sarah Lee' },
        { id: 6, title: 'Audio Clip 6', subtitle: '17.11.23 - 14:10 - 1.7Mb - David Brown' },
        { id: 7, title: 'Audio Clip 7', subtitle: '17.11.23 - 15:00 - 2.0Mb - Laura Wilson' },
        { id: 8, title: 'Audio Clip 8', subtitle: '17.11.23 - 15:50 - 1.4Mb - James Clark' },
        { id: 9, title: 'Audio Clip 9', subtitle: '17.11.23 - 16:35 - 1.6Mb - Emma Davis' },
        { id: 10, title: 'Audio Clip 10', subtitle: '17.11.23 - 17:15 - 1.9Mb - Daniel Martinez' },
    ];

    const fileData = [
        { id: 1, title: 'presentation.pdf', subtitle: '17.11.23 - 09:12 - 1.2Mb - Tatyana Yanchuk' },
        { id: 2, title: 'poster.psd', subtitle: '17.11.23 - 10:05 - 1.5Mb - John Doe' },
        { id: 3, title: 'presentation.pdf', subtitle: '17.11.23 - 11:30 - 2.1Mb - Alice Johnson' },
        { id: 4, title: 'businesscard.psd', subtitle: '17.11.23 - 12:45 - 1.8Mb - Michael Smith' },
        { id: 5, title: 'Book Antiqua.ttf', subtitle: '17.11.23 - 13:20 - 2.3Mb - Sarah Lee' },
        { id: 6, title: 'Banner.psd', subtitle: '17.11.23 - 14:10 - 1.7Mb - David Brown' },
    ];


    const linkData = [
        { id: 1, title: 'www.youtube.com/live/ehifuheiufinwidfiwufw', subtitle: '07:08 - YouTube.com' },
        { id: 2, title: 'www.youtube.com/live/ehifuheiufinwidfiwufw', subtitle: '07:08 - YouTube.com' },
        { id: 3, title: 'www.youtube.com/live/ehifuheiufinwidfiwufw', subtitle: '07:08 - YouTube.com' },
        { id: 4, title: 'www.youtube.com/live/ehifuheiufinwidfiwufw', subtitle: '07:08 - YouTube.com' },
        { id: 5, title: 'www.youtube.com/live/ehifuheiufinwidfiwufw', subtitle: '07:08 - YouTube.com' },
        { id: 6, title: 'www.youtube.com/live/ehifuheiufinwidfiwufw', subtitle: '07:08 - YouTube.com' },
        { id: 7, title: 'www.youtube.com/live/ehifuheiufinwidfiwufw', subtitle: '07:08 - YouTube.com' },
        { id: 8, title: 'www.youtube.com/live/ehifuheiufinwidfiwufw', subtitle: '07:08 - YouTube.com' },
    ];



    const renderGridImages = () => {
        return (
            <RN.ScrollView
                style={styles.gridScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContentContainer}
            >
                <RN.View style={styles.gridContainer}>
                    {imageData.map((item) => (
                        <RN.Image
                            key={item.id}
                            source={{ uri: item.uri }}
                            style={styles.gridImage}
                            resizeMode="cover"
                        />
                    ))}
                </RN.View>
            </RN.ScrollView>
        );
    };


    const renderVoices = () => {
        return (
            <RN.ScrollView
                style={styles.gridScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContentContainer}
            >
                <RN.View style={{ gap: 5 }}>
                    {voiceData.map((item) => (
                        <RN.View key={item.id} style={styles.voiceContainer}>
                            <Images.Svg.musicIcon width={40} height={40} />
                            <RN.View style={styles.voiceInfo}>
                                <RN.Text style={styles.voiceTitle}>{item.title}</RN.Text>
                                <RN.Text style={styles.voiceSubTitle}>{item.subtitle}</RN.Text>
                            </RN.View>
                        </RN.View>
                    ))}
                </RN.View>
            </RN.ScrollView>
        );
    };

    const renderLinks = () => {
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
                                <RN.Text style={[styles.voiceTitle, {color: '#007AFF'}]}>{item.title}</RN.Text>
                                <RN.Text style={styles.voiceSubTitle}>{item.subtitle}</RN.Text>
                            </RN.View>
                        </RN.View>
                    ))}
                </RN.View>
            </RN.ScrollView>
        );
    };


    const renderFiles = () => {
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
                                <RN.View style={{flexDirection: 'row', gap: 10}}>
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
                        {active === 0 && renderGridImages()}
                        {active === 1 && renderVoices()}
                        {active === 2 && renderLinks()}
                        {active === 3 && renderFiles()}
                    </RN.View>
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
        // justifyContent: 'space-between',
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
        paddingBottom: 160,
    },
    gridContentContainer: {
        paddingBottom: 180,
    },
    gridContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 5,
    },
    gridImage: {
        width: '32%',
        height: 160,
        marginBottom: 3,
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
    }
});
