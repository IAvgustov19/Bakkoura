import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import ButtonComp from '../../components/Button/Button';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import WallpaperItem from './components/WallpaperiItem';

const Wallpapers = () => {
  const navigation = useNavigation();
  const {
    setSelectedWallpapers,
    getSelectedWallpapers,
    getAllWallpapers,
    saveImagesToGallery,
  } = useRootStore().timeBiotic;
  const onHandleBack = () => {
    navigation.goBack();
  };

  const renderWallpapers = useCallback(() => {
    return getAllWallpapers.map((item, index) => {
      return (
        <WallpaperItem
          key={index}
          imgUrl={item.imgUrl}
          onSelect={() => setSelectedWallpapers(item)}
          select={!!getSelectedWallpapers.find(i => i.id === item.id)?.id}
        />
      );
    });
  }, [getAllWallpapers, getSelectedWallpapers]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Wallpapers"
            leftItem={<ArrowLeftBack onPress={onHandleBack} />}
            rightItem={
              <ButtonComp
                title="Download"
                width={100}
                paddingVertical={8}
                onPress={() => saveImagesToGallery(getSelectedWallpapers)}
              />
            }
          />
          <RN.ScrollView>
            <RN.View style={styles.wallBox}>{renderWallpapers()}</RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(Wallpapers);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  wallBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom: 100,
  },
});
