// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaz2ajIwy-DhfUCUhpnse__0YLB4awDkE",
    authDomain: "foodapp-19e4f.firebaseapp.com",
    projectId: "foodapp-19e4f",
    storageBucket: "foodapp-19e4f.appspot.com",
    messagingSenderId: "375648879179",
    appId: "1:375648879179:web:8451840370aa01215f83ce",
    measurementId: "G-P7SYSNTDCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app)

export { database , auth }