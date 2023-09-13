import { StyleSheet } from "react-native";

var gray = `#EFEFEF`;
var pink = `#FF3366`;
var soft_pink = `#FF99AA`;
var light_pink = `#F3D9DD`;
var text_gray = `#282828`;

const ProfileMakerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: gray,
  },
  contentContainer: {
    width: "83.07692307692308%",
    height: "78.99644549763033%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 27,
  },
  profileHeading: {
    fontSize: 19,
    color: text_gray,
    fontFamily: "OpenSansBold",
  },
  profileContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 85,
  },
  profilePicture: {
    width: 131,
    height: 131,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    fontFamily: "MontserratRegular",
    marginTop: 16,
  },
  formContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
  },
  textBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    height: "auto",
    marginTop: 55,
  },
});

export default ProfileMakerStyles;
