import {observer} from 'mobx-react-lite';
import * as React from 'react';
import RN from '../../../components/RN';
import {weekDays} from '../../../constants/calendar';
import useRootStore from '../../../hooks/useRootStore';
import {generateMatrix} from '../../../utils/calendarUtils';
import {COLORS} from '../../../utils/colors';

type Props = {
  date?: Date;
  selectedDays?: any[];
};

const OneMonth: React.FC<Props> = ({date, selectedDays}) => {
  const [activeDate, setActiveDate] = React.useState<String>(
    new Date().toISOString().slice(0, 10),
  );
  const {filterEvents, oneMonth} = useRootStore().calendarStore;

  const _onPress = (item: string) => {
    if (item) {
      setActiveDate(item);
      filterEvents(item);
    }
  };

  const matrix = generateMatrix(oneMonth as never);

  let rows = [];

  rows = matrix.map((row, rowIndex: number) => {
    let rowItems = row.map((item, colIndex: number) => {
      return (
        <RN.View style={styles.dayBox} key={colIndex}>
          <RN.TouchableOpacity
            key={colIndex}
            onPress={() => _onPress(item.value)}
            style={[
              styles.date,
              item.value == activeDate
                ? styles.activeDate
                : styles.inActiveDate,
            ]}>
            <RN.Text
              style={[
                styles.dateText,
                {
                  color:
                    item.value == activeDate
                      ? COLORS.black
                      : colIndex == 6
                      ? COLORS.grey
                      : colIndex == 5
                      ? COLORS.grey
                      : COLORS.white,
                  fontSize: 18,
                },
              ]}>
              {item.id != -1 ? item.id : ''}
            </RN.Text>
          </RN.TouchableOpacity>
          {selectedDays?.includes(item.value) && (
            <RN.View style={styles.activeDot}></RN.View>
          )}
        </RN.View>
      );
    });

    return (
      <RN.View
        key={rowIndex}
        style={[
          styles.rowContainer,
          {
            borderBottomWidth: row.every(item => item.id != -1) ? 0.4 : 0,
            borderTopWidth: row[0] ? 0.4 : 0,
            borderTopColor: COLORS.borderBottom,
            borderBottomColor: COLORS.borderBottom,
          },
        ]}>
        {rowItems}
      </RN.View>
    );
  });

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.weekDays}>
        {weekDays.map((item, index) => (
          <RN.Text style={styles.dayNames} key={index}>
            {item}
          </RN.Text>
        ))}
      </RN.View>
      <RN.View style={styles.row}>{rows}</RN.View>
    </RN.View>
  );
};

export default observer(OneMonth);

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    width: '100%',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
  },
  date: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDate: {
    backgroundColor: COLORS.yellow,
    borderRadius: 20,
  },
  inActiveDate: {},
  dateText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  currentDate: {
    fontWeight: '600',
    fontSize: 28,
    textAlign: 'center',
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
    position: 'absolute',
    bottom: -10,
  },
  monthBottom: {
    marginVertical: 10,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 25,
  },
  dayNames: {
    color: COLORS.grey,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 12,
    width: 14,
  },
});
