import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import {verticalScale} from '../../utils/dimensions';
import RN from '../RN';
import TextView from '../Text/Text';
import useRootStore from '../../hooks/useRootStore';

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
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <LinearGradient
      style={[styles.container, {borderColor: themeState.inputBorder}]}
      colors={themeState.button}>
      <RN.TouchableOpacity style={styles.content} onPress={onPress}>
        <TextView title={title} />
        <RN.View style={styles.arrow}>
          <TextView text={value} textAlign="left" />
          <RN.TouchableOpacity onPress={iconPress}>
            {icon ? icon : <themeState.arrowRight />}
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
