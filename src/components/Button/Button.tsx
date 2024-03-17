import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  onPress?: () => void;
  icon?: any;
};

const ButtonComp: React.FC<Props> = ({title, onPress, icon}) => {
  return (
    <LinearGradient style={styles.gradient} colors={['#ECC271', '#35270A']}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
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
    // fontWeight: '600',
  },
  icon: {
    height: '100%',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
