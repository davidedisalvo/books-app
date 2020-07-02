import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVWjAMTAZQv4GD7oR-bvF376q1q6T5bGU",
  authDomain: "meetup-3e70a.firebaseapp.com",
  databaseURL: "https://meetup-3e70a.firebaseio.com",
  projectId: "meetup-3e70a",
  storageBucket: "meetup-3e70a.appspot.com",
  messagingSenderId: "218239845280",
  appId: "1:218239845280:web:2e516ac1cb1ef4fcae5ac5",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
