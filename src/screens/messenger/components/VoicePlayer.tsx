import React, { useEffect, useRef } from "react";
import Sound from "react-native-sound";
import RN from "../../../components/RN";
import { Images } from "../../../assets";

interface SimpleAudioItemProps {
    id: string;
    soundSource: string;
    isPlaying: boolean;
    onPlayPress: (id: string) => void;
    title: string;
    subtitle: string;
}

const Voice: React.FC<SimpleAudioItemProps> = ({
    id,
    soundSource,
    isPlaying,
    onPlayPress,
    title,
    subtitle
}) => {
    const sound = useRef<Sound | null>(null);

    useEffect(() => {
        sound.current = new Sound(soundSource, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('Failed to load the sound', error.message, error.code);
                return;
            }
        });

        return () => {
            if (sound.current) {
                sound.current.release();
            }
        };
    }, [soundSource]);

    useEffect(() => {
        if (isPlaying) {
            sound.current?.play();
        } else {
            sound.current?.pause();
        }
    }, [isPlaying]);

    const handlePlayPause = () => {
        onPlayPress(id);
    };

    return (
        <RN.View key={id} style={styles.voiceContainer}>
            <RN.TouchableOpacity onPress={handlePlayPause}>
                {isPlaying ? (
                    <Images.Svg.play width={40} height={40} />
                ) : (
                    <Images.Svg.musicIcon width={40} height={40} />
                )}
            </RN.TouchableOpacity>
            <RN.View style={styles.voiceInfo}>
                <RN.Text style={styles.voiceTitle}>{title}</RN.Text>
                <RN.Text style={styles.voiceSubTitle}>{subtitle}</RN.Text>
            </RN.View>
        </RN.View>
    );
};

export default Voice;

const styles = RN.StyleSheet.create({
    voiceContainer: {
        width: '100%',
        gap: 14,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
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
