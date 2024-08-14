import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {DimensionValue, Pressable} from 'react-native';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {months, weekDays} from '../../../constants/calendar';
import useRootStore from '../../../hooks/useRootStore';
import {generateMatrix} from '../../../utils/calendarUtils';
import {COLORS} from '../../../utils/colors';

type Props = {
  calendarWidth?: DimensionValue;
  dayFontSize?: number;
  date?: Date;
  dateWidth?: DimensionValue;
  dateHeight?: DimensionValue;
  selectMonth?: () => void;
  showWeekDays?: boolean;
  currentDateFontSize?: number;
  weekGap?: number;
  showMonth?: boolean;
  today?: Date;
  weekend?: boolean;
};

export const CalendarComp: React.FC<Props> = ({
  calendarWidth,
  date = new Date(),
  dayFontSize,
  selectMonth,
  dateWidth = 'auto',
  dateHeight = 30,
  showWeekDays = true,
  currentDateFontSize = 28,
  weekGap = 10,
  showMonth = true,
  today = new Date().toISOString().slice(0, 10),
  weekend,
}) => {
  const [activeDate, setActiveDate] = useState<Date>(date);

  useEffect(() => {
    if (!(date instanceof Date)) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        setActiveDate(parsedDate);
      }
    } else {
      setActiveDate(date);
    }
  }, [date]);

  const matrix = generateMatrix(activeDate);

  let rows = matrix.map((row, rowIndex: number) => {
    let rowItems = row.map((item, colIndex: number) => {
      return (
        <RN.View style={styles.dayBox} key={colIndex}>
          <RN.TouchableOpacity
            onPress={() => {
              selectMonth();
            }}
            style={[
              [
                styles.date,
                {
                  width: dateWidth,
                  height: dateHeight,
                },
              ],
              item.value === today ? styles.activeDate : styles.inActiveDate,
            ]}>
            <RN.Text
              fontFamily="RedHatDisplay-SemiBold"
              style={[
                styles.dateText,
                {
                  color: weekend
                    ? item.value === today
                      ? COLORS.black
                      : colIndex == 6
                      ? COLORS.grey
                      : colIndex == 5
                      ? COLORS.grey
                      : COLORS.white
                    : COLORS.white,
                  fontSize: dayFontSize ? dayFontSize : 18,
                },
              ]}>
              {item.id != -1 ? item.id : ''}
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      );
    });

    return (
      <RN.View key={rowIndex} style={styles.rowContainer}>
        {rowItems}
      </RN.View>
    );
  });

  return (
    <RN.Pressable
      onPress={selectMonth}
      style={[
        styles.container,
        {width: calendarWidth ? calendarWidth : '100%'},
      ]}>
      {showMonth ? (
        <RN.Text style={[styles.currentDate, {fontSize: currentDateFontSize}]}>
          {`${months[new Date(activeDate).getMonth()].slice(0, 3)}`}
        </RN.Text>
      ) : null}
      {showWeekDays ? (
        <RN.View style={styles.weekDays}>
          {weekDays.map((item, index) => (
            <RN.Text style={styles.dayNames} key={index}>
              {item}
            </RN.Text>
          ))}
        </RN.View>
      ) : (
        <RN.View style={styles.monthBottom}>
          <Images.Svg.calendarMonthBottom />
        </RN.View>
      )}
      <RN.View style={[styles.row, {gap: weekGap}]}>{rows}</RN.View>
    </RN.Pressable>
  );
};

export default observer(CalendarComp);

const styles = RN.StyleSheet.create({
  container: {
    width: '33%',
  },
  row: {
    width: '100%',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 25,
  },
  dayNames: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
    width: 14,
  },
  activeDate: {
    backgroundColor: COLORS.yellow,
    color: COLORS.black,
    borderRadius: 10,
  },
  inActiveDate: {},
  dateText: {
    textAlign: 'center',
    fontSize: 18,
  },
  currentDate: {
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.white,
  },
  dayBox: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.yellow,
    borderRadius: 3,
  },
  monthBottom: {
    marginVertical: 10,
  },
});
