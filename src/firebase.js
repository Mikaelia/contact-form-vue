import { firebase } from "@firebase/app";
import "@firebase/firestore";
import config from "../vars.js";

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = config;

const firebaseApp = firebase.initializeApp({
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
});

export const db = firebaseApp.firestore();
