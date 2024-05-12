import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 100,
    overflow: 'hidden',
  },
  gradient: {
    backgroundColor: '#ECC271',
    borderWidth: 1,
    borderColor: '#ECC271',
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 6,
    borderRadius: 40,
    flexDirection: 'row',
    gap: 10,
    color: '#000',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    color: COLORS.black,
  },
  icon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipse: {
    position: 'absolute',
    zIndex: 0,
  },
});
