import React, {useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../../assets';
import {COLORS} from '../../../../utils/colors';
import RN from '../../../../components/RN';
import TextView from '../../../../components/Text/Text';
import {observer} from 'mobx-react-lite';
import * as Progress from 'react-native-progress';
import useRootStore from '../../../../hooks/useRootStore';

type Props = {
  hour?: number;
  minut?: number;
  hour30?: number;
  minut30?: number;
  time?: string;
  country?: string;
  weather?: string;
  date?: string;
  is24?: boolean;
  isLoading?: boolean;
};

const WorldWatch: React.FC<Props> = ({
  country,
  date,
  hour,
  minut,
  time,
  weather,
  is24,
  hour30,
  isLoading,
  minut30,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  const renderClock = useMemo(() => {
    console.log("is24h:",is24)
    return is24 ? <themeState.worldWatch24 /> : <themeState.worldWatch30 />;
  }, [is24]);

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.watch}>
        {renderClock}
        <LinearGradient
          colors={['#ECC271', '#281F0E']}
          style={[
            styles.hourLine,
            {
              transform: `rotate(${
                is24 ? hour * 30 + minut / 2 : hour30 / 2
              }deg)`,
            },
          ]}></LinearGradient>
        <LinearGradient
          colors={['#E10000', '#792525', '#0152aa']}
          style={[
            styles.minutLine,
            {transform: `rotate(${is24 ? minut * 6 : minut30 * 7.5}deg)`},
          ]}></LinearGradient>
      </RN.View>
      <RN.View style={styles.infoBox}>
        <RN.Text style={[styles.country, {color: themeState.title}]}>
          {country}
        </RN.Text>
        {!isLoading ? (
          <RN.Text style={[styles.weather, {color: themeState.yellow}]}>
            {weather}
          </RN.Text>
        ) : (
          <Progress.Circle
            size={20}
            indeterminate={true}
            color={COLORS.yellow}
          />
        )}
      </RN.View>
    </RN.View>
  );
};

export default observer(WorldWatch);

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 5,
  },
  watch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourLine: {
    position: 'absolute',
    height: '30%',
    width: 2.5,
    backgroundColor: COLORS.yellow,
    bottom: '50%',
    transformOrigin: 'bottom',
  },
  minutLine: {
    position: 'absolute',
    height: '30%',
    width: 1.5,
    backgroundColor: COLORS.red,
    bottom: '50%',
    transformOrigin: 'bottom',
  },
  infoBox: {
    gap: 5,
  },
  country: {
    fontSize: 20,
    fontWeight: '300',
    color: COLORS.white,
  },
  weather: {
    fontSize: 14,
    color: COLORS.yellow,
  },
  time: {
    fontSize: 30,
    fontWeight: '200',
    color: COLORS.white,
  },
});
