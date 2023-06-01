import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBArAlV5gnTrwRKv2nUSrjB1mY0VfpdrJA",
  authDomain: "metasimz-test.firebaseapp.com",
  databaseURL: "https://metasimz-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "metasimz-test",
  storageBucket: "metasimz-test.appspot.com",
  messagingSenderId: "703765395969",
  appId: "1:703765395969:web:58ae15a58bb15dca5e9e00",
  measurementId: "G-T2ZRJ6LRL4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const firestoreDB = getFirestore(firebase.initializeApp(firebaseConfig));