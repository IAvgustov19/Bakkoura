import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';
import {windowWidth} from '../../../utils/styles';
import useRootStore from '../../../hooks/useRootStore';

type Props = {
  number?: string;
  isActive?: boolean;
  onPress?: () => void;
};

const EllipseBotton: React.FC<Props> = ({isActive, number, onPress}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      <themeState.smallSubtrack
        stroke={isActive ? COLORS.yellow : '#465F7B'}
        width={windowWidth / 5.2}
      />
      <RN.Text
        style={[
          styles.number,
          {color: isActive ? themeState.metronomType : themeState.title},
        ]}>
        {number}
      </RN.Text>
    </RN.TouchableOpacity>
  );
};

export default observer(EllipseBotton);

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 5.2,
  },
  number: {
    position: 'absolute',
    zIndex: 1,
    color: COLORS.white,
    fontSize: 20,
  },
});
