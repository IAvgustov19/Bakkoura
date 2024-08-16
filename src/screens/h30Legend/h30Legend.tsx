import React from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {H30LegendDataTexts} from '../../constants/timeClinic';
import {windowHeight} from '../../utils/styles';
import H30LegendTexts from './components/H30LegendTexts';

const H30Legend = () => {
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="30h Legend"
          />
          <RN.ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <H30LegendTexts texts={H30LegendDataTexts} />
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default H30Legend;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingBottom: windowHeight - windowHeight / 1.5,
  },
});
