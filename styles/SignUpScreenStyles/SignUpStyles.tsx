import { StyleSheet } from "react-native";

var gray = `#EFEFEF`;
var pink = `#FF3366`;
var soft_pink = `#FF99AA`;
var light_pink = `#F3D9DD`;
var text_gray = `#282828`;

const SignUpStyles = StyleSheet.create({
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
    // borderWidth: 1,
  },

  heading: {
    fontFamily: "OpenSansBold",
    color: text_gray,
    fontSize: 24,
    marginTop: 32,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    alignContent: "center",
    justifyContent: "center",
  },

  buttons: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 64,
    flexDirection: "column",
  },

  loginButton: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  userText: {
    fontSize: 14,
    fontFamily: "MontserratRegular",
    color: text_gray,
    marginTop: 32,
  },

  touch: {
    paddingHorizontal: 5,
  },

  loginText: {
    fontFamily: "MontserratBold",
    fontSize: 14,
    color: pink,
  },

  borderStyles: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#9F9F9F",
    marginTop: 50,
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
  textHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: text_gray,
    fontFamily: "OpenSansBold",
    marginTop: 50,
  },
  textParagraph: {
    width: 301,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "normal",
    color: text_gray,
    marginTop: 16,
    fontFamily: "MontserratRegular",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUpStyles;
