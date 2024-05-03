import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

type Props = {
  title?: string;
  text?: string | number;
  textAlign?: string;
  style?: any;
};

const TextView: React.FC<Props> = ({text, title, style, textAlign}) => {
  return (
    <Text
      style={[
        title ? styles.title : styles.text,
        style,
        {textAlign: textAlign ? textAlign : 'center'},
      ]}>
      {title || text}
    </Text>
  );
};

export default TextView;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'RedHatDisplay-Regular',
  },
  text: {
    fontSize: 14,
    color: COLORS.grey,
    fontWeight: '400',
    fontFamily: 'RedHatDisplay-Regular',
  },
});
