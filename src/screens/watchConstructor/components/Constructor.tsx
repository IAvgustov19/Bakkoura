import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ConstructorSvgs} from '../../../assets/constructor';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {windowWidth} from '../../../utils/styles';

const Constructor = () => {
  const {currentWatch} = useRootStore().watchConstructor;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.bodyType}>
        <currentWatch.bodyTypes width={windowWidth - 30} />
      </RN.View>
      <RN.View style={styles.backStyle}>
        {currentWatch.backStyles ? (
          <currentWatch.backStyles width={windowWidth - 85} />
        ) : null}
      </RN.View>
      <RN.View style={styles.options}>
        {currentWatch.options ? (
          <RN.Image
            style={styles.optionImage}
            source={currentWatch.options as never}
          />
        ) : null}
      </RN.View>
      <RN.View style={styles.faceType}>
        {currentWatch.faceTypes ? (
          <currentWatch.faceTypes width={windowWidth - 90} />
        ) : null}
      </RN.View>
      <RN.View style={styles.number}>
        {currentWatch.numbers ? (
          <currentWatch.numbers width={windowWidth - 90} />
        ) : null}
      </RN.View>
      <RN.View style={styles.arrows}>
        {currentWatch.arrows ? <currentWatch.arrows /> : null}
      </RN.View>
    </RN.View>
  );
};

export default observer(Constructor);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyType: {},
  backStyle: {
    position: 'absolute',
    paddingBottom: 5,
  },
  faceType: {
    position: 'absolute',
    paddingBottom: 5,
  },
  options: {
    position: 'absolute',
    // backgroundColor: 'red',
  },
  optionImage: {
    width: windowWidth - 90,
    objectFit: 'contain',
  },
  number: {
    position: 'absolute',
    paddingBottom: 5,
  },
  arrows: {
    position: 'absolute',
    top: '25%',
    left: '45%',
  },
});
