import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {verticalScale} from '../../utils/dimensions';
import {windowHeight} from '../../utils/styles';
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
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  leftItem: {
    justifyContent: 'center',
    zIndex: 1,
  },
  rightItem: {
    justifyContent: 'center',
    zIndex: 1,
  },
});
