import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Images} from '../../assets';
import GeneralModal from '../../components/GeneralModal/GeneralModal';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SimpleBtn from '../../components/SimpleBtn/SimpleBtn';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {windowHeight} from '../../utils/styles';
import CompanyCard from './components/companyCard/CompanyCard';
import ProductCard from './components/productCard/ProductCard';
import Thanks from './components/thanks/Thanks';

const MarketScreen = () => {
  const navigation = useNavigation();
  const {onHandleWebVIew} = useRootStore().marketStore;

  const onHandleCategory = (link: string) => {
    navigation.navigate(APP_ROUTES.MARKET_WEB_VIEW as never);
    onHandleWebVIew(link);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Market"
          />
          <RN.View style={styles.content}>
            <RN.View style={styles.companies}>
              <CompanyCard
                onPress={() =>
                  onHandleCategory('https://www.badreya.com/brand/bakkoura')
                }
                companyLogo={<Images.Svg.bakkouraLogo width={'100%'} />}
                companyImage={Images.Img.companyCardImage}
                companyInfo={'We decided to be!'}
              />
              <CompanyCard
                companyLogo={<Images.Svg.francvilaLogo />}
                companyImage={Images.Img.companyCardImage}
                companyInfo={'Espirit Unique'}
                onPress={() =>
                  onHandleCategory('https://www.badreya.com/brand/franc-vila')
                }
              />
            </RN.View>
            <SimpleBtn
              title="Order the watch"
              onPress={() =>
                navigation.navigate(APP_ROUTES.ORDER_SCREEN as never)
              }
            />
          </RN.View>
          <GeneralModal children={<Thanks />} visible={false} />
        </RN.View>
      }
    />
  );
};

export default observer(MarketScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 3.5,
  },
  companies: {
    gap: 10,
  },
});
