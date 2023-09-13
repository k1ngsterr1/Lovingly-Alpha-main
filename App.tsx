import React, { useEffect, useState } from "react";
import * as firebase from "firebase/app";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Platform } from "react-native";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
import { SvgXml } from "react-native-svg";
import * as Font from "expo-font";

// Firebase Apps
import { initializeApp } from "firebase/app";
import { firebaseConfigAndroid } from "./services/firebase";
import { firebaseConfigIOS } from "./services/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Async
import AsyncStorage from "@react-native-async-storage/async-storage";

// Stack
import AppStack from "./AppStack";

// Styles
import WelcomeStyles from "./styles/WelcomeScreenStyles/WelcomeStyles";

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  type User = {
    id: string;
    fullName: string;
    email: string;
  };

  const [user, setUser] = useState<User | null>(null);

  const platform = Platform.OS;

  useEffect(() => {
    if (!firebaseInitialized) {
      const firebaseConfig =
        platform === "android" ? firebaseConfigAndroid : firebaseConfigIOS;
      const firebaseApp = initializeApp(firebaseConfig);

      const auth = getAuth(firebaseApp);

      AsyncStorage.getItem("user").then((storedUser) => {
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      });

      setFirebaseInitialized(true);
      console.log("Firebase initialized");
    }
  }, [firebaseInitialized, platform]);

  return (
    <NavigationContainer>
      <AppStack></AppStack>
    </NavigationContainer>
  );
}
