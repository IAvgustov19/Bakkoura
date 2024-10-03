import I18n from 'react-native-i18n'; 
import en from './locale/en.json';
import ar from './locale/ar.json';


I18n.fallbacks = true; 
I18n.translations = {
  en, 
  ar, 
};


I18n.defaultLocale = 'en';

//device default language
//I18n.locale = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;

// initialize with english if the device language isnt supported
I18n.locale = 'en';

// Translation function
export const t = (key, withKeys = {}) => {
  return I18n.t(key, withKeys);
};

export default I18n;
