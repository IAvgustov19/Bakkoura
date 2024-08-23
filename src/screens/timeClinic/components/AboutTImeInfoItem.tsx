import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';
import {verticalScale} from '../../../utils/dimensions';
import {windowWidth} from '../../../utils/styles';
import useRootStore from '../../../hooks/useRootStore';

type Props = {
  text?: string;
  author?: string;
};

const AboutTimeInfoItem: React.FC<Props> = ({author, text}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.View style={styles.container}>
      <RN.Text
        fontFamily="RedHatDisplay-Italic"
        style={[styles.text, {color: themeState.title}]}>
        {text}
      </RN.Text>
      <Images.Svg.aboutTimeLine width={windowWidth - 40} />
      <RN.Text style={[styles.author, {color: themeState.yellow}]}>
        {author}
      </RN.Text>
    </RN.View>
  );
};

export default observer(AboutTimeInfoItem);

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  text: {
    fontSize: 17,
    color: COLORS.lightGrey,
    fontWeight: '200',
  },
  author: {
    color: COLORS.yellow,
    fontSize: 12,
  },
});
