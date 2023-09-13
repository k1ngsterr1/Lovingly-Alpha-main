import { StyleSheet } from "react-native";

var gray = `#EFEFEF`;
var pink = `#FF3366`;
var soft_pink = `#FF99AA`;
var light_pink = `#F3D9DD`;
var text_gray = `#282828`;

const HomeStyles = StyleSheet.create({
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
    justifyContent: "space-between",
    height: 27,
    // borderWidth: 1,
  },

  coupleHeading: {
    fontSize: 19,
    color: text_gray,
    fontFamily: "OpenSansBold",
  },

  profileContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  profilePicture: {
    width: 111,
    height: 111,
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    marginTop: 32,
  },

  userName: {
    fontFamily: "MontserratBold",
    fontSize: 20,
    color: pink,
    marginTop: 16,
  },

  inLoveContainer: {
    width: "auto",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  inLove: {
    fontSize: 18,
    color: text_gray,
    fontFamily: "OpenSansSemiBold",
  },

  lover: {
    fontSize: 18,
    color: soft_pink,
    fontFamily: "OpenSansSemiBold",
  },

  idContainer: {
    width: "100%",
    height: 45,
    backgroundColor: light_pink,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 16,
  },

  id: {
    fontFamily: "MontserratMedium",
    fontSize: 18,
    color: pink,
  },
});

export default HomeStyles;
