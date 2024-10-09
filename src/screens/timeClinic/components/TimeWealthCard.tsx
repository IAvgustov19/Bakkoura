import * as React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {windowWidth} from '../../../utils/styles';
import ConceptItem from './ConceptItem';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {
  imageUrl?: ImageSourcePropType;
  texts?: string[];
  title?: string;
  date?: string;
  onPress?: () => void;
};

const TimeWealthCard: React.FC<Props> = ({
  texts,
  imageUrl,
  title,
  date,
  onPress,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  const renderTexts = React.useCallback(() => {
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
    <RN.Pressable style={styles.container} onPress={onPress}>
      <RN.View style={styles.wealthImageBox}>
        <RN.Image style={styles.wealthImage} source={imageUrl} />
      </RN.View>
      <TextView style={styles.title} textAlign="left" title={title} />
      <RN.View>{renderTexts()}</RN.View>
      {date ? <TextView textAlign="left" text={date} /> : null}
    </RN.Pressable>
  );
};

export default observer(TimeWealthCard);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
  wealthImageBox: {
    alignItems: 'center',
    width: '100%',
    height: 250,
  },
  wealthImage: {
    width: '100%',
    height: '100%',
    // objectFit: 'cover',
  },
  title: {
    fontSize: 18,

    marginTop:10
  },
});
