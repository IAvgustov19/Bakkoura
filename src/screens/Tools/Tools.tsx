import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Images} from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import {windowHeight} from '../../utils/styles';
import TimeClinicListItem from '../timeClinic/components/TimeClinicListItem';
import {ToolsList} from '../../constants/tools';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import ListFooter from '../../components/ListFooter/ListFooter';
import useRootStore from '../../hooks/useRootStore';
import {normalizeHeight} from '../../utils/dimensions';

const Tools = () => {
  const navigation = useNavigation();
  const {themeState} = useRootStore().personalAreaStore;

  const renderItem = useCallback(
    ({item}) => {
      const renderIcon = () => {
        switch (item.key) {
          case 'pomodoro':
            return <themeState.bottomSheetIcons.pomodoro />;
          case 'alarm':
            return <themeState.bottomSheetIcons.alarm />;
          case 'metronom':
            return <themeState.bottomSheetIcons.metoronom />;
          case 'timeTogether':
            return <themeState.bottomSheetIcons.timeTogether />;
          case 'todoTimer':
            return <themeState.bottomSheetIcons.todoTimer />;
          case 'timers':
            return <themeState.bottomSheetIcons.timers />;
          case 'prTimer':
            return <themeState.bottomSheetIcons.prTimers />;
          case 'wrTime':
            return <themeState.bottomSheetIcons.wrTime />;
          case 'stWatch':
            return <themeState.bottomSheetIcons.stWatch />;
          case 'stressTest':
            return <themeState.bottomSheetIcons.stressTest />;
          case 'calendar':
            return <themeState.bottomSheetIcons.calendar />;
          case 'bakkouraWatch':
            return <themeState.bottomSheetIcons.bakkouraWatch />;
          default:
            return <themeState.bottomSheetIcons.home />;
        }
      };
      return (
        <TimeClinicListItem
          icon={renderIcon()}
          title={item.title}
          text={item.info}
          isBtn={item.isbtn}
          onPressItem={() => navigation.navigate(item.navigate as never)}
        />
      );
    },
    [themeState],
  );

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            title="Tools"
          />
          <RN.View style={styles.content}>
            <RN.FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatlist}
              data={ToolsList}
              renderItem={({item}) => renderItem({item})}
              ListFooterComponent={<ListFooter />}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(Tools);

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
    paddingBottom: normalizeHeight(400),
  },
  flatlist: {},
});
