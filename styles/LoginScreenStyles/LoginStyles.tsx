import { StyleSheet } from "react-native";

var gray = `#EFEFEF`;
var pink = `#FF3366`;
var soft_pink = `#FF99AA`;
var light_pink = `#F3D9DD`;
var text_gray = `#282828`;

const LoginStyles = StyleSheet.create({
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
  textBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    height: "auto",
    marginTop: 55,
  },
  backButtonContainer: {
    width: "100%",
    height: 34,
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: -10,
    // borderWidth: 1,
  },
  backButton: {
    width: "auto",
    height: 34,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: pink,
    fontSize: 16,
    fontFamily: "OpenSansSemiBold",
  },
  heading: {
    fontFamily: "OpenSansBold",
    color: text_gray,
    fontSize: 24,
    marginTop: 32,
  },
  paragraph: {
    color: text_gray,
    fontFamily: "MontserratRegular",
    fontSize: 16,
    marginTop: 16,
  },
  form: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
    marginTop: 32,
  },

  buttonContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },

  signUpButtonContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  signUpButton: {},

  signUpText: { fontFamily: "MontserratBold", fontSize: 14, color: pink },
});

export default LoginStyles;
