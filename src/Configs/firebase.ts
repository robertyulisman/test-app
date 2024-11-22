// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDeETb555_oYWWX7Csi9q-wcszjgm3iPuM',
  authDomain: 'central-connect-3b0be.firebaseapp.com',
  databaseURL: 'https://central-connect-3b0be-default-rtdb.firebaseio.com',
  projectId: 'central-connect-3b0be',
  storageBucket: 'central-connect-3b0be.appspot.com',
  messagingSenderId: '546674808707',
  appId: '1:546674808707:web:eb2dbe3b2ee0b6e536c8b6',
  measurementId: 'G-FLM0FQXMEW',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var firestore = firebase.firestore();
var database = firebase.database();

export { firestore, database };
