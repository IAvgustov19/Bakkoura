import {View, Text, StyleSheet} from 'react-native';
import {Bubble} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import React from 'react';

import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import {COLORS} from '../../../utils/colors';

const CustomTime = props => {
  const currentUser = auth().currentUser;
  const {currentMessage, position} = props;
  const isRead = currentMessage.read;
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <View style={styles.timeContainer}>
      <Text
        style={[
          styles.time,
          {
            textAlign: position === 'right' ? 'left' : 'right',
            color: COLORS.gray,
          },
        ]}>
        {moment(currentMessage.createdAt).format('HH:mm ')}
        {currentMessage.user._id === currentUser?.uid && (
          <>{isRead ? <Images.Svg.read /> : <Images.Svg.sent/>}</>
        )}
      </Text>
    </View>
  );
};

const CustomMessage = props => {
  const {currentMessage, position} = props;
  const {image, user, reaction} = currentMessage;
  const {selectedImage, imageName, imageSize} = currentMessage;
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.reactionsContainer,
          position === 'right' ? styles.reactionRight : styles.reactionLeft,
        ]}>
        {reaction && (
          <View style={styles.reaction}>
            <Text style={styles.reactionText}>{reaction}</Text>
          </View>
        )}
      </View>
      <View style={styles.messageContainer}>
        <Bubble
          {...props}
          wrapperStyle={{
            left: [
              styles.bubbleLeft,
              {backgroundColor: themeState.messageBack},
            ],
            right: [
              styles.bubbleRight,
              {backgroundColor: themeState.rightMessageBack},
            ],
          }}
          textStyle={{
            left: [styles.textLeft, {color: themeState.title}],
            right: [styles.textRight, {color: themeState.title}],
          }}
          timeTextStyle={{
            right: {
              textAlign: 'right',
            },
            left: {
              textAlign: 'left',
            },
          }}
          renderTime={timeProps => <CustomTime {...timeProps} />}
        />
        {selectedImage && (
          <View style={styles.imageContainer}>
            <RN.Image source={{uri: selectedImage}} style={styles.image} />
            <View style={styles.imageInfo}>
              <Text style={styles.imageName}>{imageName}</Text>
              <Text style={styles.imageSize}>{imageSize} MB</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  messageContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bubbleLeft: {
    color: 'white',
    backgroundColor: '#313131',
    borderRadius: 15,
    padding: 10,
    position: 'relative',
  },
  bubbleRight: {
    color: 'white',
    backgroundColor: '#313131',
    borderRadius: 15,
    position: 'relative',
    padding: 10,
  },
  textLeft: {
    color: '#fff',
  },
  textRight: {
    color: '#fff',
  },
  time: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 13.13,
    fontStyle: 'italic',
    fontFamily: 'SF Pro Text'
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    //backgroundColor: 'red',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  imageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  imageName: {
    fontSize: 12,
    color: '#666666',
  },
  imageSize: {
    fontSize: 12,
    color: '#666666',
  },
  reactionsContainer: {
    bottom: -20,
    zIndex: 1000,
    position: 'absolute',
    alignItems: 'center',
  },
  reactionLeft: {
    left: 0,
  },
  reactionRight: {
    right: 0,
  },
  reaction: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 15,
  },
  reactionText: {
    color: '#fff',
    fontSize: 16,
  },
  timeContainer: {
    gap: 10,
    display: 'flex',
  },
  state_image:{
    marginRight:10
  }
});

export default observer(CustomMessage);
