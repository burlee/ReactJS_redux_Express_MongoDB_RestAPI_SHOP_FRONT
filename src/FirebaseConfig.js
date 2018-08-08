import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDVjDPro5DtgBtfT1wOxo-yWqIU4TaN0I4",
    authDomain: "shop-237ef.firebaseapp.com",
    databaseURL: "https://shop-237ef.firebaseio.com",
    projectId: "shop-237ef",
    storageBucket: "shop-237ef.appspot.com",
    messagingSenderId: "809808929406"
  };


const FirebaseConfig = firebase.initializeApp(config);

export default FirebaseConfig;