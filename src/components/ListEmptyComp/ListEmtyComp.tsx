import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

type Props = {
  title?: string;
};

const ListEmptyComp: React.FC<Props> = ({title}) => {
  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>{title}</RN.Text>
    </RN.View>
  );
};

export default ListEmptyComp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: COLORS.grey,
  },
});
