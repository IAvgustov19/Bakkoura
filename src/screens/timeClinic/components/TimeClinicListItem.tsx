import * as React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import RN from '../../../components/RN';
import SimpleBtn from '../../../components/SimpleBtn/SimpleBtn';
import TextView from '../../../components/Text/Text';
import {COLORS} from '../../../utils/colors';

type Props = {
  isBtn?: boolean;
  onPressBtn?: () => void;
  onPressItem?: () => void;
  title?: string;
  text?: string;
};

const TimeClinicListItem: React.FC<Props> = ({
  isBtn,
  onPressBtn,
  onPressItem,
  text,
  title,
}) => {
  return (
    <RN.Pressable style={styles.container} onPress={onPressItem}>
      <RN.View
        style={[styles.clinicItemLeft, {maxWidth: isBtn ? '55%' : '85%'}]}>
        <TextView style={styles.title} title={title} />
        <TextView text={text} style={styles.listInfo} />
      </RN.View>
      <RN.View>
        {isBtn ? (
          <ButtonComp title="Consultation" width={125} onPress={onPressBtn} />
        ) : (
          <RN.TouchableOpacity onPress={onPressItem}>
            <Images.Svg.arrowRight />
          </RN.TouchableOpacity>
        )}
      </RN.View>
    </RN.Pressable>
  );
};

export default TimeClinicListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 4,
    marginVertical: 4,
  },
  clinicItemLeft: {
    alignItems: 'flex-start',
    gap: 5,
  },
  listInfo: {
    color: COLORS.darkGreyText,
    writingDirection: 'ltr',
  },
  title: {
    fontSize: 17,
  },
});
