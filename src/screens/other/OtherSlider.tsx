import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';
import { Dimensions } from 'react-native';
import { WorldData } from '../../utils/worldTime';
import { OtherData } from '../../utils/other';


const OtherSlider = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    return (

        <LinearContainer
            children={
                <>

                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title="Other"
                        rightItem={<Images.Svg.btsRightLinear />}
                    />
                    <CustomSwiper data={OtherData} height={width / 1.9} width={'100%'} marginTop={70} />
                </>
            }
        />
    );
};


export default OtherSlider;
