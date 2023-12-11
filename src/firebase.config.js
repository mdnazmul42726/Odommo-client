import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBog7-9BsmzNoGbQUfCQXtgzn8e9GUHNos",
    authDomain: "simple-login-register-93dc5.firebaseapp.com",
    projectId: "simple-login-register-93dc5",
    storageBucket: "simple-login-register-93dc5.appspot.com",
    messagingSenderId: "723975289552",
    appId: "1:723975289552:web:43c409fdc4710461953cd5",
    measurementId: "G-ZKDXS9YG70"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);