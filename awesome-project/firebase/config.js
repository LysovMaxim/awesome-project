// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBpyKAg0PFqTN5ViXeAIpTHWREBwEiR57o",
    authDomain: "awesome-project-44289.firebaseapp.com",
    databaseURL: "https://awesome-project-44289-default-rtdb.firebaseio.com",
    projectId: "awesome-project-44289",
    storageBucket: "awesome-project-44289.appspot.com",
    messagingSenderId: "842011159100",
    appId: "1:842011159100:web:c4462a8e98bb3a96b47139",
    measurementId: "G-W3FT1MDDM1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);