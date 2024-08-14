import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';

type Props = {
  title?: string;
  texts?: string[];
};

const ConceptItem: React.FC<Props> = ({title, texts}) => {
  const renderTexts = useCallback(() => {
    return texts.map((item, index) => {
      return <TextView key={index} textAlign="left" text={item} />;
    });
  }, [texts]);

  return (
    <RN.View style={styles.container}>
      <TextView style={styles.title} textAlign="left" title={title} />
      {renderTexts()}
    </RN.View>
  );
};

export default ConceptItem;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
  },
});
