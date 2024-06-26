import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Composer } from 'react-native-gifted-chat';
import { launchImageLibrary } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Images } from '../../../assets';

const audioRecorderPlayer = new AudioRecorderPlayer();

const CustomComposer = (props) => {
    const { text, onTextChanged, composerHeight } = props;

    const handlePickImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
        }, (response) => {
            if (response.didCancel || response.error) {
                console.log('User cancelled image picker or there was an error');
            } else {
                const newMessage = {
                    _id: Math.random().toString(36).substring(7),
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                    },
                    image: response.assets[0].uri,
                };
                props.onSend([newMessage]);
            }
        });
    };

    const handleRecordVoice = async () => {
        if (props.recording) {
            const result = await audioRecorderPlayer.stopRecorder();
            props.setRecording(false);
            props.setAudioPath(result);
            const newMessage = {
                _id: Math.random().toString(36).substring(7),
                createdAt: new Date(),
                user: {
                    _id: 1,
                },
                audio: result,
            };
            props.onSend([newMessage]);
        } else {
            const result = await audioRecorderPlayer.startRecorder();
            props.setRecording(true);
            props.setAudioPath(result);
        }
    };

    return (
        <View style={styles.composerContainer}>
            <TouchableOpacity onPress={handlePickImage}>
                <Images.Svg.imageMessage />
            </TouchableOpacity>
            {/* <Composer
                {...props}
                text={text}
                onTextChanged={onTextChanged}
                textInputStyle={styles.textInput}
                composerHeight={composerHeight}
            /> */}
             <TouchableOpacity onPress={handleRecordVoice}>
                 <Images.Svg.voiceMessage />
             </TouchableOpacity>
         </View>
    );
};

const styles = StyleSheet.create({
    composerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        // backgroundColor: 'black',
        // borderColor: 'black',
    },
    textInput: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
    },
});

export default CustomComposer;
