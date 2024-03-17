import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {BG, Images} from '../../../../assets';
import RN from '../../../../components/RN';
import TextView from '../../../../components/Text/Text';
import {APP_ROUTES} from '../../../routes';
import {bottomTabBarOptions} from '../../BottomTabNavigation.constants';
import {styles} from './MyTabbar.styles';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

type TabBarItem = {
  route: any;
  index: number;
};

const MyTabbar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const renderTabBar = ({route, index}: TabBarItem) => {
    const {options} = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const renderIcon = () => {
      switch (label as APP_ROUTES) {
        case APP_ROUTES.HOME_START:
          return <Images.Svg.homeIcon />;
        case APP_ROUTES.EVENTS_SCREEN:
          return <Images.Svg.calendarIcon />;
        case APP_ROUTES.STRESS_TEST:
          return <Images.Svg.stressTest />;
        case APP_ROUTES.ALARM_SCREEN:
          return <Images.Svg.alarmIcon />;
        case APP_ROUTES.TIMER:
          return <Images.Svg.timerIcon />;
        case APP_ROUTES.PROJECT_TIMER:
          return <Images.Svg.projectTimerIcon />;
        case APP_ROUTES.WORLD_TIME:
          return <Images.Svg.worldTimeIcon />;
        case APP_ROUTES.STOP_WATCH:
          return <Images.Svg.stopWatchIcon />;
        case APP_ROUTES.METRONOME:
          return <Images.Svg.metronomeIcon />;
        case APP_ROUTES.MESSENGER:
          return <Images.Svg.messengerIcon />;
        case APP_ROUTES.MARKET:
          return <Images.Svg.marketIcon />;
        case APP_ROUTES.TODOTIMER:
          return <Images.Svg.todoIcon />;
        default:
          return <Images.Svg.stopWatchIcon />;
      }
    };

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      bottomSheetRef.current?.collapse();
      if (!event.defaultPrevented) {
        navigation.navigate({name: route.name, merge: true} as any);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <RN.TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.5}
        style={styles.buttonContainer}
        key={index}>
        {renderIcon()}
        <TextView text={bottomTabBarOptions.list[index].buttonLabel} />
      </RN.TouchableOpacity>
    );
  };
  const renderTabBars = () =>
    state.routes.map((route, index) => renderTabBar({route, index}));

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ['13.5%', '80%'], []);

  return (
    <BottomSheet
      handleComponent={() => (
        <RN.TouchableOpacity style={styles.dotMenu}>
          <Images.Svg.dotOpenBar />
        </RN.TouchableOpacity>
      )}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      style={styles.bottomSheet}>
      <BottomSheetView style={styles.container}>
        <RN.ImageBackground
          source={BG.bottomSheetBg}
          resizeMode="stretch"
          style={styles.borderContainer}>
          <RN.View style={styles.renderTabBarsContainer}>
            {renderTabBars()}
          </RN.View>
        </RN.ImageBackground>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default MyTabbar;
