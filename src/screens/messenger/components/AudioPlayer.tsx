import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

const AudioPlayer = ({ audioPath }) => {
    const [sound, setSound] = useState(null);

    // Function to play audio
    const playSound = async () => {
        // Check if sound is already loaded
        if (sound) {
            await sound.play((success) => {
                if (success) {
                    console.log('Successfully finished playing');
                } else {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        } else {
            // Initialize sound and play
            const newSound = new Sound(audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                setSound(newSound);
                newSound.play((success) => {
                    if (success) {
                        console.log('Successfully finished playing');
                    } else {
                        console.log('Playback failed due to audio decoding errors');
                    }
                });
            });
        }
    };

    // Function to stop audio
    const stopSound = () => {
        if (sound) {
            sound.stop(() => {
                console.log('Stopped playback');
            });
        }
    };

    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={playSound}>
                <Text>Play Audio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopSound}>
                <Text>Stop Audio</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AudioPlayer;
