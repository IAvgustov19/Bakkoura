import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  DimensionValue,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../utils/colors';
import {verticalScale} from '../../utils/dimensions';

type Props = {
  title: string;
  onPress?: () => void;
  icon?: any;
  outline?: boolean;
  width?: DimensionValue;
};

const ButtonComp: React.FC<Props> = ({
  title,
  onPress,
  icon,
  outline,
  width,
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
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text
          style={[
            styles.title,
            {color: outline ? COLORS.white : COLORS.black},
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
    paddingVertical: verticalScale(10),
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
    color: COLORS.black,
  },
  icon: {
    height: '100%',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
