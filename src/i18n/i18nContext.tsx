import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'react-native-i18n';

const LanguageContext = createContext(null);

export const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); 

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage) {
         I18n.locale = savedLanguage;
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language', error);
      }
    };

    initializeLanguage();
  }, []);

  const changeLanguage = async (newLanguage) => {
    try {
    I18n.locale = newLanguage;
      setLanguage(newLanguage);
      await AsyncStorage.setItem('selectedLanguage', newLanguage);
    } catch (error) {
      console.error('Failed to save language', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
