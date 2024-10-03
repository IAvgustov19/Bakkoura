import React from 'react';
import {DimensionValue} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RN from '../RN';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {
  top?: DimensionValue;
  height?: number;
};

const DataListLinearBack: React.FC<Props> = ({top, height}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <LinearGradient
      colors={themeState.dateList}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[
        styles.linear,
        {top: top ? top : 110, height: height ? height : 55},
      ]}></LinearGradient>
  );
};

export default observer(DataListLinearBack);

const styles = RN.StyleSheet.create({
  linear: {
    position: 'absolute',
    width: '100%',
    height: 55,
    top: 110,
    zIndex: 0,
  },
});
