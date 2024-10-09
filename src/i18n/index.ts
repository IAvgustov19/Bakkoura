import I18n from 'react-native-i18n'; 
import English from './locale/en.json';
import عرب from './locale/ar.json';


I18n.fallbacks = true; 
I18n.translations = {
  English, 
  عرب, 
};


I18n.defaultLocale = 'English';

//device default language
//I18n.locale = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;

// initialize with english if the device language isnt supported
I18n.locale = 'English';

// Translation function
export const t = (key, withKeys = {}) => {
  return I18n.t(key, withKeys);
};

export default I18n;
