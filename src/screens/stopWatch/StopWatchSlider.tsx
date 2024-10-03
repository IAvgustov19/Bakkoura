import React from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import { PomodoroData } from '../../utils/pomodoro';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';
import { StopWatchData } from '../../utils/stopWatch';

import {t} from '../../i18n'

const StopWatchSlider = () => {
    const { width } = Dimensions.get('window');
    const navigation = useNavigation();

    return (

        <LinearContainer
            children={
                <>
                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title={t("Stopwatch")}
                        rightItem={<Images.Svg.btsRightLinear />}
                    />
                    <CustomSwiper data={StopWatchData} height={width / 1.6} width={'100%'} marginTop={40} />
                </>
            }
        />
    );
};

export default StopWatchSlider;
