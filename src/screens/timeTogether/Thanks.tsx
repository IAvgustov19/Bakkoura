import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import ButtonComp from '../../components/Button/Button';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import TextView from '../../components/Text/Text';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';
import GiveImage from '../../components/GiveImage/GiveImage';
import { Images } from '../../assets';

const Thanks = () => {
  const navigation = useNavigation();
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <TextView title="Thank’s" />
            <TextView text={`Enter your loved one's email address. We will send a\n request to confirm the status of your relationship.`} />
            <ButtonComp
              width={'50%'}
              title={'Ok'}
              onPress={() =>
                navigation.navigate(APP_ROUTES.TIME_TOGETHER as never)
              }
              icon={<GiveImage source={Images.Img.eye}/>}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(Thanks);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    paddingHorizontal: 10,
    height: windowHeight - windowHeight / 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
