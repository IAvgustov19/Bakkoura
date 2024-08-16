import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import RN from '../../../components/RN';
import {windowHeight} from '../../../utils/styles';

type Props = {
  imgUrl?: string;
  select?: boolean;
  onSelect?: () => void;
};

const WallpaperItem: React.FC<Props> = ({imgUrl, select, onSelect}) => {
  // const [loading, setLoading] = React.useState(true);

  // React.useEffect(() => {
  //   setLoading(true);
  // }, [imgUrl]);

  // const listenDownload = () => {
  //   setLoading(false);
  //   console.log('done');
  // };

  return (
    <RN.Pressable style={styles.container} onPress={onSelect}>
      {/* {loading ? (
        <ActivityIndicator />
      ) : ( */}
      <RN.Image
        style={styles.wall}
        source={{uri: imgUrl}}
        // onLoadEnd={listenDownload}
      />
      {/* )} */}
      <RN.Pressable style={styles.radio}>
        <RadioBtn active={select} onPress={onSelect} />
      </RN.Pressable>
    </RN.Pressable>
  );
};

export default observer(WallpaperItem);

const styles = StyleSheet.create({
  container: {
    width: '32%',
    height: windowHeight / 3 - 60,
    marginBottom: 5,
  },
  wall: {
    width: '100%',
    height: '100%',
  },
  radio: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
});
