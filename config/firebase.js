import firebase from "firebase";
require("firebase/firestore");
import * as Facebook from "expo-facebook";

const config = {
  apiKey: "***",
  authDomain: "****",
  databaseURL: "****",
  projectId: "*",
  storageBucket: "*****",
  messagingSenderId: "****",
  appId: "*****",
  measurementId: "******",
};

// Initialize Firebase
firebase.initializeApp(config);
Facebook.initializeAsync("***");

const db = firebase.firestore();

// need to add this to skip deprecated warnings "YELLOW WARNINGS"
// db.settings({
//   timestampsInSnapshots: true,
// });

export default db;
