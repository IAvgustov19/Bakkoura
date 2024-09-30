import React from 'react';
import {COLORS} from '../../utils/colors';
import {HITSLOP} from '../../utils/styles';
import RN from '../RN';

import {t} from '../../i18n'

type Props = {
  onClose?: () => void;
};

const Cancel: React.FC<Props> = ({onClose}) => {
  return (
    <RN.TouchableOpacity
      style={styles.cancelBtn}
      onPress={onClose}
      hitSlop={HITSLOP}>
      <RN.Text style={styles.cancelTxt}>{t('Cancel')}</RN.Text>
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
    color: COLORS.grey,
    fontSize: 16,
  },
});
