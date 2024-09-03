import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import RN from '../RN';

const { width } = Dimensions.get('window');

interface IProps {
    data: any;
    height?: any;
    width?: any;
    marginTop?: any;
    paddingTop?: any,
}

const CustomSwiper: React.FC<IProps> = ({ data, height, width, marginTop = 60, paddingTop = 150 }) => {
    return (
        <Swiper
            loop={false}
            dotStyle={styles.dots}
            autoplay
            activeDotColor={'#ECC271'}>
            {data.map((e, index) => {
                return (
                    <View style={[styles.slide, {paddingTop: paddingTop}]} key={index}>
                        <RN.View style={styles.image}>
                            <RN.Image
                                style={[styles.image, { height: height, width: width }]}
                                source={e.image}
                                resizeMode="contain"
                            />
                        </RN.View>
                        <Text style={[styles.text, { marginTop: marginTop }]}>{e.text}</Text>
                    </View>
                );
            })}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    imageWrapper: {
        width: '100%',
        height: width,
        borderRadius: 25,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: width / 2.3,
        borderRadius: 25,
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop: 60,
        paddingHorizontal: 20,
    },
    dots: {
        backgroundColor: '#16212A',
    },
});

export default CustomSwiper;
