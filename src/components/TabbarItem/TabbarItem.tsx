import * as React from 'react';
import {View} from 'react-native';
import TextView from '../Text/Text';
import {styles} from './TabbarItemStyles';

type Props = {
  icon?: any;
  title?: string;
};

const TabbarItem: React.FC<Props> = ({icon, title}) => {
  return (
    <View style={styles.container}>
      {icon}
      <TextView text={title} />
    </View>
  );
};

export default TabbarItem;
