import React from 'react';
import {memo, MutableRefObject, useMemo, useRef} from 'react';
import {
  Animated,
  FlatListProps,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RN from '../RN';

export const themeColors = {
  black: '#000000',
  primary: '#D7D7D8',
  disabled: '#8A8A8F',
  surface: '#131319',
  error: '#FC3361',
};

export type ItemType = {value: number | Date; text: string; id: string};
export type ListItemStyleType = {color?: string; backgroundColor?: string};

const NUMBER_OF_ITEMS = 5;

type CustomListItemStyleType = (ListItemStyleType & TextStyle) | undefined;

type Props = {
  data: Array<ItemType>;
  selectedValue: MutableRefObject<number | Date>;
  onChange: () => void;
  style?: ViewStyle;
  listItemStyle?: CustomListItemStyleType | CustomListItemStyleType[];
  itemHeight: number;
  initialScrollIndex: number;
  separatorColor?: string;
  flatListProps?: Partial<FlatListProps<ItemType>>;
  label?: string;
};

const List = ({
  data,
  itemHeight,
  selectedValue,
  onChange,
  initialScrollIndex,
  style,
  listItemStyle,
  separatorColor,
  flatListProps = {},
  label,
}: Props) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const {flatListStyle, iosTextVerticalCenter, textStyle, dividerStyle} =
    useMemo(
      () => ({
        flatListStyle: {height: itemHeight * NUMBER_OF_ITEMS},
        iosTextVerticalCenter: {lineHeight: itemHeight},
        textStyle: {height: itemHeight},
        dividerStyle: {
          height: itemHeight,
          marginVertical: itemHeight * 2,
          ...(separatorColor ? {borderColor: separatorColor} : {}),
        },
      }),
      [itemHeight, separatorColor],
    );

  const calculateStyle = (i: number) => {
    const arr = new Array(data.length).fill(1);
    const mainStyle = 1;
    const secondaryStyle = 0.3;
    const thirdlyStyle = 0.1;
    const opacity = scrollY.interpolate({
      inputRange: [...arr.map((_, index) => index * itemHeight)],
      outputRange: [
        ...arr.map((_, index) => {
          switch (i) {
            case index + 1:
              return secondaryStyle;
            case index + 2:
              return mainStyle;
            default:
              return thirdlyStyle;
          }
        }),
      ],
      extrapolate: 'clamp',
    }) as unknown as number;
    return {opacity};
  };

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: _data,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    snapToInterval,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decelerationRate,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showsVerticalScrollIndicator,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    style: _style,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initialScrollIndex: _initialScrollIndex,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    keyExtractor,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderItem,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItemLayout,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onScroll,
    ...rest
  } = flatListProps;

  return (
    <View style={[styles.container, style]}>
      <Animated.FlatList
        data={data}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        style={flatListStyle}
        initialScrollIndex={initialScrollIndex}
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}) => {
          return (
            <Animated.Text
              style={[
                styles.text,
                textStyle,
                Platform.OS === 'android'
                  ? styles.androidTextVerticalCenter
                  : iosTextVerticalCenter,
                calculateStyle(index),
                listItemStyle,
              ]}>
              {item.text}
            </Animated.Text>
          );
        }}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: (e: any) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.y / itemHeight,
              );
              const value = data[index + 2]?.value ?? -1;
              if (value !== -1) {
                selectedValue.current = value;
                onChange();
              }
            },
          },
        )}
        {...rest}
      />
      <RN.View pointerEvents="box-none" style={[styles.divider, dividerStyle]}>
        {/* <LinearGradient
          pointerEvents="box-none"
          style={[styles.divider, dividerStyle]}
          //   start={{x: 0, y: 0}}
          //   end={{x: 1, y: 0}}
          colors={[]}> */}
        <RN.Text style={styles.label}>{label}</RN.Text>
        {/* </LinearGradient> */}
      </RN.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  androidTextVerticalCenter: {
    textAlignVertical: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingRight: 10,
    fontSize: 28,
  },
  divider: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ECC271',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  label: {
    position: 'absolute',
    paddingBottom: 12,
    color: '#cac9c9',
    fontSize: 14,
    right: 0,
  },
});

export default List;
