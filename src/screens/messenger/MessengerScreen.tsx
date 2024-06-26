import React from 'react';
import RN from '../../components/RN';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import { Images } from '../../assets';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import { useNavigation } from '@react-navigation/native';
import { windowHeight } from '../../utils/styles';
import { APP_ROUTES } from '../../navigation/routes';
import { Text } from 'react-native';

const MessengerScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <Images.Svg.searchButton width={39} height={39} onPress={() => navigation.navigate(APP_ROUTES.SEARCH_CONTACT as never)}/>
          }
            title="Messenger"
          />
          <RN.View style={styles.content}>
            <Text style={styles.text}>There are no dialogues</Text>
            <RN.ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {/* render chats */}
            </RN.ScrollView>
            <RN.View>
              <StartBtn
                elWidth={55}
                subWidth={75}
                icon={<Images.Svg.btnAddIcon />}
                primary
                onPress={() =>
                  navigation.navigate(APP_ROUTES.SEARCH_CONTACT as never)
                }
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default MessengerScreen;

const styles = RN.StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  flatList: {
    height: windowHeight - windowHeight / 2.6,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // justifyContent: 'space-between',
    height: windowHeight - windowHeight / 3.5,
  },
  text: {
    fontSize: 20,
    color: 'white',
    position: 'absolute',
    textAlign: 'center',
  },
});
