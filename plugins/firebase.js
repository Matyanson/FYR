import * as firebase from 'firebase/app';
import 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuoiAmiO9-nwx1M_Ti3DxxpgUb7NAQQtI",
    authDomain: "freeytmusic.firebaseapp.com",
    databaseURL: "https://freeytmusic.firebaseio.com",
    projectId: "freeytmusic",
    storageBucket: "freeytmusic.appspot.com",
    messagingSenderId: "806580217137",
    appId: "1:806580217137:web:5ef98e4f1ebdb1cccbfc10",
    measurementId: "G-JQ2RN0VSB1"
  };
  // Initialize Firebase
  let app = null;
  if(!firebase.apps.length){
    app = firebase.initializeApp(firebaseConfig);
  }

  export default firebase;