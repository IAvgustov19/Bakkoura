import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable, runInAction} from 'mobx';
import {UserInitial, UserType} from '../../types/user';
import {RootStore} from '../rootStore';
import auth from '@react-native-firebase/auth';

export class AuthStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.getUserMe();
  }

  isAuthorized = false;
  userData = null;
  userState = null;
  userUid = null;

  newUser: UserType = UserInitial as UserType;
  loginUser: UserType = UserInitial as UserType;
  currentUser: UserType = null as never;
  currentUserEmail: string = null as never;

  // initAuthListener() {
  //   auth().onAuthStateChanged(user => {
  //     console.log(user,8888);

  //     if (user) {
  //       this.setCurrentUser(user);
  //       this.setAuthorized();
  //     } else {
  //       this.setNotAuthorized();
  //     }
  //   });
  // }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  clearCurrentUser() {
    this.currentUser = null;
  }

  setAuthorized = () => {
    runInAction(() => {
      this.isAuthorized = true;
    });
  };

  setNotAuthorized = () => {
    runInAction(() => {
      this.isAuthorized = false;
    });
  };
  setNewUser = (key: keyof UserType, value: UserType) => {
    this.newUser[key] = value as never;
    this.loginUser[key] = value as never;
  };

  clearNewUserState = () => {
    runInAction(() => {
      this.newUser = UserInitial;
    });
  };

  setLoginUser = (key: keyof UserType, value: UserType) => {
    this.loginUser[key] = value as never;
  };

  clearLoginUseState = () => {
    runInAction(() => {
      this.loginUser = UserInitial;
    });
  };

  getUserMe = async () => {
    const currentUser = auth().currentUser;
    // auth().signOut();
    const userData = await AsyncStorage.getItem('userData');
    const userState = await AsyncStorage.getItem('userState');
    const uid = await AsyncStorage.getItem('userUid');
    const language = await AsyncStorage.getItem('language');

    runInAction(() => {
      this.currentUser = currentUser as never;
      this.userData = JSON.parse(userData);
      this.userState = JSON.parse(userState);
      this.userUid = JSON.parse(uid);
      if (language !== null) {
        this.setNewUser('language', language as never);
      } else {
        this.setNewUser('language', 'EN' as never);
      }
    });
  };
}
