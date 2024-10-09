import React from 'react';
import * as Progress from 'react-native-progress';

import {windowHeight} from '../../../utils/styles';
import {COLORS} from '../../../utils/colors';
import RN from '../../../components/RN';
import {View, ViewStyle} from 'react-native';

interface Props {
  loading: boolean;
  color?: ViewStyle;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingScreen: React.FC<Props> = ({loading, setLoading}) => {
  return (
    <View>
      {loading && (
        <View style={styles.overlay}>
          <Progress.Circle size={50} indeterminate={true} color={COLORS.gray} />
        </View>
      )}
    </View>
  );
};

export default LoadingScreen;

const styles = RN.StyleSheet.create({
  overlay: {
    width: '100%',
    zIndex: 1000,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
