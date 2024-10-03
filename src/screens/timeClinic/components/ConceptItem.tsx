import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../../hooks/useRootStore';

type Props = {
  title?: string;
  texts?: string[];
};

const ConceptItem: React.FC<Props> = ({title, texts}) => {
  const {themeState} = useRootStore().personalAreaStore;
  const renderTexts = useCallback(() => {
    return texts.map((item, index) => {
      return (
        <TextView
          key={index}
          textAlign="left"
          text={item}
          color={themeState.darkGrayText}
        />
      );
    });
  }, [texts]);

  return (
    <RN.View style={styles.container}>
      <TextView style={styles.title} textAlign="left" title={title} />
      {renderTexts()}
    </RN.View>
  );
};

export default observer(ConceptItem);

const styles = StyleSheet.create({
  container: {
    gap: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
  },
});
