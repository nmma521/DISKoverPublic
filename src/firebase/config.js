// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxkO4LSQlBkE_WX517C-JP-6ogSGgzjT8",
  authDomain: "diskover-a1adb.firebaseapp.com",
  projectId: "diskover-a1adb",
  storageBucket: "diskover-a1adb.appspot.com",
  messagingSenderId: "836534711138",
  appId: "1:836534711138:web:d6668998c2a1589971323b"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

  export { firebase };