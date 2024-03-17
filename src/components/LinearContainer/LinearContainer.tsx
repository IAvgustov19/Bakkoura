import * as React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BG, Images} from '../../assets';
import RN from '../RN';

type Props = {
  children: React.ReactNode;
};

const LinearContainer: React.FC<Props> = ({children}) => {
  return (
    <LinearGradient
      colors={['#323D45', '#1B2024', '#020202']}
      style={styles.container}>
      <RN.View style={styles.borderImage}>
        {/* <Images.Svg.borderBg
          style={{
            position: 'absolute',
            left: 10,
            top: 25,
          }}
          width={'100%'}
        /> */}
        {children}
      </RN.View>
    </LinearGradient>
  );
};

export default LinearContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderImage: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingLeft: 10,
    height: '100%',
    position: 'absolute',
  },
});
