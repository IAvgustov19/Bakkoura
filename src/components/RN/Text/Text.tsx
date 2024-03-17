import React, {FC} from 'react';
import {Text as RNText, TextProps, View} from 'react-native';

type Props = {
  color?: string;
} & TextProps;

const Text: FC<Props> = ({children, color, style, ...resOfProps}) => {
  if (!children) {
    return <View />;
  }

  return (
    <RNText {...resOfProps} style={[style, !!color && {color}]}>
      {children}
    </RNText>
  );
};

export default Text;
