import React, { useRef, useState, useEffect } from "react";

import * as firebase from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  initializeAuth,
  setPersistence,
  Persistence,
  browserSessionPersistence,
} from "firebase/auth";

import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from "react-native";

import { NativeModules } from "react-native";

// firebase Configs
import { initializeApp } from "firebase/app";
import { firebaseConfigAndroid } from "../services/firebase";
import { firebaseConfigIOS } from "../services/firebase";

// Async
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button, ButtonGroup, withTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

// Formik
import { Formik } from "formik";
import * as Yup from "yup"; // For form validation

// Icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Styles
import styles from "../styles/SignUpScreenStyles/SignUpStyles";
import { err } from "react-native-svg/lib/typescript/xml";

interface AnimatedTextInputProps {
  handleFocus: () => void;
  handleBlur: () => void;
  handleChange: (text: string) => void;
  value: string;
  color: string;
  text: string;
  borderColor: string;
  fontSize: number;
  top: any;
  secure: boolean;
}

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AnimatedTextInput: React.FC<AnimatedTextInputProps> = ({
  handleFocus,
  handleBlur,
  handleChange,
  color,
  text,
  borderColor,
  fontSize,
  top,
  secure,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isChanged, setIsChanged] = useState("");

  const handleInputChange = (text: string) => {
    if (handleChange) {
      handleChange(text);
    }
  };

  return (
    <View style={styles.textBox}>
      <Animated.Text
        style={{
          position: "absolute",
          left: 0,
          top: top,
          bottom: 8,
          fontFamily: "OpenSansSemiBold",
          fontSize: fontSize,
          color: color,
        }}
      >
        {text}
      </Animated.Text>
      <TextInput
        style={{
          width: "100%",
          borderBottomWidth: 1,
          fontSize: 16,
          fontFamily: "OpenSansSemiBold",
          borderBottomColor: borderColor,
          padding: 5,
          color: "#4D4D4D",
        }}
        secureTextEntry={secure}
        onFocus={() => {
          setIsFocused(true);
          if (handleFocus) {
            handleFocus();
          }
        }}
        onBlur={() => {
          setIsFocused(false);
          if (handleBlur) {
            handleBlur();
          }
        }}
        onChangeText={handleInputChange}
      />
    </View>
  );
};

const SignUpScreen = () => {
  const [signupError, setSignupError] = useState<string | null>(null);

  function generateCustomUserID() {
    const randomNumber1 = Math.floor(Math.random() * 900) + 100;
    const randomNumber2 = Math.floor(Math.random() * 900) + 100;
    const customID = `${randomNumber1}_${randomNumber2}`;
    console.log("Generated Custom ID:", customID); // Debug: Print the generated custom ID
    return customID;
  }

  async function checkID() {
    let customID;
    const db = getFirestore();
    const usersCollectionRef = collection(db, "users");
    const userRef = doc(usersCollectionRef, customID);
    const userDoc = await getDoc(userRef);

    do {
      customID = generateCustomUserID();
    } while (userDoc.exists());

    return customID;
  }

  const handleRegistration = async (
    values: any,
    setSubmitting: any,
    customID: string
  ) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const uid = userCredential.user.uid;

      const db = getFirestore();

      // Check if the user is authenticated before proceeding with Firestore writes
      if (auth.currentUser) {
        const userRef = doc(db, "users", uid);
        // const uniqueIDRef = doc(db, "uniqueID", customID);

        await setDoc(userRef, {
          displayName: values.fullName,
          email: values.email,
          uniqueID: customID,
        });

        console.log("User registered successfully:", userCredential.user);
        navigation.navigate("ProfileMaker");
      } else {
        console.error("User not authenticated.");
        // Handle the case where the user is not authenticated
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setSignupError("Registration failed, Please try again");
    }

    setSubmitting(false);
  };

  // Navigation
  const navigation = useNavigation<any>();

  // Focus States
  const [isFocusedFullName, setIsFocusedFullName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] =
    useState(false);

  // Value states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfrim, setPasswordConfirm] = useState("");

  // Handle Functions

  // Full Name

  const handleFocusFullName = () => {
    setIsFocusedFullName(true);
  };

  const handleFullNameChange = (text: string) => {
    setFullName(text);
  };

  const handleBlurFullName = () => {
    setIsFocusedFullName(false);
  };

  // Email

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleBlurEmail = () => {
    setIsFocusedEmail(false);
  };

  // Password

  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };

  // Password Confirmation

  const handleFocusPasswordConfirm = () => {
    setIsFocusedPasswordConfirm(true);
  };

  const handlePasswordChangeConfirm = (text: string) => {
    setPasswordConfirm(text);
  };

  const handleBlurPasswordConfirm = () => {
    setIsFocusedPasswordConfirm(false);
  };

  // Formik Schema

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Welcome")}
          >
            <MaterialCommunityIcons name="chevron-left" color="red" size={30} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Create An Account</Text>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const customID = generateCustomUserID();
            handleRegistration(values, setSubmitting, customID);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <AnimatedTextInput
                handleFocus={handleFocusFullName}
                handleBlur={handleBlurFullName}
                handleChange={handleChange("fullName")}
                secure={false}
                value={values.fullName}
                top={isFocusedFullName || values.fullName !== "" ? -20 : "auto"}
                color={
                  isFocusedFullName || values.fullName !== ""
                    ? "#FF3366"
                    : "#9F9F9F"
                }
                text="Full Name"
                borderColor={
                  isFocusedFullName || values.fullName !== ""
                    ? "#FF3366"
                    : "#9F9F9F"
                }
                fontSize={isFocusedFullName || values.fullName !== "" ? 12 : 16}
              />
              {touched.fullName && errors.fullName && (
                <Text style={{ color: "red", marginTop: 8 }}>
                  {errors.fullName}
                </Text>
              )}
              <AnimatedTextInput
                handleFocus={handleFocusEmail}
                handleBlur={handleBlurEmail}
                handleChange={handleChange("email")}
                secure={false}
                value={values.email}
                top={isFocusedEmail || values.email !== "" ? -20 : "auto"}
                color={
                  isFocusedEmail || values.email !== "" ? "#FF3366" : "#9F9F9F"
                }
                text="Email"
                borderColor={
                  isFocusedEmail || values.email !== "" ? "#FF3366" : "#9F9F9F"
                }
                fontSize={isFocusedEmail || values.email !== "" ? 12 : 16}
              />
              {touched.email && errors.email && (
                <Text style={{ color: "red", marginTop: 8 }}>
                  {errors.email}
                </Text>
              )}
              <AnimatedTextInput
                handleFocus={handleFocusPassword}
                handleBlur={handleBlurPassword}
                handleChange={handleChange("password")}
                secure={true}
                value={values.password}
                top={isFocusedPassword || values.password !== "" ? -20 : "auto"}
                color={
                  isFocusedPassword || values.password !== ""
                    ? "#FF3366"
                    : "#9F9F9F"
                }
                text="Password"
                borderColor={
                  isFocusedPassword || values.password !== ""
                    ? "#FF3366"
                    : "#9F9F9F"
                }
                fontSize={isFocusedPassword || values.password !== "" ? 12 : 16}
              />
              {touched.password && errors.password && (
                <Text style={{ color: "red", marginTop: 8 }}>
                  {errors.password}
                </Text>
              )}
              <AnimatedTextInput
                handleFocus={handleFocusPasswordConfirm}
                handleBlur={handleBlurPasswordConfirm}
                handleChange={handleChange("confirmPassword")}
                secure={true}
                value={values.confirmPassword}
                top={
                  isFocusedPasswordConfirm || values.confirmPassword != ""
                    ? -20
                    : "auto"
                }
                color={
                  isFocusedPasswordConfirm || values.confirmPassword != ""
                    ? "#FF3366"
                    : "#9F9F9F"
                }
                text="Confirm Password"
                borderColor={
                  isFocusedPasswordConfirm || values.confirmPassword !== ""
                    ? "#FF3366"
                    : "#9F9F9F"
                }
                fontSize={
                  isFocusedPasswordConfirm || values.confirmPassword !== ""
                    ? 12
                    : 16
                }
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={{ color: "red", marginTop: 8 }}>
                  {errors.confirmPassword}
                </Text>
              )}
              <View style={{ width: "100%", alignItems: "center" }}>
                <Button
                  title="Sign Up"
                  loading={isSubmitting}
                  loadingProps={{ size: "small", color: "white" }}
                  buttonStyle={{
                    backgroundColor: "#FF3366",
                    borderRadius: 7,
                    height: 50,
                    margin: "auto",
                  }}
                  titleStyle={{
                    fontFamily: "OpenSansBold",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                  containerStyle={{
                    height: 50,
                    width: 280,
                    marginVertical: 32,
                  }}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
              <View style={styles.loginButton}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text>Already a User? </Text>
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignUpScreen;
