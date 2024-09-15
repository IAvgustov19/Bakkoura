import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {COLORS} from '../../../utils/colors';

type Props = {
  title?: string;
  texts?: string[];
  page?: number;
};

const TheBookitem: React.FC<Props> = ({title, page = 1, texts}) => {
  const renderText = useCallback(() => {
    return texts.map((item, index) => {
      return (
        <TextView
          key={index}
          style={styles.text}
          text={item}
          textAlign="left"
        />
      );
    });
  }, [texts]);

  return (
    <RN.View style={styles.container}>
        <TextView title={title} textAlign="left" />
      <RN.View>{renderText()}</RN.View>
      {/*<TextView text={page} style={styles.pageNumber} />*/}
    </RN.View>
  );
};

export default TheBookitem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
    gap: 15,
    marginVertical: 4,
    borderRadius: 20
  },
  pageNumber: {
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
  text: {
    marginBottom: 15,
  },
});
