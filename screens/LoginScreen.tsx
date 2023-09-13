import React, { useRef, useState, useEffect } from "react";
import * as firebase from "firebase/app";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

import { Button, ButtonGroup, withTheme } from "@rneui/themed";

// Icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Styles
import styles from "../styles/LoginScreenStyles/LoginStyles";

// Formik
import { Form, Formik } from "formik";
import * as Yup from "yup"; // For form validation

// Navigation
import { useNavigation } from "@react-navigation/native";
import { string } from "yup";
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

    console.log(text);
  };

  const navigation = useNavigation<any>();

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

const LoginScreen = () => {
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<any>();

  const handleLogin = async (values: any, setSubmitting: any) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      console.log("User logged in successfully:", user);

      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error logging in:", error);
    }

    setSubmitting(false);
  };

  const handleFocusEmail = () => {
    setEmailFocused(true);
  };

  const handleChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleBlurEmail = () => {
    setEmailFocused(false);
  };

  const handleFocusPassword = () => {
    setPasswordFocused(true);
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleBlurPassword = () => {
    setPasswordFocused(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.paragraph}>Please sign in to continue</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values, setSubmitting);
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
                handleFocus={handleFocusEmail}
                handleBlur={handleBlurEmail}
                handleChange={handleChange("email")}
                secure={false}
                value={values.email}
                top={isEmailFocused || values.email !== "" ? -20 : "auto"}
                color={
                  isEmailFocused || values.email !== "" ? "#FF3366" : "#9F9F9F"
                }
                text="Email"
                borderColor={
                  isEmailFocused || values.email !== "" ? "#FF3366" : "#9F9F9F"
                }
                fontSize={isEmailFocused || values.email !== "" ? 12 : 16}
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
                top={isPasswordFocused || values.password !== "" ? -20 : "auto"}
                color={
                  isPasswordFocused || values.password !== ""
                    ? "#FF3366"
                    : "#9F9F9F"
                }
                text="Password"
                borderColor={
                  isPasswordFocused || values.password !== ""
                    ? "#FF3366"
                    : "#9F9F9F"
                }
                fontSize={isPasswordFocused || values.password !== "" ? 12 : 16}
              />
              {touched.password && errors.password && (
                <Text style={{ color: "red", marginTop: 8 }}>
                  {errors.password}
                </Text>
              )}

              <View style={{ width: "100%", alignItems: "center" }}>
                <Button
                  title="Login"
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
              <View style={styles.signUpButtonContainer}>
                <TouchableOpacity
                  style={styles.signUpButtonContainer}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  <Text>Don't have an account? </Text>
                  <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default LoginScreen;
