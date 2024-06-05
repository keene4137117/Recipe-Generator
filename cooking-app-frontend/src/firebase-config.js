// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEnOiqpGL2liavcU6FL2Lqvj0Jc1G9uLE",
  authDomain: "cooking-app-19e8d.firebaseapp.com",
  projectId: "cooking-app-19e8d",
  storageBucket: "cooking-app-19e8d.appspot.com",
  messagingSenderId: "255229597846",
  appId: "1:255229597846:web:c028d3653b3e7eba0f4ab7",
  measurementId: "G-7J8STLGJHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
