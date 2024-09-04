import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';
import { Dimensions } from 'react-native';
import { BakkouraData } from '../../utils/bakkoura';


const BakkouraSlider = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    return (

        <LinearContainer
            children={
                <>

                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title="Bakkoura Watch"
                        rightItem={<Images.Svg.btsRightLinear />}
                    />
                    <CustomSwiper data={BakkouraData} height={width / 2.4} width={'100%'} marginTop={60}/>
                </>
            }
        />
    );
};


export default BakkouraSlider;
