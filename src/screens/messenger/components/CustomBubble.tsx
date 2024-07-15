// CustomMessage.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Bubble} from 'react-native-gifted-chat';
import moment from 'moment';
import RN from '../../../components/RN';

const CustomTime = props => {
  const {currentMessage, position} = props;
  return (
    <View>
      <Text
        style={[
          styles.time,
          {textAlign: position === 'right' ? 'right' : 'left'},
        ]}>
        {moment(currentMessage.createdAt).format('HH:mm')}
      </Text>
    </View>
  );
};


const CustomMessage = (props) => {
    const { currentMessage } = props;
    const { image, user } = currentMessage;
    const { selectedImage, imageName, imageSize } = currentMessage;

    // console.log('currentMessagecurrentMessage', currentMessage)

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.name}>{currentMessage.user.name}</Text>
        <Bubble
          {...props}
          wrapperStyle={{
            left: styles.bubbleLeft,
            right: styles.bubbleRight,
          }}
          textStyle={{
            left: styles.textLeft,
            right: styles.textRight,
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
  },
  bubbleRight: {
    color: 'white',
    backgroundColor: '#313131',
    borderRadius: 15,
    padding: 10,
  },
  textLeft: {
    color: '#fff',
  },
  textRight: {
    color: '#fff',
  },
  time: {
    fontFamily: 'SF Pro Text',
    fontSize: 11,
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: 13.13,
    color: '#fff',
    // backgroundColor: 'red'
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'red',
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
});

export default CustomMessage;
