// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoTkIahKIkMa--m5-rB9KMw2LrZiTVQzY",
  authDomain: "phone-number-auth-a4a14.firebaseapp.com",
  projectId: "phone-number-auth-a4a14",
  storageBucket: "phone-number-auth-a4a14.appspot.com",
  messagingSenderId: "883742883973",
  appId: "1:883742883973:web:9a3741471cc25bd366e9ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);