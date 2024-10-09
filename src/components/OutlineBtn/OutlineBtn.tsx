import * as React from 'react';
import {Text, View, StyleSheet, DimensionValue, ViewStyle} from 'react-native';
import {DefinitionProps} from 'react-native-svg';
import {COLORS} from '../../utils/colors';
import RN from '../RN';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {
  borderColor?: string;
  borderColor_2?: string;
  textColor?: string;
  text?: string;
  onPress?: () => void;
  Width?: DimensionValue;
  Height?: DimensionValue;
  customStyle?: ViewStyle;
  icon?: React.ReactNode;
};

const OutlineBtn: React.FC<Props> = ({
  borderColor,
  borderColor_2,
  textColor,
  text,
  onPress,
  Width,
  Height,
  customStyle,
  icon,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        customStyle,
        {
          borderColor: borderColor ? borderColor : borderColor_2,
          width: Width ? Width : 110,
          height: Height ? Height : 35,
          backgroundColor: 'transparent',
        },
      ]}>
      <RN.Text style={{color: textColor ? textColor : COLORS.grey}}>
        {text}
      </RN.Text>
      {icon ? <RN.View style={styles.icon}>{icon}</RN.View> : null}
    </RN.TouchableOpacity>
  );
};

export default observer(OutlineBtn);

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 35,
    borderWidth: 1.5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
