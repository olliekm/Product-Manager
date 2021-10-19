// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKOPDLeuzMBcdhxt0DUHKo0t_hu2cuL8M",
  authDomain: "l-b4ff5.firebaseapp.com",
  databaseURL: "https://l-b4ff5-default-rtdb.firebaseio.com",
  projectId: "l-b4ff5",
  storageBucket: "l-b4ff5.appspot.com",
  messagingSenderId: "570829288526",
  appId: "1:570829288526:web:5272624887d65c585e3f1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export default getFirestore();

