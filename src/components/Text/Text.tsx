import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useRootStore from '../../hooks/useRootStore';
import {COLORS} from '../../utils/colors';
import {normalizeHeight} from '../../utils/dimensions';

type Props = {
  title?: string;
  text?: string | number;
  textAlign?: string;
  style?: any;
  fontFamily?: string;
  fonWeight?: string;
  color?: string;
};

const TextView: React.FC<Props> = ({
  text,
  title,
  style,
  textAlign,
  fontFamily,
  fonWeight,
  color,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <Text
      style={[
        title ? styles.title : styles.text,
        style,
        {fontWeight: fonWeight},
        {textAlign: textAlign ? textAlign : 'center'},
        {fontFamily: fontFamily ? fontFamily : 'RedHatDisplay-Regular'},
        {color: color ? color : title ? themeState.title : COLORS.grey},
      ]}>
      {title || text}
    </Text>
  );
};

export default observer(TextView);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fff',
    // fontWeight: '400',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: COLORS.grey,
    // fontWeight: '400',
  },
});
