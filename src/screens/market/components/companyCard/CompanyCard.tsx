import * as React from 'react';
import {Text, View, StyleSheet, ImageSourcePropType} from 'react-native';
import {Images} from '../../../../assets';
import RN from '../../../../components/RN';
import {COLORS} from '../../../../utils/colors';
import {windowWidth} from '../../../../utils/styles';
import useRootStore from '../../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {
  companyImage?: ImageSourcePropType;
  companyLogo?: React.ReactNode;
  companyInfo?: string;
  onPress?: () => void;
};

const CompanyCard: React.FC<Props> = ({
  companyImage,
  companyInfo,
  companyLogo,
  onPress,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.Pressable
      style={[styles.container, {backgroundColor: themeState.mainBack}]}
      onPress={onPress}>
      <RN.View style={styles.companyCardLeft}>
        <RN.Image style={styles.light} source={Images.Img.marketCardLight} />
        <RN.Image style={styles.company} source={companyImage} />
      </RN.View>
      <RN.View style={styles.companyCardRight}>
        {companyLogo}
        <RN.Text
          style={[styles.companyCardRightInfo, {color: themeState.title}]}>
          {companyInfo}
        </RN.Text>
      </RN.View>
    </RN.Pressable>
  );
};

export default observer(CompanyCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 200,
  },
  companyCardRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  companyCardRightInfo: {
    color: COLORS.lightGrey,
  },
  companyCardLeft: {
    height: '100%',
    width: '50%',
    paddingLeft: 15,
    justifyContent: 'center',
  },
  company: {
    width: '100%',
    objectFit: 'contain',
  },
  light: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: windowWidth / 2,
  },
});
