import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import { useNavigation } from '@react-navigation/native';
import { windowHeight, windowWidth } from '../../../utils/styles';
import TextView from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import React, { useState } from 'react';
import { Images } from '../../../assets';
import RN from '../../../components/RN';
import { observer } from 'mobx-react-lite';
import { db } from '../../../config/firebase';
import firestore from '@react-native-firebase/firestore';
import reactNativeBcrypt from 'react-native-bcrypt';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useRootStore from '../../../hooks/useRootStore';

const LoginPassword = () => {
    const navigation = useNavigation();
    const { setNotAuthorized } = useRootStore().authStore;
    const [updateLoading, isUpdateLoading] = useState(false);


    const [userData, setUserData] = useState({ login: '', newPassword: '' });
    const [showHide, setShowHide] = useState({ showPassword: false, showRepeatPassword: true });



    const updateUser = async () => {
        try {
            const snapshot = await db
                .collection('users')
                .where('email', '==', userData.login)
                .get();

            const updatePromises = snapshot.docs.map(async (doc) => {
                await doc.ref.update({
                    password: reactNativeBcrypt.hashSync(userData.newPassword, 10),
                    updatedAt: new Date(),
                });

                const user = auth().currentUser;
                await user.updatePassword(userData.newPassword);

                await AsyncStorage.setItem('updatedAt', new Date().getTime().toString());
                await AsyncStorage.removeItem('token');
            });

            // Wait for all updates to complete
            await Promise.all(updatePromises);

            Alert.alert('User password updated');
            // setNotAuthorized();

        } catch (error) {
            Alert.alert('Error updating user: ' + error.message);
            console.log(error.message)
        }
    };



    return (
        <LinearContainer
            children={
                <RN.View style={styles.container}>
                    {/* <RN.View style={styles.bgContainer}>
                            <Images.Svg.bg style={styles.bg} />
                        </RN.View> */}
                    <HeaderContent
                        leftItem={
                            <RN.TouchableOpacity
                                style={styles.back}
                                onPress={() => navigation.goBack()}>
                                <Images.Svg.arrowLeft />
                                <TextView text="Back" />
                            </RN.TouchableOpacity>
                        }
                        title="Login & Password"
                    />
                    <RN.View style={styles.content}>
                        <RN.View style={styles.inputBox}>
                            <Input
                                placeholder="Login"
                                value={userData.login}
                                onChangeText={(text) =>
                                    setUserData((prevData) => ({
                                        ...prevData,
                                        login: text,
                                    }))
                                }
                            />
                        </RN.View>
                        <RN.View style={styles.inputBox}>
                            <Input
                                secureTextEntry={showHide.showPassword}
                                placeholder="New Password"
                                value={userData.newPassword}
                                onChangeText={(text) =>
                                    setUserData((prevData) => ({
                                        ...prevData,
                                        newPassword: text
                                    }))
                                }
                            />
                            <RN.TouchableOpacity
                                style={styles.deleteBox}
                                onPress={() =>
                                    setShowHide((prevData) => ({
                                        ...prevData,
                                        showPassword: !prevData.showPassword
                                    }))}
                            >
                                {showHide.showPassword ? <Images.Svg.hidePassword /> : <Images.Svg.showPassword />}

                            </RN.TouchableOpacity>
                        </RN.View>
                        <RN.View style={styles.addBtn}>
                            <StartBtn
                                text={'Ok'}
                                elWidth={55}
                                subWidth={70}
                                primary={true}
                                onPress={() => { navigation.goBack(); updateUser() }}
                            />
                        </RN.View>
                    </RN.View>
                </RN.View>
            }
        />
    );
};

export default observer(LoginPassword);

const styles = RN.StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    bgContainer: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
    },
    bg: {
        position: 'absolute',
    },
    scrollView: {},
    content: {
        gap: 15,
        paddingTop: 25,
        height: windowHeight - windowHeight / 6,
    },
    addBtn: {
        position: 'absolute',
        // alignItems: 'center',
        bottom: 20,
        width: '100%',
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    inputBox: {
        paddingHorizontal: 5,
    },
    deleteBox: {
        position: 'absolute',
        right: '7%',
        top: '30%',
    },
});
