import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../../assets';
import ButtonComp from '../../../../components/Button/Button';
import HeaderContent from '../../../../components/HeaderContent/HeaderContent';
import RN from '../../../../components/RN';
import SimpleBtn from '../../../../components/SimpleBtn/SimpleBtn';
import TextView from '../../../../components/Text/Text';
import {windowHeight} from '../../../../utils/styles';
import {useNavigation} from '@react-navigation/native';
import LinearContainer from '../../../../components/LinearContainer/LinearContainer';
import Cancel from '../../../../components/Cancel/Cancel';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../../../hooks/useRootStore';
import ArrowLeftBack from '../../../../components/ArrowLeftBack/ArrowLeftBack';

import {t} from '../../../../i18n'

type Props = {};

const OrderThanks: React.FC<Props> = ({}) => {
  const {responseText} = useRootStore().timeBiotic;
  const navigation = useNavigation();

  const renderResponse = React.useMemo(() => {
    return <TextView text={responseText} />;
  }, [responseText]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            rightItem={<Cancel onClose={() => navigation.goBack()} />}
          />
          {/* <HeaderContent leftItem={<Images.Svg.btsGreyLogo /> */}
          <RN.View style={styles.content}>
            <TextView title={`${t('Thank You')}`} />
            {renderResponse}
            <SimpleBtn
              title={'Ok'}
              width={150}
              onPress={() => navigation.goBack()}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(OrderThanks);

const styles = StyleSheet.create({
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
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
