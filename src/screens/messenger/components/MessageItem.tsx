import React from 'react';
import RN from '../../../components/RN';
import { Images } from '../../../assets/index';
import { COLORS } from '../../../utils/colors';
import { observer } from 'mobx-react-lite';

type Props = {
    name?: string;
    day?: string;
    description?: string;
    time?: string;
    avatar?: any,
    onNavigate?: () => void;
};

const MessageItem: React.FC<Props> = ({
    name,
    day,
    time,
    description,
    avatar,
    onNavigate
}) => {
    return (
        <RN.Pressable onPress={onNavigate} style={styles.container}>
            <RN.View style={styles.itemContent}>
                <RN.View style={styles.leftBox}>
                    <RN.View style={styles.imageContainer}>
                        <Images.Svg.profileBackground width={54} height={54} />
                        {
                            avatar ? <RN.Image
                                source={{ uri: avatar || null }}
                                style={styles.profileImg}
                            /> :
                                <Images.Svg.userIcon style={styles.profileImg} />
                        }

                    </RN.View>
                    <RN.View style={styles.timerInfo}>
                        <RN.Text style={styles.whiteText}>
                            {name.length > 25 ? name.slice(0, 22) + '...' : name}
                        </RN.Text>
                        <RN.Text style={styles.darkGreyText}>{description}</RN.Text>
                    </RN.View>
                </RN.View>
                <RN.View style={styles.rightBox}>
                    <RN.Text
                        style={[
                            styles.whiteText,
                        ]}>
                        {time}
                    </RN.Text>
                    <RN.View style={styles.messagesCount}>
                        <RN.Text style={styles.messageText}>20</RN.Text>
                    </RN.View>
                </RN.View>
            </RN.View>
        </RN.Pressable>
    );
};

export default MessageItem;

const styles = RN.StyleSheet.create({
    container: {
        backgroundColor: COLORS.black,
        borderRadius: 5,
        marginBottom: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#0E1114',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    leftBox: {
        flexDirection: 'row',
        gap: 10,
    },
    timerInfo: {
        gap: 5,
    },
    rightBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    darkGreyText: {
        color: '#ABABAB',
        fontSize: 14,
        fontFamily: 'RedHatDisplay-Regular',
    },
    whiteText: {
        color: COLORS.white,
        fontSize: 16,
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
    messagesCount: {
        minHeight: 22,
        minWidth: 22,
        borderRadius: 11,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
    },
    messageText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'RedHatDisplay-Regular',
    }
});
