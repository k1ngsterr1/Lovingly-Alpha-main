import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

// Styles
import WelcomeStyles from "../styles/WelcomeScreenStyles/WelcomeStyles";

export default function WelcomeScreen() {
  const svgContent = `<svg width="154" height="266" viewBox="0 0 154 266" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_10_532)">
  <path d="M21.5451 265.397C21.5451 265.732 21.8138 266 22.1485 266H153.397C153.731 266 154 265.732 154 265.397C154 265.063 153.731 264.795 153.397 264.795H22.1485C21.8138 264.795 21.5451 265.063 21.5451 265.397Z" fill="#484565"/>
  <path d="M90.5665 0.167265C90.5665 0.167265 79.4567 -2.52098 72.7331 13.7199C67.13 27.2573 63.1547 34.4867 67.703 39.3975C69.3307 41.1542 71.653 42.1009 74.0464 42.1819L99.653 43.0223C99.653 43.0223 109.054 18.4079 103.339 9.50779C97.6248 0.602651 90.5665 0.167265 90.5665 0.167265Z" fill="#2F2E41"/>
  <path d="M95.8704 40.9768L83.5538 45.0218V27.3179H94.7295L95.8704 40.9768Z" fill="#F6A6A9"/>
  <path d="M86.4187 255.505H74.8779L68.1898 193.954H86.0232L86.4187 255.505Z" fill="#F6A6A9"/>
  <path d="M63.6414 265.397C62.4296 265.397 61.3495 265.367 60.5331 265.291C57.4654 265.013 54.5447 262.755 53.0743 261.433C52.4151 260.841 52.2021 259.894 52.5469 259.079C52.7954 258.492 53.2872 258.057 53.8957 257.885L61.9935 255.576L75.1061 246.742L75.2532 247.005C75.309 247.101 76.5969 249.42 77.0279 250.984C77.1902 251.582 77.1496 252.078 76.9011 252.457C76.7287 252.726 76.4904 252.878 76.2927 252.964C76.531 253.212 77.2764 253.713 79.5632 254.077C82.9098 254.609 83.6096 251.146 83.64 250.999L83.6603 250.883L83.7617 250.817C85.3539 249.794 86.3325 249.329 86.6722 249.425C86.8852 249.486 87.2351 249.592 88.1833 259.019C88.2796 259.312 88.9439 261.484 88.4926 263.555C88.0007 265.813 78.1282 265.033 76.1507 264.856C76.0949 264.861 68.7019 265.387 63.6364 265.387V265.397H63.6414Z" fill="#2F2E41"/>
  <path d="M112.482 255.505H100.946L94.2528 193.954H112.086L112.482 255.505Z" fill="#F6A6A9"/>
  <path d="M89.7095 265.397C88.4976 265.397 87.4176 265.367 86.6012 265.291C83.5335 265.013 80.6128 262.755 79.1423 261.433C78.4832 260.841 78.2702 259.894 78.615 259.079C78.8635 258.492 79.3553 258.057 79.9638 257.885L88.0616 255.576L101.174 246.742L101.321 247.005C101.377 247.101 102.665 249.42 103.096 250.984C103.258 251.582 103.218 252.078 102.969 252.457C102.797 252.726 102.558 252.878 102.361 252.964C102.599 253.212 103.344 253.713 105.631 254.077C108.978 254.609 109.678 251.146 109.708 250.999L109.728 250.883L109.83 250.817C111.422 249.794 112.401 249.329 112.74 249.425C112.953 249.486 113.303 249.592 114.251 259.019C114.348 259.312 115.012 261.484 114.561 263.555C114.069 265.813 104.196 265.033 102.219 264.856C102.163 264.861 94.77 265.387 89.7045 265.387V265.397H89.7095Z" fill="#2F2E41"/>
  <path d="M115.803 104.325H59.7421L79.8928 38.1113H102.244L115.803 104.325Z" fill="#DDDEDF"/>
  <path d="M58.2159 141.48C57.5465 145.535 54.8388 148.446 52.1666 147.975C49.4944 147.504 47.8667 143.839 48.536 139.784C48.7794 138.159 49.4234 136.625 50.4122 135.303L53.4647 118.156L61.7754 119.893L57.8812 136.609C58.3933 138.189 58.51 139.86 58.2209 141.48H58.2159Z" fill="#F6A6A9"/>
  <path d="M83.4219 38.1214C83.4219 38.1214 69.498 37.7569 68.0326 41.4121C66.5672 45.0724 49.3473 132.139 49.3473 132.139H60.7055L83.4219 38.1214Z" fill="#DDDEDF"/>
  <path d="M86.3781 31.4995C93.158 31.4995 98.6541 26.0121 98.6541 19.2429C98.6541 12.4738 93.158 6.98633 86.3781 6.98633C79.5983 6.98633 74.1021 12.4738 74.1021 19.2429C74.1021 26.0121 79.5983 31.4995 86.3781 31.4995Z" fill="#F6A6A9"/>
  <path d="M88.305 4.21209C88.305 4.21209 72.5455 27.6166 75.1974 42.2172L66.0297 36.4812C66.0297 36.4812 72.4846 6.92566 82.1036 4.63229L88.305 4.20703V4.21209Z" fill="#2F2E41"/>
  <path d="M104.151 104.325H67.3633L47.2329 186.81C46.8627 190.293 49.0735 193.544 52.4658 194.45C63.5096 197.401 90.0087 201.588 130.122 189.934C133.981 188.815 136.172 184.75 134.96 180.923L104.151 104.33V104.325Z" fill="#2F2E41"/>
  <path d="M54.5346 49.8564L54.2811 49.6033L54.0275 49.8564C41.6907 37.5492 21.6972 37.5644 9.37052 49.8817C-2.95618 62.2042 -3.20464 82.4141 9.1322 94.7213L54.3115 139.784L99.4603 94.6657C111.787 82.3432 111.528 62.1333 99.1967 49.8261C86.8598 37.5188 66.8663 37.534 54.5397 49.8514L54.5346 49.8564Z" fill="#FF3366"/>
  <path d="M87.8993 44.3081L98.0913 39.0886C102.751 37.3673 107.949 37.9444 112.117 40.6529C124.793 48.8847 149.781 67.0342 139.042 76.0052C124.89 87.8314 105.758 66.857 105.758 66.857L87.8993 44.3081Z" fill="#DDDEDF"/>
  <path d="M87.6762 53.2284C84.1318 51.1426 82.3926 47.5684 83.7972 45.2446C85.2017 42.9259 89.2126 42.7386 92.762 44.8244C94.192 45.6395 95.3937 46.7938 96.2658 48.1911L111.173 57.2329L106.549 64.3408L92.3412 54.6712C90.678 54.575 89.0757 54.0789 87.6711 53.2233H87.6762V53.2284Z" fill="#F6A6A9"/>
  <path d="M97.8073 61.4245L102.046 51.3145L122.76 58.1591L113.496 73.5545L97.8073 61.4245Z" fill="#DDDEDF"/>
  </g>
  <defs>
  <clipPath id="clip0_10_532">
  <rect width="154" height="266" fill="white"/>
  </clipPath>
  </defs>
  </svg>`;

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const navigation = useNavigation<any>();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        MontserratBold: require("../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
        MontserratMedium: require("../assets/fonts/Montserrat/Montserrat-Medium.ttf"),
        MontserratRegular: require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
        OpenSansSemiBold: require("../assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),
        OpenSansBold: require("../assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
        // Add other font variations as needed
      });

      setIsFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return null; // Return a loading indicator or handle font loading
  }

  return (
    <View style={WelcomeStyles.container}>
      <SvgXml
        xml={svgContent}
        width="154"
        height="266"
        style={{ marginTop: 100 }}
      />
      {/* <View style={WelcomeStyles.textContainer}> */}
      <Text style={WelcomeStyles.textHeading}>Welcome to Lovingly</Text>
      <Text style={WelcomeStyles.textParagraph}>
        Our app is thoughtfully designed to make every moment you share with
        your partner even more special. Here's a glimpse of what awaits you:
      </Text>
      {/* </View> */}
      <Button
        title="Sign Up"
        loading={false}
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
          marginHorizontal: 50,
          height: 50,
          width: 280,
          marginTop: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("SignUp")}
      />
      <Button
        onPress={() => navigation.navigate("Login")}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
          marginTop: 16,
        }}
        title="Sign In"
        type="clear"
        titleStyle={{
          color: "#FF3366",
          fontFamily: "OpenSansBold",
          fontWeight: "bold",
        }}
      />
    </View>
  );
}
