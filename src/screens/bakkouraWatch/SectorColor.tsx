import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../assets';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {SelectColorData} from '../../utils/colors';

const SectorColor = () => {
  const navigation = useNavigation();
  const {onSelectSectorColor, newSelectState} =
    useRootStore().bakkouraWatchStore;

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Color"
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.colorsList}>
              {SelectColorData.map((item, index) => {
                return (
                  <RN.TouchableOpacity
                    key={index}
                    onPress={() => onSelectSectorColor(item.id)}>
                    {newSelectState.color === item.color ? (
                      <RN.Pressable style={styles.selected}>
                        <Images.Svg.colorBorder />
                      </RN.Pressable>
                    ) : null}
                    <Images.Svg.colorBox fill={item.color} />
                  </RN.TouchableOpacity>
                );
              })}
            </RN.View>
            <StartBtn
              text="Ok"
              subWidth={70}
              elWidth={55}
              primary
              onPress={() => navigation.goBack()}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(SectorColor);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    justifyContent: 'space-between',
    height: '86%',
  },
  colorsList: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  selected: {
    position: 'absolute',
    top: -8,
    left: -8,
  },
});
