import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

type Props = {
  title?: string;
  text?: string;
  textAlign?: string;
  style?: any;
};

const TextView: React.FC<Props> = ({text, title, style}) => {
  return (
    <Text style={[title ? styles.title : styles.text, style]}>
      {title || text}
    </Text>
  );
};

export default TextView;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    // fontFamily: ''
  },
  text: {
    fontSize: 14,
    color: '#979DA2',
    fontWeight: '400',
    textAlign: 'center',
  },
});
