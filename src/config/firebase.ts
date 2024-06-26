import { initializeApp } from '@firebase/app';
import { firebase } from '@react-native-firebase/firestore';
import { getAuth, indexedDBLocalPersistence } from '@firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB5OaqicKHYHiIX63kfgsbFblD0ZkJUnwo',
  authDomain: 'bakkoura-app.firebaseapp.com',
  projectId: 'bakkoura-app',
  storageBucket: 'bakkoura-app.appspot.com',
  messagingSenderId: '669015865828',
  appId: '1:669015865828:ios:a50bb970684e742ad26ff1',
};

const app = initializeApp(firebaseConfig);
const db = firebase.firestore();
const authentication = getAuth(app);

  export  {authentication, db, firebase};
