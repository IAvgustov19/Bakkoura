import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Input from '../../../../components/Input/Input';
import RN from '../../../../components/RN';
import useRootStore from '../../../../hooks/useRootStore';
import CustomSelect from '../../../timeBiotic/components/CustomSelect';

type Props = {
  options: any;
  onSelect?: () => void;
  bottomInputPress?: () => void;
};

const SignUpForm: React.FC<Props> = ({bottomInputPress, options, onSelect, }) => {
  const {newUser, setNewUser} = useRootStore().authStore;

  const inputRefs = React.useRef<{ [key: string]: TextInput }>({
    name: null,
    username: null,
    email: null,
    password: null,
  });

  const focusInput = (refName: string) => {
    inputRefs.current[refName]?.focus();
  }
  
  return (
    <RN.View style={styles.formBox}>
      <Input
        title="Name"
        placeholder="Enter your name"
        value={newUser.name}
        onPressIn={() => focusInput('name')}
        onChangeText={e => setNewUser('name', e)}
        inputRef={(ref) => (inputRefs.current.name = ref)}
      />
      <Input
        title="Username"
        placeholder="Enter your username"
        value={newUser.username}
        onPressIn={() => focusInput('username')}
        onChangeText={e => setNewUser('username', e)}
        inputRef={(ref) => (inputRefs.current.username = ref)}
        
      />
      <Input
        title="Email"
        placeholder="Enter your email"
        value={newUser.email}
        onPressIn={() => focusInput('email')}
        onChangeText={e => setNewUser('email', e)}
        inputRef={(ref) => (inputRefs.current.email = ref)}
      />
      <Input
        secureTextEntry
        title="Password"
        placeholder="Enter your password"
        value={newUser.password}
        onChangeText={e => setNewUser('password', e)}
        inputRef={(ref) => (inputRefs.current.password = ref)}
        onPressIn={() => {
          focusInput('password');
          bottomInputPress && bottomInputPress();
        }}
      />
      <CustomSelect options={options} onSelect={onSelect} black={true}/>
    </RN.View>
  );
};

export default observer(SignUpForm);

const styles = StyleSheet.create({
  formBox: {
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
