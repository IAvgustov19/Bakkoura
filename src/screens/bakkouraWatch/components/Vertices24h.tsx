import { Canvas, Group, Path, PathProps, Skia } from '@shopify/react-native-skia';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Images } from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import { COLORS } from '../../../utils/colors';
import { windowWidth } from '../../../utils/styles';

const STROKE_WIDTH = 20;
const RADIUS = 140;
const xMargin = windowWidth / 13;
// windowWidth < 385
//   ? 30
//   : windowWidth > 415
//   ? windowWidth / 7
//   : windowWidth > 400
//   ? windowWidth / 7.5
//   : 45;
const YMargin = 35;

const path = Skia.Path.Make();

path.addCircle(RADIUS + 17, RADIUS + 15, RADIUS);

const basePathOption: PathProps = {
    path,
    start: 0,
    end: 1,
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

const Vertices24h: React.FC<VerticesType> = ({
    data = [{ start: 0, end: 0, color: '' }],
    watchBack,
    watchFront,
    watchLines,
}) => {
    const { calendarCurrentTime } = useRootStore().calendarStore;
    const { homeCurrentTime, today } = useRootStore().homeClockStore;
    const { themeState } = useRootStore().personalAreaStore;

    return (
        <RN.View style={styles.watchBox}>
            <RN.Image
                style={styles.bakkouraWatch}
                source={watchBack ? watchBack : themeState.bakkouraWatchs.watchBack}
            />
            <RN.Image
                style={styles.bakkouraWatchHours}
                source={watchFront ? watchFront : themeState.bakkouraWatchs.watchFront}
            />
            {data.map((item, index) => {
                return (
                    <Canvas
                        style={[styles.canvasContainer]}
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
                            { transform: `rotate(${homeCurrentTime.minut}deg)` },
                        ]}
                    />
                    <RN.View
                        style={[
                            styles.hourLine,
                            {
                                transform: `rotate(${homeCurrentTime.hour}deg)`,
                            },
                        ]}
                    />
                </>
            ) : null}
        </RN.View>
    );
};

const ChartItem: FC<PathProps> = observer(props => {
    const end = useSharedValue(0);

    useEffect(() => {
        end.value = withTiming(props.end, { duration: 1000 });
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
        width: 350,
        objectFit: 'contain'
    },
    bakkouraWatchHours: {
        position: 'absolute',
        zIndex: 1,
        width: 280,
        objectFit: 'contain',
    },
    canvasContainer: {
        flex: 1,
        position: 'absolute',
        objectFit: 'contain',
        transform: [
            {
                rotate: '-90deg',
            },
        ],

        height: 310,
        width: 310
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
    }
});

export default observer(Vertices24h);
