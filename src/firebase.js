import firebase from "firebase/app";
import 'firebase/firestore' 


const firebaseConfig = {
    
    apiKey: "AIzaSyA91DXzXXFFXolad1vMQ52eqFK-Agb8ywI",
    authDomain: "crud2-97f0f.firebaseapp.com",
    projectId: "crud2-97f0f",
    storageBucket: "crud2-97f0f.appspot.com",
    messagingSenderId: "577335341409",
    appId: "1:577335341409:web:2174c0a764ff5fdba4d520"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}