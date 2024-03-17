import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  bottomSheet: {
    marginHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  renderTabBarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    width: '25%',
    paddingTop: 20,
  },

  dotMenu: {
    position: 'absolute',
    top: -5,
    left: '50%',
    transform: [{translateX: -15}],
  },
});
