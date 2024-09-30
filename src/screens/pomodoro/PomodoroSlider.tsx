import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { OnBoardingData } from '../../utils/onBoardingData';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { APP_ROUTES } from '../../navigation/routes';
import { Images } from '../../assets';
import ButtonComp from '../../components/Button/Button';
import GiveImage from '../../components/GiveImage/GiveImage';
import RN from '../../components/RN';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import { PomodoroData } from '../../utils/pomodoro';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';

import {t} from '../../i18n'

const PomodoroSlider = () => {
    const { width } = Dimensions.get('window');
    const navigation = useNavigation();

    return (

        <LinearContainer
            children={
                <>
                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title={`${t("Pomodoro")}`}
                        rightItem={<Images.Svg.btsRightLinear />}
                    />
                    <CustomSwiper data={PomodoroData} height={width / 2.7} width={'100%'}/>
                </>
            }
        />
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    imageWrapper: {
        width: '90%',
        overflow: 'hidden',
        borderRadius: 20,
    },
    image: {
        width: '100%',
        height: width / 2.7,
        borderRadius: 25,
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop: 60,
    },
    dots: {
        backgroundColor: '#16212A',
    },
});

export default PomodoroSlider;
