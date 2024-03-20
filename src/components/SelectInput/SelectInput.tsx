import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import {verticalScale} from '../../utils/dimensions';
import RN from '../RN';
import TextView from '../Text/Text';

type Props = {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  iconPress?: () => void;
  onPress?: () => void;
};

const SelectInput: React.FC<Props> = ({
  icon,
  iconPress,
  onPress,
  title,
  value,
}) => {
  return (
    <LinearGradient style={styles.container} colors={['#0f1317', '#272F35']}>
      <RN.TouchableOpacity style={styles.content} onPress={onPress}>
        <TextView text={title} />
        <RN.View style={styles.arrow}>
          <TextView text={value} textAlign="left" />
          <RN.TouchableOpacity onPress={iconPress}>
            {icon ? icon : <Images.Svg.arrowRight />}
          </RN.TouchableOpacity>
        </RN.View>
      </RN.TouchableOpacity>
    </LinearGradient>
  );
};

export default SelectInput;

const styles = RN.StyleSheet.create({
  container: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#496380',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: verticalScale(12),
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
