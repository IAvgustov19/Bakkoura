import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  DimensionValue,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import {verticalScale} from '../../utils/dimensions';
import RN from '../RN';

type Props = {
  title: string;
  onPress?: () => void;
  icon?: any;
  color?: string;
  outline?: boolean;
  width?: DimensionValue;
  paddingVertical?: number;
};

const ButtonComp: React.FC<Props> = ({
  title,
  onPress,
  icon,
  outline,
  width,
  color,
  paddingVertical,
}) => {
  return (
    <LinearGradient
      style={[
        styles.gradient,
        {
          borderColor: outline ? COLORS.darkGreyText : '#ECC271',
          width: width ? width : '100%',
        },
      ]}
      colors={outline ? ['#1c252f', '#0b0d10'] : ['#ECC271', '#35270A']}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            paddingVertical: paddingVertical
              ? paddingVertical
              : verticalScale(10),
          },
        ]}
        onPress={onPress}>
        {/* <RN.Image style={styles.btnTopLight} source={Images.Img.btnTopLight} /> */}
        <Text
          style={[
            styles.title,
            {color: color? color : outline ? COLORS.white : COLORS.black},
          ]}>
          {title}
        </Text>
        <View style={styles.icon}>{icon ? icon : null}</View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  gradient: {
    backgroundColor: '#ECC271',
    borderWidth: 1,
    borderColor: '#ECC271',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
    color: COLORS.black,
    fontFamily: 'RedHatDisplay-SemiBold',
    textShadowColor: 'rgba(255, 255, 255, 0.40)',
    textShadowOffset: {width: -1, height: 0.1},
    textShadowRadius: 10,
  },
  icon: {
    height: '100%',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  btnTopLight: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: '70%',
    // objectFit: 'contain',
  },
});
