import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import Input from '../../../components/Input/Input';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';

type Props = {
  bottomInputPress?: () => void;
};

const FormContainer: React.FC<Props> = ({bottomInputPress}) => {
  const {orderState, setOrderState} = useRootStore().marketStore;
  return (
    <RN.View style={styles.container}>
      <Input
        value={orderState.name}
        title="Name"
        placeholder="Name"
        // backColor={COLORS.black}
        width="100%"
        onChangeText={e => setOrderState('name', e)}
        black={true}
        bordered
      />
      <Input
        value={orderState.phone}
        title="Phone"
        placeholder="Phone"
        // backColor={COLORS.black}
        width="100%"
        onPressIn={bottomInputPress}
        onChangeText={e => setOrderState('phone', e)}
        black={true}
        keyBoardType="numeric"
        bordered
      />
      <Input
        value={orderState.message}
        title="Comment"
        height={100}
        placeholder="Text"
        // backColor={COLORS.black}
        width="100%"
        multiLine={true}
        textAlignVertical="top"
        onChangeText={e => setOrderState('message', e)}
        onPressIn={bottomInputPress}
        black={true}
        bordered
      />
    </RN.View>
  );
};

export default observer(FormContainer);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  fileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    gap: 10,
  },
  fileBoxBox: {
    maxWidth: '80%',
  },
});
