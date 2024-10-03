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
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {
  title: string;
  onPress?: () => void;
  icon?: any;
  color?: string;
  outline?: boolean;
  width?: DimensionValue;
  paddingVertical?: number;
  containerColor?: string;
  textColor?: string;
};

const ButtonComp: React.FC<Props> = ({
  title,
  onPress,
  icon,
  outline,
  width,
  color,
  paddingVertical,
  textColor,
  containerColor,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <LinearGradient
      style={[
        styles.gradient,
        {
          // backgroundColor: containerColor,
          borderColor: outline ? themeState.inputBorder : '#ECC271',
          width: width ? width : '100%',
        },
      ]}
      colors={
        outline ? themeState.button : ['#ECC271', themeState.buttonYellow]
      }>
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
            {color: color ? color : outline ? themeState.title : COLORS.black},
          ]}>
          {title}
        </Text>
        <View style={styles.icon}>{icon ? icon : null}</View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default observer(ButtonComp);

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
    textShadowColor: 'rgba(255, 255, 255, 0.52)',
    textShadowOffset: {width: -1, height: 0.001},
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
