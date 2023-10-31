// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAH80iOBT4_6ZnplnGlW1UEjXYm2DtpnAg",
    authDomain: "todo-web-app-b9ec6.firebaseapp.com",
    projectId: "todo-web-app-b9ec6",
    storageBucket: "todo-web-app-b9ec6.appspot.com",
    messagingSenderId: "821046760423",
    appId: "1:821046760423:web:cb869ee7036b6294cce342",
    measurementId: "G-DFPX7YED6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);