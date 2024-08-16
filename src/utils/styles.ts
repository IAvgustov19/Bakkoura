import {Dimensions, DimensionValue} from 'react-native';
import RN from '../components/RN';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const HITSLOP = {
  left: 20,
  right: 20,
  top: 20,
  bottom: 20,
};

export const IosAndroidHeight: any = {
  height: RN.Platform.OS === 'ios' ? '82%' : '80%',
};
