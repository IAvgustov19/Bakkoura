import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { OnBoardingData } from '../../utils/onBoardingData';
import ButtonComp from '../Button/Button';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { APP_ROUTES } from '../../navigation/routes';
import GiveImage from '../GiveImage/GiveImage';
import { Images } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRootStore from '../../hooks/useRootStore';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../../screens/auth/Loading/LoadingScreen';
import * as Progress from 'react-native-progress';


const OnBoarding = () => {
  const navigation = useNavigation();
  const { setAuthorized } = useRootStore().authStore;

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    auth().currentUser && setLoading(false);
  }, [auth().currentUser])


  return (
    <>
      {

       auth().currentUser  ?
       <LinearGradient colors={['#485661', '#090A0A']} style={{ width: '100%', height: '100%' }}>
         <LoadingScreen loading={true} setLoading={setLoading} />
       </LinearGradient>
          : <Swiper
            style={styles.wrapper}
            loop={false}
            dotStyle={styles.dots}
            autoplay
            activeDotColor={'#ECC271'}>
            {OnBoardingData.map((e, index) => {
              return (
                <View style={styles.slide} key={index}>
                  <LinearGradient colors={['#36424B', '#0C0C0C']}>
                    <ImageBackground source={e.backImage} style={styles.image}>
                      <View style={styles.logo}>
                        <Text style={styles.title}>{e.title}</Text>
                        <e.logo />
                      </View>
                      <View style={styles.texts}>
                        <Text style={styles.timeTitle}>{e.timeTitle}</Text>
                        <Text style={styles.description}>{e.timeText}</Text>
                        {e.btnTitle ? (
                          <ButtonComp
                            onPress={() =>
                              navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never)
                            }
                            title="Let’s start!"
                            icon={<GiveImage source={Images.Img.eye} />}
                          />
                        ) : null}
                      </View>
                    </ImageBackground>
                  </LinearGradient>
                </View>
              );
            })}
          </Swiper>
      }


    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  logo: {
    top: 30,
    gap: 30,
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 12,
    color: '#ECC271',
    textAlign: 'center',
    marginTop: 5,
  },
  timeTitle: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#979DA2',
    textAlign: 'center',
    paddingHorizontal: 64,
    marginBottom: 20,
  },
  texts: {
    bottom: 70,
    paddingHorizontal: 50,
  },
  dots: {
    backgroundColor: '#16212A',
  },
  linear: {
    paddingHorizontal: 5,
    paddingVertical: 6,
    backgroundColor: '#7F642E',
    borderRadius: 30,
    borderColor: '#ECC271',
    borderWidth: 1,
    width: 70,
    top: -5,
    alignItems: 'center',
  },
});

export default OnBoarding;
