import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import { windowHeight } from '../../utils/styles';
import TimeClinicListItem from '../timeClinic/components/TimeClinicListItem';
import { TimeBioticList } from '../../constants/timeBiotic';
import { OtherList } from '../../constants/other';

const Other = () => {
  const navigation = useNavigation();

  const renderItem = useCallback(({ item }) => {
    return (
      <TimeClinicListItem
        title={item.title}
        text={item.info}
        isBtn={item.isbtn}
        onPressItem={() => navigation.navigate(item.navigate as never)}
      />
    );
  }, []);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Other"
          />
          <RN.View style={styles.content}>
            <RN.FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatlist}
              data={OtherList}
              renderItem={({ item }) => renderItem({ item })}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(Other);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  bgContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
  },
  content: {
    gap: 5,
  },
  flatlist: {
    height: '85%',
  },
});
