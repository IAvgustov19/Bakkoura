import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';

type Props = {
  number?: string;
  isActive?: boolean;
  onPress?: () => void;
};

const EllipseBotton: React.FC<Props> = ({isActive, number, onPress}) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      <Images.Svg.bottonEllipse stroke={isActive ? COLORS.yellow : '#465F7B'} />
      <RN.Text style={styles.number}>{number}</RN.Text>
    </RN.TouchableOpacity>
  );
};

export default observer(EllipseBotton);

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
  },
  number: {
    position: 'absolute',
    zIndex: 1,
    color: COLORS.white,
    fontSize: 20,
  },
});
