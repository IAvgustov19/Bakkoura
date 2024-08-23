import React from 'react';
import RN from '../RN';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../hooks/useRootStore';

const Line = () => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.View
      style={[styles.line, {backgroundColor: themeState.line}]}></RN.View>
  );
};

export default observer(Line);

const styles = RN.StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
  },
});
