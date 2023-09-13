import { StyleSheet } from "react-native";

var gray = `#EFEFEF`;
var pink = `#FF3366`;
var soft_pink = `#FF99AA`;
var light_pink = `#F3D9DD`;
var text_gray = `#282828`;

const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: gray,
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

export default WelcomeStyles;
