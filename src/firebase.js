import * as firebase from "firebase";



//this database no longer exists !!

var firebaseConfig = {
    apiKey: "AIzaSyAWqKrVBDmEGFn9s6iq_3LvmSm64nMC3RI",
    authDomain: "dbmarketplace-fd440.firebaseapp.com",
    databaseURL: "https://dbmarketplace-fd440.firebaseio.com",
    projectId: "dbmarketplace-fd440",
    storageBucket: "dbmarketplace-fd440.appspot.com",
    messagingSenderId: "999435754710",
    appId: "1:999435754710:web:a59018fa460ea9b875bd77"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);



  export default fireDb.database().ref()
