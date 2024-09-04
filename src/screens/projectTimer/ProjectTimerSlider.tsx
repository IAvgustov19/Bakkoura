import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';
import { Dimensions } from 'react-native';
import { TimerData } from '../../utils/timer';
import { ProjectTimerData } from '../../utils/projectTimer';


const ProjectTimerSlider = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    return (

        <LinearContainer
            children={
                <>

                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title="Project Timer"
                        rightItem={<Images.Svg.btsRightLinear />}
                    />
                    <CustomSwiper data={ProjectTimerData} height={width / 1.2} width={'100%'} marginTop={30} />
                </>
            }
        />
    );
};


export default ProjectTimerSlider;
