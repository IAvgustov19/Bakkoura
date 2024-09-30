import Sound from 'react-native-sound';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import PodcastItem from './components/PodcastItem';
import {podcastData} from '../../utils/podcasts';
import RN from '../../components/RN';
import ListFooter from '../../components/ListFooter/ListFooter';

import {t} from '../../i18n'

Sound.setCategory('Playback');

const Podcasts = () => {
  const navigation = useNavigation();

  const [playingId, setPlayingId] = useState<string | null>(null);

  const onPlayPress = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };
  return (
    <LinearContainer
      children={
        <RN.View>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("Podcast")}`}
          />
          <RN.FlatList
            data={podcastData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            ListFooterComponent={<ListFooter />}
            renderItem={({item}) => (
              <PodcastItem
                id={item.id}
                imageSource={item.imageSource}
                description={item.description}
                time={item.time}
                isPlaying={playingId === item.id}
                soundSource={item.soundSource}
                onPlayPress={onPlayPress}
              />
            )}
          />
        </RN.View>
      }
    />
  );
};

export default Podcasts;

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
