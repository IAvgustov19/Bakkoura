import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Composer, InputToolbar } from 'react-native-gifted-chat';
import { launchImageLibrary } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Images } from '../../../assets';
import RN from '../../../components/RN';
import LinearGradient from 'react-native-linear-gradient';

const audioRecorderPlayer = new AudioRecorderPlayer();

const CustomComposer = (props) => {
    const { text, onTextChanged, composerHeight, onSend } = props;

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
                    image: response.assets[0].uri, // Include image URI in the message
                    fileName: response.assets[0].fileName, // Add fileName to the message
                    fileSize: (response.assets[0].fileSize / (1024 * 1024)).toFixed(1) + ' MB', // Add fileSize to the message
                };

                console.log('newMessagenewMessage', newMessage)
                props.onSend([newMessage]); // Send the new message to the GiftedChat component
            }
        });
    };
    // const handlePickImage = () => {
    //     launchImageLibrary({
    //         mediaType: 'photo',
    //     }, (response) => {
    //         if (response.didCancel || response.error) {
    //             console.log('User cancelled image picker or there was an error');
    //         } else {
    //             const newMessage = {
    //                 _id: Math.random().toString(36).substring(7),
    //                 createdAt: new Date(),
    //                 user: {
    //                     _id: 1,
    //                 },
    //                 image: response.assets[0].uri, // Include image URI in the message
    //             };
    //             props.onSend([newMessage]); // Send the new message to the GiftedChat component
    //         }
    //     });
    // };


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

    const handleSendText = () => {
        if (text.trim()) {
            const newMessage = {
                _id: Math.random().toString(36).substring(7),
                createdAt: new Date(),
                text,
                user: {
                    _id: 1,
                },
            };
            onSend([newMessage]);
            onTextChanged('');
        }
    };

    return (
        <View style={styles.composerContainer}>
        <TouchableOpacity onPress={handlePickImage} style={{paddingTop: 8}}>
            <Images.Svg.imageMessage />
        </TouchableOpacity>
        <View style={styles.composerWrapper}>
                <Composer
                    {...props}
                    text={text}
                    placeholder='Message'
                    placeholderTextColor='#636366'
                    onTextChanged={onTextChanged}
                    textInputStyle={styles.textInput}
                    composerHeight={composerHeight}
                />
                <TouchableOpacity onPress={handleSendText}>
                    <RN.Text style={{ color: 'white' }}>Send</RN.Text>
                </TouchableOpacity>
            </View>
            {/* <Composer
                {...props}
                text={text}
                placeholder='Message'
                placeholderTextColor='#636366'
                onTextChanged={onTextChanged}
                textInputStyle={styles.textInput}
                composerHeight={composerHeight}
            /> */}
             <TouchableOpacity onPress={handleRecordVoice} style={{paddingTop: 8}}>
                 <Images.Svg.voiceMessage />
             </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleSendText}>
                <RN.Text style={{color: 'white'}}>Send</RN.Text>
            </TouchableOpacity> */}
         </View>
    );
};

const styles = StyleSheet.create({
    composerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: '#1C1C1D',
        gap: 4,
        // backgroundColor: 'red',
        // borderColor: 'black',
    },
    composerWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputToolbar: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
      },
      toolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      textInput: {
        flex: 1,
        color: '#636366',
        borderColor: '#3A3A3C',
        backgroundColor:'#060606',
        borderWidth: 1,
        minHeight: 57,
        borderRadius: 18,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        textAlign: 'left',
      },
});

export default CustomComposer;
