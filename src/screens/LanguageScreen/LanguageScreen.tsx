import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';
import {COLORS} from '../../utils/colors';
import {Languages} from '../../utils/languages';

const LanguageScreen = () => {
  const navigation = useNavigation();
  const [language, setlanguage] = useState(0);
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
            title="Languages"
          />
          <RN.FlatList
            style={styles.languages}
            data={Languages}
            renderItem={({item, index}) => {
              return (
                <RN.TouchableOpacity
                  style={styles.languagesBox}
                  onPress={() => setlanguage(index)}>
                  <RadioBtn active={language === index} />
                  <RN.Text style={styles.language}>{item}</RN.Text>
                </RN.TouchableOpacity>
              );
            }}
          />
        </RN.View>
      }
    />
  );
};

export default LanguageScreen;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 15,
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
});
