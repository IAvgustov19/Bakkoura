import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';
import {windowWidth} from '../../../utils/styles';

type Props = {
  number?: string;
  isActive?: boolean;
  onPress?: () => void;
};

const EllipseBotton: React.FC<Props> = ({isActive, number, onPress}) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      <Images.Svg.bottonEllipse
        stroke={isActive ? COLORS.yellow : '#465F7B'}
        width={windowWidth / 5.2}
      />
      <RN.Text style={styles.number}>{number}</RN.Text>
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
