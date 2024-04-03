// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0CApH4Ui4X-dogy_LKNZmWo0unEa6rrY",
  authDomain: "nwitter-reloaded-8fa1c.firebaseapp.com",
  projectId: "nwitter-reloaded-8fa1c",
  storageBucket: "nwitter-reloaded-8fa1c.appspot.com",
  messagingSenderId: "1052133605036",
  appId: "1:1052133605036:web:60243de320bf8c492da909",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
