import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
  Platform,
  Permission,
  PermissionsAndroid,
} from "react-native";

// Firebase Apps
import { initializeApp } from "firebase/app";
import { firebaseConfigAndroid } from "../services/firebase";
import { firebaseConfigIOS } from "../services/firebase";

import { Button, ButtonGroup, withTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

// Icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Styles
import styles from "../styles/ProfileMakerScreenStyles/ProfileMakerStyles";

// Formik
import { Formik } from "formik";
import * as Yup from "yup"; // For form validation

import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  initializeAuth,
  setPersistence,
  Persistence,
  browserSessionPersistence,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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

const ProfileMakerScreen = () => {
  const [isNameFocused, setNameFocus] = useState(false);
  const [isSurnameFocused, setSurnameFocus] = useState(false);

  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");

  const [profilePicture, setProfilePicture] = useState<string | null>("");

  const navigation = useNavigation<any>();

  const handleFocusName = () => {
    setNameFocus(true);
  };

  const handleNameChange = (text: string) => {
    setFullName(text);
  };

  const handleBlurName = () => {
    setNameFocus(false);
  };

  const handleFocusSurname = () => {
    setSurnameFocus(true);
  };

  const handleSurnameChange = (text: string) => {
    setSurname(text);
  };

  const handleBlurSurname = () => {
    setSurnameFocus(false);
  };

  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    requestPermissions();
  });

  // const uploadProfilePicture = async (uri: string) => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;

  //   if (user) {
  //     const uid = user.uid;
  //     console.log("User Is Here for saving photos!");

  //     try {
  //       const storage = getStorage();
  //       const storageRef = ref(storage, `profile_pictures/${user.uid}`);

  //       await uploadString(storageRef, uri, "data_url");

  //       const downloadURL = await getDownloadURL(storageRef);

  //       const db = getFirestore();
  //       const userRef = doc(db, "users", user.uid);

  //       await setDoc(userRef, { profilePicture: downloadURL }, { merge: true });

  //       setProfilePicture(downloadURL);
  //     } catch (error) {
  //       console.error("Error uploading profile picture:", error);
  //     }
  //   }
  // };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const { status: cameraPermission } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryPermission } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission === "granted" &&
        mediaLibraryPermission === "granted"
      ) {
        console.log("Camera and media library permissions granted");
      } else {
        console.warn("Camera and/or media library permissions denied");
      }
    } else if (Platform.OS === "ios") {
      const { status: cameraPermission } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryPermission } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission === "granted" &&
        mediaLibraryPermission === "granted"
      ) {
        console.log("Camera and media library permissions granted");
      } else {
        console.warn("Camera and/or media library permissions denied");
      }
    }
  };

  const saveProfilePictureAndName = async (uri: string, values: any) => {
    try {
      const auth = getAuth();
      const db = getFirestore();
      const storage = getStorage();
      const user = auth.currentUser;

      console.log("trying to save the picture");

      if (user) {
        const uid = user.uid;
        const storageRef = ref(storage, `profile_pictures/${uid}.jpeg`);
        const nameRef = doc(db, "users", uid);

        const img = await fetch(uri);
        const blob = await img.blob();

        const newFile = new File([blob], `${uid}.jpeg`, {
          type: "image/jpeg",
        });

        const downloadURL = await uploadBytes(storageRef, newFile);

        // Update the user's document with new data
        await updateDoc(nameRef, {
          firstName: values.firstName,
          lastName: values.lastName,
        });

        console.log("Profile picture and name saved successfully.");
        navigation.navigate("HomeScreen");
      } else {
        console.log("No user is currently authenticated.");
      }
    } catch (error) {
      console.error("Error while saving profile picture and name:", error);
    }
  };

  const handleProfilePictureSelection = async () => {
    if (Platform.OS === "android") {
      const cameraPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const readPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      const writePermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (!cameraPermission || !readPermission || !writePermission) {
        // Request permissions if not granted
        await requestPermissions();
        return;
      }
    } else if (Platform.OS === "ios") {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        // Request permissions if not granted
        await requestPermissions();
        return;
      }
    }

    Alert.alert(
      "Choose a Photo",
      "Select a source for your profile picture:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Take a Photo",
          onPress: handleTakePhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: handleChooseFromCamera,
        },
      ],
      { cancelable: false }
    );
  };

  const handleChooseFromCamera = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = (result as ImagePicker.ImagePickerSuccessResult).assets[0]
        .uri;

      setProfilePicture(uri);

      // const storage = getStorage();
      // const storageRef = ref(storage, "profile_pictures");

      // const img = await fetch(uri);
      // const bytes = await img.blob();
      // await uploadBytes(storageRef, bytes);
    }
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = (result as ImagePicker.ImagePickerSuccessResult).assets[0]
        .uri;
      setProfilePicture(uri);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
  });

  // const handleSaveName = async (values: any, setSubmitting: any) => {
  //   try {
  //     const auth = getAuth();
  //     const db = getFirestore();

  //     const user = auth.currentUser;

  //     if (user) {
  //       const uid = user.uid;
  //       console.log("User Is Here!");
  //       const nameRef = doc(db, "users", uid);

  //       await setDoc(nameRef, {
  //         firstName: values.firstName,
  //         lastName: values.lastName,
  //       });
  //     } else {
  //       console.log("No user is currently authenticated.");
  //     }
  //   } catch (error) {
  //     console.error("Error while saving photo and name:", error);
  //   }

  //   setSubmitting(false);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.profileHeading}>Profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.profilePicture}
            onPress={handleProfilePictureSelection}
          >
            {profilePicture && (
              <Image
                source={{ uri: profilePicture }}
                style={styles.profilePicture}
              />
            )}
            <MaterialCommunityIcons
              name="camera-outline"
              color="#AEAEAE"
              size={50}
            />
          </TouchableOpacity>
          <Text style={styles.profileText}>Set your profile picture</Text>
          <Formik
            initialValues={{ firstName: "", lastName: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Your async code here
                saveProfilePictureAndName(profilePicture || "", values);
                setSubmitting(false); // Set submitting to false when you're done
              } catch (error) {
                console.error("Error:", error);
                setSubmitting(false); // Make sure to set it to false in case of an error too
              }
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
              <View style={styles.formContainer}>
                <AnimatedTextInput
                  handleFocus={handleFocusName}
                  handleBlur={handleBlurName}
                  handleChange={handleChange("firstName")}
                  value={values.firstName}
                  secure={false}
                  text="First Name"
                  top={isNameFocused || values.firstName !== "" ? -20 : "auto"}
                  color={
                    isNameFocused || values.firstName !== ""
                      ? "#FF3366"
                      : "#9F9F9F"
                  }
                  borderColor={
                    isNameFocused || values.firstName !== ""
                      ? "#FF3366"
                      : "#9F9F9F"
                  }
                  fontSize={isNameFocused || values.firstName != "" ? 12 : 16}
                ></AnimatedTextInput>
                {touched.firstName && errors.firstName && (
                  <Text style={{ color: "red", marginTop: 8 }}>
                    {errors.firstName}
                  </Text>
                )}
                <AnimatedTextInput
                  handleFocus={handleFocusSurname}
                  handleBlur={handleBlurSurname}
                  handleChange={handleChange("lastName")}
                  value={values.lastName}
                  secure={false}
                  text="Last Name"
                  top={
                    isSurnameFocused || values.lastName !== "" ? -20 : "auto"
                  }
                  color={
                    isSurnameFocused || values.lastName !== ""
                      ? "#FF3366"
                      : "#9F9F9F"
                  }
                  borderColor={
                    isSurnameFocused || values.lastName !== ""
                      ? "#FF3366"
                      : "#9F9F9F"
                  }
                  fontSize={
                    isSurnameFocused || values.lastName !== "" ? 12 : 16
                  }
                ></AnimatedTextInput>
                {touched.lastName && errors.lastName && (
                  <Text style={{ color: "red", marginTop: 8 }}>
                    {errors.lastName}
                  </Text>
                )}
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    title="Save"
                    loading={isSubmitting}
                    loadingProps={{ size: "small", color: "white" }}
                    buttonStyle={{
                      backgroundColor: "#FF3366",
                      borderRadius: 7,
                      height: 50,
                    }}
                    titleStyle={{
                      fontFamily: "OpenSansBold",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                    containerStyle={{
                      height: 50,
                      width: 280,
                      marginTop: 64,
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

export default ProfileMakerScreen;
