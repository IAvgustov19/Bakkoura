import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BG, Images} from '../../assets';
import useRootStore from '../../hooks/useRootStore';
import {windowHeight} from '../../utils/styles';
import RN from '../RN';

type Props = {
  children: React.ReactNode;
};

const LinearContainer: React.FC<Props> = ({children}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <LinearGradient
      colors={themeState.linearBackground}
      style={styles.container}>
      {/* <RN.View style={styles.borderImage}> */}
      {/* <Images.Svg.borderBg
          style={{
            position: 'absolute',
            left: 10,
            top: 25,
          }}
          width={'100%'}
        /> */}
      {children}
      {/* </RN.View> */}
    </LinearGradient>
  );
};

export default observer(LinearContainer);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: windowHeight + 50,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  // borderImage: {
  //   width: '100%',
  //   paddingVertical: 20,
  //   paddingHorizontal: 10,
  //   paddingLeft: 10,
  //   height: '100%',
  //   position: 'absolute',
  // },
});
