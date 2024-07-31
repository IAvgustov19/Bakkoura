import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {verticalScale} from '../../utils/dimensions';
import {windowHeight} from '../../utils/styles';
import RN from '../RN';
import TextView from '../Text/Text';

type Props = {
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  title?: any;
  centerItem?: React.ReactNode;
};

const HeaderContent: React.FC<Props> = ({
  leftItem,
  rightItem,
  title,
  centerItem,
}) => {
  return (
    <RN.View style={styles.header}>
      {leftItem && <RN.View style={styles.leftItem}>{leftItem}</RN.View>}
      {title && (
        <TextView
          fontFamily="RedHatDisplay-SemiBold"
          style={styles.title}
          // @ts-ignore
          title={title}
        />
      )}
      {centerItem && centerItem}
      {rightItem && <RN.View style={styles.rightItem}>{rightItem}</RN.View>}
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
    marginTop: 25,
    marginBottom: 20,
  },
  title: {
    alignSelf: 'center',
    position: 'absolute',
    // left: 150,
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
