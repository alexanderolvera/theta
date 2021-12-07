// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMCQQJhJNRmOX07q_j3lNpioxl67x_EoU",
  authDomain: "theta-135b5.firebaseapp.com",
  projectId: "theta-135b5",
  storageBucket: "theta-135b5.appspot.com",
  messagingSenderId: "748050701250",
  appId: "1:748050701250:web:43622a20eb0d5e71b7145b",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app)