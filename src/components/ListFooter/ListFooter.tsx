import React from 'react';
import RN from '../RN';

const ListFooter = () => {
  return <RN.View style={styles.listFooter}></RN.View>;
};

export default ListFooter;

const styles = RN.StyleSheet.create({
  listFooter: {
    height: 270,
  },
});
