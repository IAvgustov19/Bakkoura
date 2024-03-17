import React from 'react';
import {HITSLOP} from '../../utils/styles';
import RN from '../RN';

type Props = {
  onClose?: () => void;
};

const Cancel: React.FC<Props> = ({onClose}) => {
  return (
    <RN.TouchableOpacity
      style={styles.cancelBtn}
      onPress={onClose}
      hitSlop={HITSLOP}>
      <RN.Text style={styles.cancelTxt}>Cancel</RN.Text>
    </RN.TouchableOpacity>
  );
};

export default Cancel;

const styles = RN.StyleSheet.create({
  cancelBtn: {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  cancelTxt: {
    color: '#656E77',
    fontSize: 16,
  },
});
