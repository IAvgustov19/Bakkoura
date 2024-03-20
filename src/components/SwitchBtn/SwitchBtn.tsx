import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {styles} from './SwitchBtnStyles';

type Props = {
  title?: string;
  icon?: any;
  onPress?: () => void;
};

const SwitchBtn: React.FC<Props> = ({title, icon, onPress}) => {
  const onSwitch = () => {};

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient style={styles.gradient} colors={['#ECC271', '#35270A']}>
        {icon ? (
          <View style={styles.icon}>
            <View style={styles.ellipse}>
              <Images.Svg.ellipseSmall height={30} />
            </View>
            {icon ? icon : null}
          </View>
        ) : null}
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SwitchBtn;
