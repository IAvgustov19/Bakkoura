import {
  Canvas,
  Circle,
  Group,
  Path,
  PathProps,
  Skia,
} from '@shopify/react-native-skia';
import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useRef} from 'react';
import {ImageSourcePropType, StyleSheet} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import {windowHeight, windowWidth} from '../../../utils/styles';

const SIZE = 360;
const STROKE_WIDTH = 12;
const MARGIN = 15;
const RADIUS = 130;

const path = Skia.Path.Make();
let width =
  windowHeight > 920
    ? windowWidth / 9.5
    : windowHeight > 850
    ? windowWidth / 40
    : windowWidth / 15;

path.addCircle(
  RADIUS + STROKE_WIDTH + MARGIN + width,
  RADIUS + STROKE_WIDTH + MARGIN,
  RADIUS,
);

const basePathOption: PathProps = {
  path,
  start: 0,
  end: 0,
  style: 'stroke',
  strokeWidth: STROKE_WIDTH,
  color: COLORS.green,
};
type VerticesType = {
  data?: {
    start?: number;
    end?: number;
    color?: string;
  }[];
  watchBack?: ImageSourcePropType;
  watchFront?: ImageSourcePropType;
  watchLines?: boolean;
};

const Vertices: React.FC<VerticesType> = ({
  data = [{start: 0, end: 0, color: ''}],
  watchBack,
  watchFront,
  watchLines,
}) => {
  const {calendarCurrentTime} = useRootStore().calendarStore;

  return (
    <RN.View style={styles.watchBox}>
      <RN.Image
        style={styles.bakkouraWatch}
        source={watchBack ? watchBack : Images.Img.sectorWatch}
      />
      <RN.Image
        style={styles.bakkouraWatchHours}
        source={watchFront ? watchFront : Images.Img.bakkouraWatchLines}
      />
      {data.map((item, index) => {
        return (
          <Canvas
            style={[styles.canvasContainer, StyleSheet.absoluteFill]}
            key={index}>
            <ChartItem
              {...basePathOption}
              start={item.start ? item.start : 0}
              end={item.end ? item.end : 0}
              color={item.color ? item.color : 'transparent'}
            />
          </Canvas>
        );
      })}
      {watchLines ? (
        <>
          <RN.View
            style={[
              styles.minutLine,
              {
                transform: `rotate(${
                  Number(calendarCurrentTime.slice(3, 5)) * 6
                }deg)`,
              },
            ]}></RN.View>
          <RN.View
            style={[
              styles.hourLine,
              {
                transform: `rotate(${
                  Number(calendarCurrentTime.slice(0, 2)) * 30
                }deg)`,
              },
            ]}></RN.View>
        </>
      ) : null}
    </RN.View>
  );
};

const ChartItem: FC<PathProps> = observer(props => {
  const end = useSharedValue(0);

  useEffect(() => {
    end.value = withTiming(props.end, {duration: 1000});
  }, [end, props.end]);

  return (
    <Group>
      <Path {...props} />
    </Group>
  );
});

const styles = RN.StyleSheet.create({
  watchBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bakkouraWatch: {
    width: 320,
    height: 315,
    objectFit: 'contain',
  },
  bakkouraWatchHours: {
    position: 'absolute',
    zIndex: 1,
    width: 262,
    objectFit: 'contain',
    height: 262,
  },
  canvasContainer: {
    flex: 1,
    transform: [
      {
        rotate: '-90deg',
      },
    ],
  },
  hourLine: {
    width: 2.5,
    height: '28%',
    backgroundColor: COLORS.yellow,
    position: 'absolute',
    bottom: '49%',
    transformOrigin: 'bottom',
    zIndex: 1,
  },
  minutLine: {
    width: 1.5,
    height: '35%',
    backgroundColor: COLORS.yellow,
    position: 'absolute',
    bottom: '49%',
    transformOrigin: 'bottom',
    zIndex: 1,
  },
});

export default observer(Vertices);
