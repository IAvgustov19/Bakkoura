import * as React from 'react';
import {Text, View, StyleSheet, ImageSourcePropType} from 'react-native';
import {Images} from '../../../../assets';
import RN from '../../../../components/RN';
import {COLORS} from '../../../../utils/colors';

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
  return (
    <RN.Pressable style={styles.container} onPress={onPress}>
      <RN.View style={styles.companyCardLeft}>
        <RN.Image style={styles.company} source={companyImage} />
      </RN.View>
      <RN.View style={styles.companyCardRight}>
        {companyLogo}
        <RN.Text style={styles.companyCardRightInfo}>{companyInfo}</RN.Text>
      </RN.View>
    </RN.Pressable>
  );
};

export default CompanyCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkGrey,
    padding: 10,
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
    width: '50%',
  },
  company: {
    width: '100%',
    objectFit: 'contain',
  },
});
