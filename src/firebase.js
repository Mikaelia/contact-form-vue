import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBIXj6O6_lvPkH8hIx4IzuMQWyKa0xC4rs",
  authDomain: "zen-form.firebaseapp.com",
  databaseURL: "https://zen-form.firebaseio.com",
  projectId: "zen-form",
  storageBucket: "zen-form.appspot.com",
  messagingSenderId: "834019138961",
  appId: "1:834019138961:web:2470411f7f1f7dd23a0e30",
});

export const db = firebaseApp.firestore();
