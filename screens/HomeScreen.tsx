import React from "react";

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Clipboard,
} from "react-native";

// Icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Styles
import styles from "../styles/HomeScreenStyles/HomeStyles";

const HomeScreen = () => {
  const textToCopy = "ID: 157-1900";

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await Clipboard.setString(textToCopy);
      console.log("Text Was Coppied" + textToCopy);
    } catch (error) {
      console.error("Copy to clipboard failed: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="cards-heart"
            color="#FF3366"
            size={30}
          />
          <Text style={styles.coupleHeading}>Your Profile</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="square-edit-outline"
              color="#FF3366"
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}></View>
          <Text style={styles.userName}>John Doe 😍</Text>
          <TouchableOpacity style={styles.inLoveContainer}>
            <Text style={styles.inLove}>In Love With</Text>
            <Text style={styles.lover}> Jane Doe</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.idContainer}
          onPress={() => copyToClipboard(textToCopy)}
        >
          <Text style={styles.id}>{textToCopy}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
