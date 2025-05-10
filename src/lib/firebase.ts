import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB39q9tOMuFxpcsOsuIhmGG07bXhrwjB2g",
  authDomain: "lunalink-aeb7d.firebaseapp.com",
  projectId: "lunalink-aeb7d",
  storageBucket: "lunalink-aeb7d.appspot.com",
  messagingSenderId: "1074029262167",
  appId: "1:1074029262167:web:82c1123a79fb8cb987fa12",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
