import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwF4ONm9hlUEfZnLxRwDa1r_w89KaJgFw",
  authDomain: "linksreact-8c7a8.firebaseapp.com",
  projectId: "linksreact-8c7a8",
  storageBucket: "linksreact-8c7a8.appspot.com",
  messagingSenderId: "537858645615",
  appId: "1:537858645615:web:8325cca4c56b4b94f7779a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
