import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Images } from '../../assets';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import useRootStore from '../../hooks/useRootStore';
import TextView from '../../components/Text/Text';
import { COLORS } from '../../utils/colors';
import { observer } from 'mobx-react-lite';
import RN from '../../components/RN';

const LanguageScreen = () => {
  const navigation = useNavigation();

  const {
    languages,
    onLanguageItemPress,
    selectedLanguage,
  } = useRootStore().personalAreaStore;

  console.log(selectedLanguage)


  const renderItem = ({ item, index }) => {
    return (
      <RN.TouchableOpacity
        style={styles.languagesBox}
        onPress={() => onLanguageItemPress(index)}>
        <RadioBtn active={item.active} onPress={() => onLanguageItemPress(index)} />
        <RN.Text style={styles.language}>{item.title}</RN.Text>
      </RN.TouchableOpacity>
    )
  }

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          {/* <RN.View style={styles.bgContainer}>
            <Images.Svg.bg style={styles.bg} />
          </RN.View> */}
          <HeaderContent
            leftItem={
              <RN.TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}>
                <Images.Svg.arrowLeft />
                <TextView text="Back" />
              </RN.TouchableOpacity>
            }
            title="Languages"
          />
          <RN.FlatList
            data={languages}
            renderItem={renderItem}
            style={styles.languages}
            keyExtractor={(item, index) => index.toString()}
          />
          <RN.View style={styles.addBtn}>
            <StartBtn
              onPress={() => navigation.goBack()}
              primary={true}
              text={'Ok'}
              subWidth={70}
              elWidth={55}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(LanguageScreen);

const styles = RN.StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 15,
  },
  bgContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  languages: {
    paddingHorizontal: 10,
  },
  languagesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  language: {
    color: COLORS.white,
    fontSize: 16,
  },
  addBtn: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
    width: '100%',
  },
});
