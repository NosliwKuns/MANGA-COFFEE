// // Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// // TODO: Add SDKs for Firebase products that you want to use

// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const {
//   VITE_APP_FB_API_KEY: apiKey,
//   VITE_APP_FB_AUTH_DOMAIN: authDomain,
//   VITE_APP_FB_PROJECT_ID: projectId,
//   VITE_APP_FB_STORAGE_BUCKED :storageBucket,
//   VITE_APP_FB_MESSAGING_SENDER_ID : messagingSenderId,
//   VITE_APP_FB_APP_ID :appId,
//   VITE_APP_FB_MEASUREMENT_ID : measurementId
// } = import.meta.env;

// console.log(apiKey)

// const firebaseConfig = {
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
//   measurementId,
// };

// // Initialize Firebase

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqAColpcnKTaJTVV82WMe__fZCSrYMqKw",
  authDomain: "mangacoffee-c62b5.firebaseapp.com",
  projectId: "mangacoffee-c62b5",
  storageBucket: "mangacoffee-c62b5.appspot.com",
  messagingSenderId: "613470489461",
  appId: "1:613470489461:web:448add98bfe109008e213c",
  measurementId: "G-HZGXDBNHBQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)