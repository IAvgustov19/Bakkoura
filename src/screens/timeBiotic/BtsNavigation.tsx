import React from 'react';
import {useNavigation} from '@react-navigation/native';

import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import {BtsNavigationItems} from '../../utils/btsNavigation';
import TextView from '../../components/Text/Text';
import {windowHeight} from '../../utils/styles';
import {COLORS} from '../../utils/colors';
import RN from '../../components/RN';
import ListFooter from '../../components/ListFooter/ListFooter';
import useRootStore from '../../hooks/useRootStore';

const BtsNavigation = () => {
  const {themeState} = useRootStore().personalAreaStore;
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    const renderIcon = () => {
      switch (item.key) {
        case 'home':
          return <themeState.bottomSheetIcons.home />;
        case 'market':
          return <themeState.bottomSheetIcons.market />;
        case 'messenger':
          return <themeState.bottomSheetIcons.messenger />;
        case 'todoTimer':
          return <themeState.bottomSheetIcons.todoTimer />;
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
        case 'alarmClock':
          return <themeState.bottomSheetIcons.alarm />;
        case 'jihadBakkoura':
          return <themeState.bottomSheetIcons.jihadBakkoura />;
        case 'timeClinic':
          return <themeState.bottomSheetIcons.timeClinic />;
        case '30hLegend':
          return <themeState.bottomSheetIcons.h30Legend />;
        case 'assessment':
          return <themeState.bottomSheetIcons.assessmentWatch />;
        case 'watchConstructor':
          return <themeState.bottomSheetIcons.watchConstructor />;
        case 'sendYourIdea':
          return <themeState.bottomSheetIcons.sendYourIdea />;
        case 'timeBiotic':
          return <themeState.bottomSheetIcons.timeBiotic />;
        case 'aboutTime':
          return <themeState.bottomSheetIcons.aboutTime />;
        case 'francVilla':
          return <themeState.bottomSheetIcons.francWillaWatch />;
        case 'wallpapers':
          return <themeState.bottomSheetIcons.wallpaper />;
        case 'contactUs':
          return <themeState.bottomSheetIcons.contactUs />;
        case 'btsNav':
          return <themeState.bottomSheetIcons.btsNavigations />;
        case 'timeWealth':
          return <themeState.bottomSheetIcons.timeWealth />;
        default:
          return <themeState.bottomSheetIcons.home />;
      }
    };
    return (
      <RN.View style={styles.itemContainer}>
        <RN.View style={styles.itemInfo}>
          {renderIcon()}
          <TextView text={item.label} style={styles.label} />
        </RN.View>
        <TextView
          textAlign="left"
          text={item.text}
          style={styles.text}
          color={themeState.darkGrayText}
        />
      </RN.View>
    );
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
            title="BTS Navigation"
          />
          <RN.View style={styles.content}>
            <RN.FlatList
              data={BtsNavigationItems}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={<ListFooter />}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default BtsNavigation;

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    paddingTop: 18,
    paddingBottom: 70,
  },
  itemContainer: {
    gap: 35,
    display: 'flex',
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  itemInfo: {alignItems: 'center', width: 80},
  label: {
    fontSize: 13,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: COLORS.white,
  },
});
