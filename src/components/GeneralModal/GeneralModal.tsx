import React from 'react';
import LinearContainer from '../LinearContainer/LinearContainer';
import RN from '../RN';

type Props = {
  children: React.ReactNode;
  visible?: boolean;
  hide?: () => void;
};

const GeneralModal: React.FC<Props> = ({children, hide, visible}) => {
  return (
    <RN.Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={hide}>
      <LinearContainer children={children} />
    </RN.Modal>
  );
};

export default GeneralModal;
