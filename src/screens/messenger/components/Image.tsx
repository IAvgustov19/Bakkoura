import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Sound from 'react-native-sound';
import { observer } from 'mobx-react-lite';
import { Images } from '../../../assets';
import RN from '../../../components/RN';

const ImageComponent = (props) => {
  return (
    <View style={styles.container}>
      {props?.currentMessage?.images?.map((image, idx) => {
        console.log(image,"imageimage");
        
        return image && <RN.Image key={idx} source={{uri:image}} />})}
    </View>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audio: {
    width: 200,
    gap: 16,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  audioInfo: {
    gap: 11,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  fileName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  mainDis: {
    fontSize: 14,
    color: '#7D7D7D',
    fontFamily: 'RadHatDisplay-Regular',
  }
});
