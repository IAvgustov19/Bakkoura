import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import { useNavigation } from '@react-navigation/native';
import { windowHeight } from '../../../utils/styles';
import TextView from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import React, { useState } from 'react'
import { Images } from '../../../assets';
import RN from '../../../components/RN';

export default function LoginPassword() {
    const navigation = useNavigation();

    const [userData, setUserData] = useState({ login: '', password: '', repeatPassword: '' });
    return (
        <LinearContainer
            children={
                <RN.View style={styles.container}>
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
                    <RN.ScrollView style={styles.scrollView}>
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
                                    secureTextEntry={false}
                                    placeholder="Password"
                                    value={userData.password}
                                    onChangeText={(text) =>
                                        setUserData((prevData) => ({
                                            ...prevData,
                                            password: text
                                        }))
                                    }
                                />
                                <RN.TouchableOpacity
                                    style={styles.deleteBox}
                                    onPress={() => { }}
                                >
                                    <Images.Svg.showPassword />
                                </RN.TouchableOpacity>

                            </RN.View>
                            <RN.View style={styles.inputBox}>
                                <Input
                                    secureTextEntry
                                    placeholder="Repeat Password"
                                    value={userData.repeatPassword}
                                    onChangeText={(text) =>
                                        setUserData((prevData) => ({
                                            ...prevData,
                                            repeatPassword: text
                                        }))
                                    }
                                />
                                <RN.TouchableOpacity
                                    style={styles.deleteBox}
                                    onPress={() => { }}
                                >
                                    <Images.Svg.hidePassword />
                                </RN.TouchableOpacity>

                            </RN.View>
                            <RN.View style={styles.addBtn}>
                                <StartBtn
                                    onPress={() => console.log(userData)}
                                    primary={true}
                                    text={'Ok'}
                                    subWidth={70}
                                    elWidth={55}
                                />
                            </RN.View>
                        </RN.View>
                    </RN.ScrollView>
                </RN.View>
            }
        />
    )
}



const styles = RN.StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        height: '100%',
    },
    scrollView: {},
    content: {
        gap: 15,
        paddingTop: 25,
        height: windowHeight - windowHeight / 6,
    },
    addBtn: {
        position: 'absolute',
        alignItems: 'center',
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
