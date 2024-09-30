import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';
import { Dimensions } from 'react-native';
import { TogetherData } from '../../utils/timeTogether';

import {t} from '../../i18n'


const TimeTogetherSlider = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    return (

        <LinearContainer
            children={
                <>
                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title={`${t("Time Together")}`}
                        rightItem={<Images.Svg.btsRightLinear />}
                    />
                    <CustomSwiper data={TogetherData} height={width / 3} width={'100%'}/>
                </>
            }
        />
    );
};


export default TimeTogetherSlider;
