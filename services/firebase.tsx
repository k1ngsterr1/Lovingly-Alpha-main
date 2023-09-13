import { Platform } from "react-native";
import firebase from "firebase/app";
import "firebase/compat/auth";

export const firebaseConfigAndroid = {
  apiKey: "AIzaSyBPq52gOsy6ZRfJNru-AmFOKd5ommo6xE0",
  authDomain: "lovingly-dacb1.firebaseapp.com",
  projectId: "lovingly-dacb1",
  storageBucket: "lovingly-dacb1.appspot.com",
  messagingSenderId:
    "1074014167186-t8r203rd6s3q5rbibbllalulepdatqj7.apps.googleusercontent.com",
  appId: "1:1074014167186:android:d087e108e0152a7224864b",
};

export const firebaseConfigIOS = {
  apiKey: "AIzaSyBsqRDJ3f8tkkOII1oKQ5ZsLlIqo9xGyHo",
  authDomain: "lovingly-dacb1.firebaseapp.com",
  projectId: "lovingly-dacb1",
  storageBucket: "lovingly-dacb1.appspot.com",
  messagingSenderId:
    "1074014167186-k49vjtaffhob8a332uvv1no0dl13krdi.apps.googleusercontent.com",
  appId: "1:1074014167186:ios:e68030af12dee88324864b",
};

// let firebaseInitialized = false;

// export const firebaseInitialize = () => {
//   if (!firebaseInitialized) {
//     const platform = Platform.OS;
//     const firebaseConfig =
//       platform == "android" ? firebaseConfigAndroid : firebaseConfigIOS;

//     firebase.initializeApp(firebaseConfig);
//     firebaseInitialized = true;
//   }
// };
