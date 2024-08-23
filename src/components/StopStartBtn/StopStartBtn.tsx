import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Images} from '../../assets/index';
import RN from '../RN';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type componentNameProps = {
  text?: any;
  primary?: boolean;
  onPress?: () => void;
  subWidth?: number | string;
  elWidth?: number | string;
  textSize?: string | any;
  color?: string;
  icon?: React.ReactNode;
};

const StartBtn = (props: componentNameProps) => {
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <TouchableOpacity style={[styles.container]} onPress={props.onPress}>
      {props.primary ? (
        <>
          <Images.Svg.subtrack
            style={styles.subtrack}
            width={props.subWidth ? props.subWidth : 90}
          />
          <Images.Svg.ellipse
            style={styles.ellipse}
            width={props.elWidth ? props.elWidth : 75}
          />
        </>
      ) : (
        <>
          <themeState.substrack
            style={styles.subtrack}
            width={props.subWidth ? props.subWidth : 90}
          />
          <themeState.ellipse
            style={styles.ellipse}
            width={props.elWidth ? props.elWidth : 75}
          />
        </>
      )}
      {props.icon ? (
        <RN.View style={styles.addIcon}>{props.icon}</RN.View>
      ) : null}
      <Text
        style={[
          props.primary ? styles.primaryText : styles.outlineText,
          {
            fontSize: props.textSize ? props.textSize : 18,
            color: props.color
              ? props.color
              : props.primary
              ? '#000'
              : themeState.title,
          },
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default observer(StartBtn);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtrack: {
    position: 'absolute',
  },
  ellipse: {},
  addIcon: {
    position: 'absolute',
  },
  primaryText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'RedHatDisplay-Regular',
  },
  outlineText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'RedHatDisplay-Regular',
    fontWeight: '400',
  },
});
