import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import TextView from '../../components/Text/Text';
import ButtonComp from '../../components/Button/Button';
import GiveImage from '../../components/GiveImage/GiveImage';
import {Images} from '../../assets';
import {windowHeight} from '../../utils/styles';
import useRootStore from '../../hooks/useRootStore';

const ContactThanks = () => {
  const {responseText} = useRootStore().timeBiotic;
  const navigation = useNavigation();

  const renderResponse = useMemo(() => {
    return <TextView text={responseText} />;
  }, [responseText]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          {/* <Images.Svg.bg style={styles.bg} /> */}
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <TextView title="Thank You" />
            {renderResponse}
            <ButtonComp
              title="OK"
              width={'50%'}
              onPress={() => navigation.goBack()}
              icon={<GiveImage source={Images.Img.eye} />}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(ContactThanks);

const styles = RN.StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  bg: {
    position: 'absolute',
  },
  content: {
    paddingHorizontal: 10,
    height: windowHeight - windowHeight / 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
