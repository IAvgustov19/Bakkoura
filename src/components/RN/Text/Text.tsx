import React, {FC} from 'react';
import {Text as RNText, TextProps, View} from 'react-native';

type Props = {
  color?: string;
  fontFamily?: string;
} & TextProps;

const Text: FC<Props> = ({
  children,
  color,
  fontFamily,
  style,
  ...resOfProps
}) => {
  if (!children) {
    return <View />;
  }

  return (
    <RNText
      {...resOfProps}
      style={[
        style,
        !!color && {color},
        {fontFamily: fontFamily ? fontFamily : 'RedHatDisplay-Regular'},
      ]}>
      {children}
    </RNText>
  );
};

export default Text;
