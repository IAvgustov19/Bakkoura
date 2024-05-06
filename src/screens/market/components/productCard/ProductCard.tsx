import * as React from 'react';
import {Text, View, StyleSheet, ImageSourcePropType} from 'react-native';
import {Images} from '../../../../assets';
import RN from '../../../../components/RN';
import {COLORS} from '../../../../utils/colors';

type Props = {
  image?: ImageSourcePropType;
  name?: string;
  model?: string;
  info?: string;
};

const ProductCard: React.FC<Props> = ({info, image, model, name}) => {
  return (
    <View style={styles.container}>
      <RN.Image style={styles.prImage} source={image} />
      <RN.View style={styles.info}>
        <RN.Text style={styles.productName}>{name}</RN.Text>
        <RN.Text style={styles.productModel}>{model}</RN.Text>
        <RN.Text style={styles.productInfo}>{info}</RN.Text>
      </RN.View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: COLORS.darkGrey,
    gap: 20,
  },
  prImage: {
    width: '100%',
    height: 220,
    objectFit: 'contain',
  },
  info: {
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 5,
  },
  productName: {
    color: COLORS.white,
    fontSize: 26,
    textAlign: 'center',
  },
  productModel: {
    color: COLORS.white,
  },
  productInfo: {
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: '100',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
