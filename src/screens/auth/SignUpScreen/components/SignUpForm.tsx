import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Input from '../../../../components/Input/Input';
import RN from '../../../../components/RN';
import useRootStore from '../../../../hooks/useRootStore';
import CustomSelect from '../../../timeBiotic/components/CustomSelect';

type Props = {
  bottomInputPress?: () => void;
};

const SignUpForm: React.FC<Props> = ({bottomInputPress}) => {
  const {newUser, setNewUser} = useRootStore().authStore;
  return (
    <RN.View style={styles.container}>
      <Input
        title="Name"
        placeholder="JB"
        value={newUser.name}
        onChangeText={e => setNewUser('name', e)}
      />
      <Input
        title="Username"
        placeholder="Username"
        value={newUser.username}
        onChangeText={e => setNewUser('username', e)}
      />
      <Input
        title="Email"
        placeholder="Email"
        value={newUser.email}
        onChangeText={e => setNewUser('email', e)}
      />
      <Input
        title="Password"
        placeholder="77777"
        value={newUser.password}
        onChangeText={e => setNewUser('password', e)}
        secureTextEntry
        onPressIn={bottomInputPress}
      />
      <CustomSelect options={undefined} onSelect={undefined} black={true}/>
      {/* <Input
        title="Country"
        placeholder="Country"
        value={newUser.country}
        onChangeText={e => setNewUser('country', e)}
        onPressIn={bottomInputPress}
      /> */}
    </RN.View>
  );
};

export default observer(SignUpForm);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
});
