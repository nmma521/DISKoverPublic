// Import the functions you need from the SDKs you need
import Firebase from "firebase";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBChZcNDO_oH0MkTTanqTTw9VNJTYxh_os",
  authDomain: "diskover-2d8c9.firebaseapp.com",
  projectId: "diskover-2d8c9",
  storageBucket: "diskover-2d8c9.appspot.com",
  messagingSenderId: "261322350462",
  appId: "1:261322350462:web:4dca1382bf3aa346a95d2f"
};

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { firebase , db};