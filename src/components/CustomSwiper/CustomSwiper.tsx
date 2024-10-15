import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import RN from '../RN';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import theme from '../../screens/personalArea/screens/theme';
import useRootStore from '../../hooks/useRootStore';

interface IProps {
    data: any;
    height?: any;
    width?: any;
    marginTop?: any;
    paddingTop?: any,
}

const CustomSwiper: React.FC<IProps> = ({ data, height, width, marginTop = 60, paddingTop = 150 }) => {
    const [imageDimensions, setImageDimensions] = useState<Array<{ width: number, height: number }>>([]);
    const {themeState} = useRootStore().personalAreaStore;

    useEffect(() => {
        const calculateImageDimensions = () => {
            const dimensions = data.map((item) => {
                const imageSource = Image.resolveAssetSource(item.image);
                let imageWidth = imageSource.width;
                let imageHeight = imageSource.height;
                return { width: imageWidth, height: imageHeight };
            });

            setImageDimensions(dimensions);
        };

        calculateImageDimensions();
    }, [data]);

    return (
        <Swiper
            loop={false}
            dotStyle={styles.dots}
            autoplay
            activeDotColor={'#ECC271'}>
            {data.map((e, index) => {
                const imageHeight = imageDimensions[index] ? imageDimensions[index].height - 8 : 200;
                const imageWidth = imageDimensions[index] ? imageDimensions[index].width : 300;
                return (
                    <View style={[styles.slide, { paddingTop: paddingTop }]} key={index}>
                        <RN.Image
                            height={imageHeight + 2}
                            width={imageWidth}
                            style={[styles.image, { height: imageHeight / 3, width: width }]}
                            source={e.image}
                            resizeMode="contain"
                        />
                        <Text style={[styles.text, { marginTop: marginTop, color: themeState.title }]}>{e.text}</Text>
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
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: 'blue',
    },
    image: {
        objectFit: 'fill',
        borderRadius: 35,
        maxWidth:400,
        // backgroundColor: 'red',
    },
    text: {
        fontWeight: '300',
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
