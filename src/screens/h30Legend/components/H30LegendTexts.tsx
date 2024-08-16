import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TextView from '../../../components/Text/Text';

type Props = {
  texts?: string[];
};

const H30LegendTexts: React.FC<Props> = ({texts}) => {
  const renderTexts = useCallback(() => {
    return texts.map((item, index) => {
      return <TextView key={index} text={item} textAlign="left" />;
    });
  }, []);
  return <View style={styles.container}>{renderTexts()}</View>;
};

export default observer(H30LegendTexts);

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
