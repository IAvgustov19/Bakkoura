import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import Input from '../../../components/Input/Input';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';

type Props = {
  bottomInputPress?: () => void;
};

const FormContainer: React.FC<Props> = ({bottomInputPress}) => {
  return (
    <RN.View style={styles.container}>
      <Input
        title="Name"
        placeholder="Name"
        backColor={COLORS.c3}
        width="100%"
      />
      <Input
        title="Phone"
        placeholder="Phone"
        backColor={COLORS.c3}
        width="100%"
        onPressIn={bottomInputPress}
      />
      <Input
        title="Comment"
        height={100}
        placeholder="Text"
        backColor={COLORS.c3}
        width="100%"
        multiLine={true}
        textAlignVertical="top"
        onPressIn={bottomInputPress}
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
