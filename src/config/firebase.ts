import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB5OaqicKHYHiIX63kfgsbFblD0ZkJUnwo',
  projectId: 'bakkoura-app',
  storageBucket: 'bakkoura-app.appspot.com',
  messagingSenderId: '669015865828',
  appId: '1:669015865828:ios:a50bb970684e742ad26ff1',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export {auth, createUserWithEmailAndPassword};
