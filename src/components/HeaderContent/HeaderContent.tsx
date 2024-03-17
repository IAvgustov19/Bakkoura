import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RN from '../RN';
import TextView from '../Text/Text';

type Props = {
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  title?: string;
};

const HeaderContent: React.FC<Props> = ({leftItem, rightItem, title}) => {
  return (
    <RN.View style={styles.header}>
      <RN.View style={styles.leftItem}>{leftItem}</RN.View>
      <TextView style={styles.title} title={title} />
      <RN.View style={styles.rightItem}>{rightItem}</RN.View>
    </RN.View>
  );
};

export default HeaderContent;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
  },
  title: {
    // textAlign: 'center',
    // alignSelf: 'center',
  },
  leftItem: {
    paddingTop: 2,
    position: 'absolute',
    left: 0,
  },
  rightItem: {
    position: 'absolute',
    paddingTop: 2,
    right: 0,
  },
});
