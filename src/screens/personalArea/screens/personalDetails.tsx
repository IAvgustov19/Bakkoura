import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import Input from '../../../components/Input/Input';
import { windowHeight } from '../../../utils/styles';
import TextView from '../../../components/Text/Text';
import { Images } from '../../../assets';
import RN from '../../../components/RN';

const PersonalDetails = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <Images.Svg.bg style={styles.bg} />
          <HeaderContent
            leftItem={
              <RN.TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}>
                <Images.Svg.arrowLeft />
                <TextView text="Back" />
              </RN.TouchableOpacity>
            }
            title="Name"
          />
          <RN.ScrollView>
            <RN.View style={styles.content}>
              <RN.View style={styles.inputBox}>
                <Input
                  placeholder="Jihad Bakkoura"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
                <RN.TouchableOpacity
                  style={styles.deleteBox}
                  onPress={() => setName('')}
                >
                  <Images.Svg.deleteIcon />
                </RN.TouchableOpacity>

              </RN.View>
              <RN.View style={styles.addBtn}>
                <StartBtn
                  primary={true}
                  text={'Ok'}
                  subWidth={70}
                  elWidth={55}
                  onPress={() => navigation.goBack()}
                />
              </RN.View>
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  )
}

export default PersonalDetails;


const styles = RN.StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    paddingHorizontal: 10,
  },
  scrollView: {},
  content: {
    paddingTop: 25,
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 6,
  },
  addBtn: {
    bottom: 20,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inputBox: {
    paddingHorizontal: 5,
  },
  deleteBox: {
    position: 'absolute',
    right: '7%',
    top: '30%',
  },
  bg: {
    position: 'absolute',
  }
});
