import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import RN from '../RN';
import TextView from '../Text/Text';

type Props = {
  hour?: number;
  minut?: number;
  time?: string;
  country?: string;
  weather?: string;
  date?: string;
};

const WorldWatch: React.FC<Props> = ({
  country,
  date,
  hour,
  minut,
  time,
  weather,
}) => {
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.watch}>
        <Images.Svg.worldWatch />
        <LinearGradient
          colors={['#ECC271', '#281F0E']}
          style={[
            styles.hourLine,

            {transform: `rotate(${hour * 30 + minut / 2}deg)`},
          ]}></LinearGradient>
        <LinearGradient
          colors={['#E10000', '#792525', '#0152aa']}
          style={[
            styles.minutLine,
            {transform: `rotate(${minut * 6}deg)`},
          ]}></LinearGradient>
      </RN.View>
      <RN.View style={styles.infoBox}>
        <RN.Text style={styles.country}>{country}</RN.Text>
        <RN.Text style={styles.weather}>{weather}</RN.Text>
        <RN.Text style={styles.time}>{time}</RN.Text>
      </RN.View>
    </RN.View>
  );
};

export default WorldWatch;

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 5,
  },
  watch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourLine: {
    position: 'absolute',
    height: '30%',
    width: 2.5,
    backgroundColor: COLORS.yellow,
    bottom: '50%',
    transformOrigin: 'bottom',
  },
  minutLine: {
    position: 'absolute',
    height: '30%',
    width: 1.5,
    backgroundColor: COLORS.red,
    bottom: '50%',
    transformOrigin: 'bottom',
  },
  infoBox: {
    gap: 5,
  },
  country: {
    fontSize: 20,
    fontWeight: '300',
    color: COLORS.white,
  },
  weather: {
    fontSize: 14,
    color: COLORS.yellow,
  },
  time: {
    fontSize: 30,
    fontWeight: '200',
    color: COLORS.white,
  },
});
