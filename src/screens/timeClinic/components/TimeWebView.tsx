import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../assets';
import RN from '../../../components/RN';

type Props = {
  linkName?: string;
  onHandleCategory?: () => void;
  logo?: React.ReactNode;
};

const TimeWebView: React.FC<Props> = ({onHandleCategory, linkName, logo}) => {
  return (
    <RN.Pressable style={styles.siteLinkBox} onPress={onHandleCategory}>
      <RN.Text style={styles.siteLink}>{linkName}</RN.Text>
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
    color: '#DFC188',
    fontSize: 18,
    textDecorationColor: '#DFC188',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
