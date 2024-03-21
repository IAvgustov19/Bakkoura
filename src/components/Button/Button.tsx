import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../utils/colors';

type Props = {
  title: string;
  onPress?: () => void;
  icon?: any;
  outline?: boolean;
};

const ButtonComp: React.FC<Props> = ({title, onPress, icon, outline}) => {
  return (
    <LinearGradient
      style={[
        styles.gradient,
        {borderColor: outline ? COLORS.darkGreyText : '#ECC271'},
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
    // paddingHorizontal: 20,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
  },
  icon: {
    height: '100%',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
