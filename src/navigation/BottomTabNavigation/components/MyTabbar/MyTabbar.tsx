import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {BG, Images} from '../../../../assets';
import RN from '../../../../components/RN';
import TextView from '../../../../components/Text/Text';
import {APP_ROUTES} from '../../../routes';
import {styles} from './MyTabbar.styles';
import BottomSheet from '@gorhom/bottom-sheet';
import useRootStore from '../../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import {splitCamelCaseAndRemoveScreen} from '../../../../helper/validation';

type TabBarItem = {
  route: any;
  index: number;
};

const MyTabbar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {inActiveMenus, initialRouteName, themeState} =
    useRootStore().personalAreaStore;
  const renderTabBar = React.useCallback(
    ({route, index}: TabBarItem) => {
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
            return <themeState.bottomSheetIcons.home />;
          case APP_ROUTES.TOOLS:
            return <themeState.bottomSheetIcons.watchAtelier />;
          case APP_ROUTES.MARKET:
            return <themeState.bottomSheetIcons.market />;
          case APP_ROUTES.OTHER:
            return <themeState.bottomSheetIcons.messenger />;
            case APP_ROUTES.HOME_START_AR:
            return <themeState.bottomSheetIcons.home />;
          case APP_ROUTES.TOOLS_AR:
            return <themeState.bottomSheetIcons.watchAtelier />;
          case APP_ROUTES.MARKET_AR:
            return <themeState.bottomSheetIcons.market />;
          case APP_ROUTES.OTHER_AR:
            return <themeState.bottomSheetIcons.messenger />;
          default:
            return <themeState.bottomSheetIcons.home />;
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
        if (bottomScrollViewRef.current) {
          bottomScrollViewRef.current.scrollTo({
            y: 0,
            animated: true,
          });
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
          <RN.View style={styles.iconBox}>{renderIcon()}</RN.View>
          <TextView text={splitCamelCaseAndRemoveScreen(route.name)} />
        </RN.TouchableOpacity>
      );
    },
    [inActiveMenus, initialRouteName, themeState],
  );
  const renderTabBars = () =>
    state.routes.map((route, index) => renderTabBar({route, index}));

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const bottomScrollViewRef = React.useRef(null);

  const current: {key: string; type: string}[] = navigation.getState()
    .history as never;

  const snapPoints = React.useMemo(
    () => [current[1]?.key.includes('WatchConstructor') ? 0.0001 : 115],
    [current],
  );

  return (
    <RN.View
      style={[styles.bottomSheet, {backgroundColor: themeState.mainBack}]}>
      <RN.View
        style={[
          styles.renderTabBarsContainer
        ]}>
        {renderTabBars()}
      </RN.View>
    </RN.View>
  );
};

export default observer(MyTabbar);
