import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../hooks/useRootStore';
import {Images} from '../../assets/index';
import Input from '../../components/Input/Input';
import { t } from '../../i18n';

const NewProjectTimerPrice = () => {
  const {setNewProjectTimeState, newProjectTimerState} = useRootStore().projectTimer;
  const [price, setPrice] = useState<string>(newProjectTimerState.price || '');

  const navigation = useNavigation();

  const handlePriceChange = (text: string) => {
    setPrice(text);
  };

  const handleSave = () => {
    setNewProjectTimeState('price', price);
    navigation.goBack();
  };

  useEffect(() => {
    setPrice(newProjectTimerState.price || '');
  }, [newProjectTimerState.price]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title={`${t("Price")}`}
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.priceBox}>
              <Input
                value={price}
                onChangeText={handlePriceChange}
                placeholder={`${t("Enter a price")}`}
                maxLenght={16}
                keyBoardType='Numeric'
              />
            </RN.View>
            <StartBtn
              text={`${t("ok")}`}
              onPress={handleSave}
              primary
              subWidth={70}
              elWidth={55}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(NewProjectTimerPrice);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  priceBox: {
    justifyContent: 'center',
    height: '50%',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  content: {
    height: '88%',
    justifyContent: 'space-between',
  },
});
