import React from 'react';
import {COLORS} from '../../utils/colors';
import {HITSLOP} from '../../utils/styles';
import RN from '../RN';

import {t} from '../../i18n'
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {
  onClose?: () => void;
};

const Cancel: React.FC<Props> = ({onClose}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.TouchableOpacity
      style={styles.cancelBtn}
      onPress={onClose}
      hitSlop={HITSLOP}>
      <RN.Text style={[styles.cancelTxt, {color: themeState.gray}]}>{t('Cancel')}</RN.Text>
    </RN.TouchableOpacity>
  );
};

export default observer(Cancel);

const styles = RN.StyleSheet.create({
  cancelBtn: {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  cancelTxt: {
    fontSize: 16,
  },
});
