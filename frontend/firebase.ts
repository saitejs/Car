// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_89_PnJCyCz2wCUpfM5dlyBRUoiyuoy8",
    authDomain: "car-qr-app-107f3.firebaseapp.com",
    projectId: "car-qr-app-107f3",
    storageBucket: "car-qr-app-107f3.firebasestorage.app",
    messagingSenderId: "831071645005",
    appId: "1:831071645005:web:83b30068a004a545539b04",
    measurementId: "G-Q3TLBDCVHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);