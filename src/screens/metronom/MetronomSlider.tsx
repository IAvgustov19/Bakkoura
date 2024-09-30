import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';
import { Dimensions } from 'react-native';
import { MetronomData } from '../../utils/metronom';

import {t} from '../../i18n'


const MetronomSlider = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    return (

        <LinearContainer
            children={
                <>
                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title={`${t("Metronom")}`}
                        rightItem={<Images.Svg.btsRightLinear />}
                    />
                    <CustomSwiper data={MetronomData} height={width / 1.5} width={'100%'} marginTop={50} />
                </>
            }
        />
    );
};


export default MetronomSlider;
