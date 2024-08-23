import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';

type Props = {
  linkName?: string;
  onHandleCategory?: () => void;
  logo?: React.ReactNode;
};

const TimeWebView: React.FC<Props> = ({onHandleCategory, linkName, logo}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.Pressable style={styles.siteLinkBox} onPress={onHandleCategory}>
      <RN.Text
        style={[
          styles.siteLink,
          {color: themeState.yellow, textDecorationColor: themeState.yellow},
        ]}>
        {linkName}
      </RN.Text>
      {logo}
    </RN.Pressable>
  );
};

export default TimeWebView;

const styles = StyleSheet.create({
  siteLinkBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  siteLink: {
    fontSize: 18,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
