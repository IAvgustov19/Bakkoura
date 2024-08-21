import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../utils/colors';

export const styles = StyleSheet.create({
  bottomSheet: {
    marginHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    // height: '100%',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 50,
  },
  bottomSheetScrollView: {
    backgroundColor: COLORS.black,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  renderTabBarsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 3,
  },
  borderContainer: {
    // borderTopWidth: 2,
    // borderLeftWidth: 2,
    // borderRightWidth: 2,
    // borderColor: '#43371F',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    backgroundColor: '#0D0D0D',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 1,
    width: '25%',
    paddingTop: 10,
    paddingBottom: 12,
  },
  iconBox: {
    height: 55,
    justifyContent: 'center',
  },
  dotMenu: {
    position: 'absolute',
    top: -5,
    left: '50%',
    zIndex: 1,
    transform: [{ translateX: -15 }],
  },
});
