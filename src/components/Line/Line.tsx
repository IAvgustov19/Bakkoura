import React from 'react';
import RN from '../RN';

const Line = () => {
  return <RN.View style={styles.line}></RN.View>;
};

export default Line;

const styles = RN.StyleSheet.create({
  line: {
    backgroundColor: '#131F28',
    width: '100%',
    height: 1,
  },
});
