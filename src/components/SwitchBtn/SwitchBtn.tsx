import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {styles} from './SwitchBtnStyles';

type Props = {
  title?: string;
  icon?: any;
};

const SwitchBtn: React.FC<Props> = ({title, icon}) => {
  const onSwitch = () => {};

  return (
    <TouchableOpacity style={styles.button}>
      <LinearGradient style={styles.gradient} colors={['#ECC271', '#35270A']}>
        <View style={styles.icon}>
          <View style={styles.ellipse}>
            <Images.Svg.ellipseSmall />
          </View>
          {icon ? icon : null}
        </View>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SwitchBtn;
