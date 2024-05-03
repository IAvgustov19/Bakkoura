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

export default function PersonalDetails() {
  const navigation = useNavigation();

  const [name, setName] = useState('');

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
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
          <RN.ScrollView style={styles.scrollView}>
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
                  onPress={() => { }}
                  primary={true}
                  text={'Ok'}
                  subWidth={70}
                  elWidth={55}
                />
              </RN.View>
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  )
}



const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: '100%',
  },
  scrollView: {},
  content: {
    paddingTop: 25,
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 6,
  },
  addBtn: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
    width: '100%',
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
});
