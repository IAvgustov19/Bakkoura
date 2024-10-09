import * as React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import RN from '../../../components/RN';
import SimpleBtn from '../../../components/SimpleBtn/SimpleBtn';
import TextView from '../../../components/Text/Text';
import {COLORS} from '../../../utils/colors';
import useRootStore from '../../../hooks/useRootStore';
import {normalizeHeight} from '../../../utils/dimensions';

type Props = {
  isBtn?: boolean;
  onPressBtn?: () => void;
  onPressItem?: () => void;
  title?: string;
  icon?: any;
  text?: string;
};

const TimeClinicListItem: React.FC<Props> = ({
  isBtn,
  onPressBtn,
  onPressItem,
  text,
  icon,
  title,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.Pressable
      style={[styles.container, {backgroundColor: themeState.mainBack}]}
      onPress={onPressItem}>
      <RN.View
        style={[
          styles.clinicItemLeft,
          {
            maxWidth: isBtn ? '55%' : '85%',
            flexDirection: icon ? 'row' : 'column',
            alignItems: icon ? 'center' : 'flex-start',
          },
        ]}>
        {icon && icon}
        <TextView style={styles.title} title={title} textAlign="left" />
        {text ? (
          <TextView text={text} style={styles.listInfo} textAlign="left" />
        ) : null}
      </RN.View>
      <RN.View>
        {isBtn ? (
          <ButtonComp title="Consultation" width={125} onPress={onPressBtn} />
        ) : (
          <RN.TouchableOpacity onPress={onPressItem}>
            <themeState.arrowRight />
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
    fontSize: 17
  },
});
