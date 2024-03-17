import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  linear: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: 30,
  },
  bts: {
    position: 'absolute',
  },
  switchHours: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  backForward: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  timerContent: {
    height: '38%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  swiper: {
    height: '100%',
  },
  swiperItem: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startStop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  switchWork: {
    marginVertical: 20,
  },
  soundList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#202B35',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sound: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  changeTimer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBtn: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
});
