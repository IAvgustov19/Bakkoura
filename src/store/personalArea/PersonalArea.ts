import {RootStore} from '../rootStore';
import {SecureEntries} from '../../utils/secureEntries';
import {makeAutoObservable, runInAction} from 'mobx';
import {
  PersonalAreaStateInitial,
  PersonalAreaStateType,
} from '../../types/personalArea';
import {Languages} from '../../utils/languages';
import firestore from '@react-native-firebase/firestore';
import {
  LoginStateInitial,
  LoginStateType,
  UserInitial,
  UserType,
} from '../../types/user';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export class PersonalAreaStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
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
    if (this.users.length > 0) {
      const currentUser = auth().currentUser;
      if (currentUser !== null) {
        if (currentUser.email) {
          this.currentPerson === currentUser.email;
          const user: UserType = this.users.find(
            item => item.email === currentUser.email,
          );

          runInAction(() => {
            this.personalAreaData = user;
            this.personalAreaDataClone = user;
            this.currentUserPassword = user.password;
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
        }
      }
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
    const newData = this.languages.map((item, i) => {
      this.onSelectLanguage(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.languages = newData;
  };
}
