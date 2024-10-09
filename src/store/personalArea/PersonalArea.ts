import {RootStore} from '../rootStore';
import {SecureEntries} from '../../utils/secureEntries';
import {makeAutoObservable, runInAction} from 'mobx';
import {Languages} from '../../utils/languages';
import firestore from '@react-native-firebase/firestore';
import {
  InitialRouteNameInitial,
  InitialRouteNameType,
  LoginStateInitial,
  LoginStateType,
  UserInitial,
  UserType,
} from '../../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {MenuItems} from '../../utils/menuItems';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import I18n, { t } from '../../i18n';
import {Themes} from '../../utils/themes';
import {Alert, Appearance} from 'react-native';

export class PersonalAreaStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.getPersonalState();
    this.setInitialTheme();
  }

  personalAreaData: UserType = UserInitial as never;
  personalAreaDataClone: UserType = UserInitial as never;
  updateLoading = false;
  users = [];
  loginState: LoginStateType = LoginStateInitial;
  currentUserPassword: string = null;
  inActiveMenus: string[] = [];
  currentInActiveMenus: string[] = [];
  activateMenuLoading = false;
  currentPerson = null;
  initialRouteName: InitialRouteNameType = InitialRouteNameInitial;
  initialRouteNameChanged: InitialRouteNameType = InitialRouteNameInitial;

  language = 'English';

  setLanguage(newLanguage) {
    this.language = newLanguage;
    I18n.locale = newLanguage;
  }
  themeState = Themes.dark;
  currentTheme = '';
  colorScheme = Appearance.getColorScheme();

  setInitialTheme = async () => {
    const theme = await AsyncStorage.getItem('theme');
    console.log('theme', theme);

    if (theme == 'Light') {
      runInAction(() => {
        this.themeState = Themes.light;
        this.currentTheme = 'Light';
        this.root.watchConstructor.currentWatch = {
          ...this.root.watchConstructor.currentWatch,
          bodyTypes: Themes.light.watchConstrctorData.bodyTypes[0],
        };
      });
    } else if (theme == 'Dark') {
      this.themeState = Themes.dark;
      this.currentTheme = 'Dark';
      this.root.watchConstructor.currentWatch = {
        ...this.root.watchConstructor.currentWatch,
        bodyTypes: Themes.dark.watchConstrctorData.bodyTypes[0],
      };
    } else {
      this.themeState = Themes[this.colorScheme];
      this.currentTheme = this.colorScheme;
      this.root.watchConstructor.currentWatch = {
        ...this.root.watchConstructor.currentWatch,
        bodyTypes: Themes[this.currentTheme].watchConstrctorData.bodyTypes[0],
      };
    }
  };

  setUpdateTheme = (theme: string) => {
    console.log('theme', theme);
    runInAction(() => {
      if (theme == 'Light') {
        this.currentTheme = 'Light';
        this.themeState = Themes.light;
      } else if (theme == 'Dark') {
        this.currentTheme = 'Dark';
        this.themeState = Themes.dark;
      } else {
        this.currentTheme = this.colorScheme;
        this.themeState = Themes[this.colorScheme];
      }
    });
  };

  setUpdateCurrentTheme = (theme: string) => {
    runInAction(() => {
      this.currentTheme = theme;
      this.setPersonalAreaState('theme', theme as never);
    });
  };

  setPersonStartScreen = (value: InitialRouteNameType) => {
    runInAction(() => {
      this.initialRouteName = value;
      this.personalAreaData.initialRouteName = this.initialRouteName.routeName;
    });
  };

  onSetInitial = () => {
    runInAction(() => {
      this.initialRouteNameChanged = this.initialRouteName;
    });
  };

  setInActiveMenus = (key: string) => {
    runInAction(() => {
      if (this.currentInActiveMenus.some(item => item === key)) {
        this.currentInActiveMenus = this.currentInActiveMenus.filter(
          item => item !== key,
        );
        this.personalAreaData.inActiveMenus = this.currentInActiveMenus;
      } else {
        this.currentInActiveMenus = [...this.currentInActiveMenus, key];
        this.personalAreaData.inActiveMenus = this.currentInActiveMenus;
      }
    });
  };

  onSetMenus = () => {
    runInAction(() => {
      this.inActiveMenus = this.currentInActiveMenus;
    });
  };

  setLoginState = (key: keyof LoginStateType, value: LoginStateType) => {
    this.loginState[key] = value as never;
    this.personalAreaData[key] = value;
  };

  setPersonalAreaState = (key: keyof UserType, value: UserType) => {
    this.personalAreaData[key] = value as never;
  };

  getUsersState = data => {
    runInAction(() => {
      this.users = data;
    });
  };

  getPersonalState = () => {
    const currentUser = auth().currentUser;
    if (currentUser !== null) {
      if (currentUser.email) {
        this.currentPerson === currentUser.email;
        firestore()
          .collection('users')
          .where('email', '==', currentUser.email)
          .get()
          .then(querySnapshot => {
            runInAction(() => {
              this.root.authStore.setAuthorized();
              this.personalAreaData = querySnapshot.docs[0].data() as never;
              this.personalAreaDataClone =
                querySnapshot.docs[0].data() as never;
              AsyncStorage.setItem('theme', this.personalAreaData.theme);
              this.currentUserPassword = this.personalAreaData.password;
              if (this.personalAreaData.initialRouteName) {
                this.initialRouteName = MenuItems.find(
                  item => item.routeName === 'HomeScreen',
                );
                this.initialRouteNameChanged = this.initialRouteName;
              }
              this.inActiveMenus = this.personalAreaData.inActiveMenus
                ? this.personalAreaData.inActiveMenus
                : [];
              this.currentInActiveMenus = this.personalAreaData.inActiveMenus
                ? this.personalAreaData.inActiveMenus
                : [];
              this.loginState = {
                email: this.personalAreaData?.email,
                password: this.personalAreaData?.password,
                repeatPassword: this.personalAreaData?.password,
              };
            });
          })
          .catch(() => {
            console.log('error user not found');
            // auth().signOut();
            // this.root.authStore.setNotAuthorized();
          });
      } else {
        this.root.authStore.setNotAuthorized();
      }
    } else {
      // this.root.authStore.setNotAuthorized();
    }
  };

  updateProfile = async (callback?: () => void) => {
    if (this.root.authStore.isAuthorized) {
      runInAction(() => {
        this.updateLoading = true;
      });
      firestore()
        .collection('users')
        .doc(this.personalAreaData.id)
        .update(this.personalAreaData)
        .then(() => {
          console.log('Profile successfully updated');
          runInAction(() => {
            this.updateLoading = false;
            this.personalAreaDataClone = this.personalAreaData;
            this.setUpdateTheme(this.personalAreaData.theme);
            AsyncStorage.setItem('theme', this.personalAreaData.theme);
          });
          callback ? callback() : null;
        })
        .catch(error => {
          this.personalAreaData = this.personalAreaDataClone;
          console.error('Error updating document: ', error);
        })
        .finally(() => {
          runInAction(() => {
            this.updateLoading = false;
          });
        });
      return;
    } else {
      callback ? callback() : null;
      return;
    }
  };

  deleteAccount = async (callBack: () => void) => {
    await AsyncStorage.removeItem('token');
    const user = auth().currentUser;
    if (user) {
      console.log('user', user);
      const res = await user.delete();
      console.log('res delete', res);

      await firestore().collection('users').doc(user.uid).delete();
      this.root.authStore.setNotAuthorized();
      callBack();
    }
    const googleUser = await GoogleSignin.getCurrentUser();
    if (googleUser) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.root.authStore.setNotAuthorized();
      callBack();
    }
  };

  // secureEntries
  secureEntries = SecureEntries;

  onSelectEntry = (index: number) => {
    runInAction(() => {
      const selectedEntry = this.secureEntries.find((e, i) => i === index);
      this.setPersonalAreaState('secureEntry', selectedEntry.title as never);
    });
  };

  onSecureEntryItemPress = (index: number) => {
    const newData = this.secureEntries.map((item, i) => {
      this.onSelectEntry(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.secureEntries = newData;
  };

  // language
  languages = Languages;

  onSelectLanguage = (index: number) => {
    runInAction(() => {
      const selectedLanguage = this.languages.find((e, i) => i === index);
      this.setPersonalAreaState('language', selectedLanguage.key as never);
      this.root.authStore.setNewUser('language', selectedLanguage.key as never);
      AsyncStorage.setItem('language', selectedLanguage.key);
    });
  };

  onLanguageItemPress = (index: number) => {
    Alert.alert(`${t('Re-enter the application')}`,`${t('To change the language correctly, please re-enter the application')}`)
    const newData = this.languages.map((item, i) => {
      this.onSelectLanguage(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    console.log('newDatanewDatanewData', newData);
    
    this.languages = newData;
  };
}
