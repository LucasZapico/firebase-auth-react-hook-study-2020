import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

console.log(firebase.firestore.Timestamp.now());

class Firebase {
  constructor() {
    this.appFirebase = firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    console.log(email, password);
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        return error;
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log('errorcode', errorCode);
        // console.log('errorMessage', errorMessage);
        // ...
      });
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignInWithGoogle = provider => {
    return this.auth.signInWithPopup(this.googleProvider);
  };

  doSignOut = () =>
    this.auth.signOut().then(() => {
      console.log('sign out', this.currentUser);
    });

  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password);
  };
}

export default Firebase;
