import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';
import { AlarmData } from '../../utils/alarm';
import { Dimensions } from 'react-native';


const AlarmSlider = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    return (

        <LinearContainer
            children={
                <>
                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title="Alarm clock"
                        rightItem={<Images.Svg.btsRightLinear />}
                    />
                    <CustomSwiper data={AlarmData} height={width / 2.2} width={'100%'}/>
                </>
            }
        />
    );
};


export default AlarmSlider;
