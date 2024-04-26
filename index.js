
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {initializeApp}  from "@firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyDmPbNN429UpvCp579z8hCWtoQKqHjSzGs",
//     authDomain: "btsauth.firebaseapp.com",
//     projectId: "btsauth",
//     storageBucket: "btsauth.appspot.com",
//     messagingSenderId: "825580714539",
//     appId: "1:825580714539:web:e92e04a5bda2323d4ec86e",
//   };

// const app = initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => App);
