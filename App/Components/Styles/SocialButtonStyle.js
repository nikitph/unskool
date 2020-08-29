import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  socialLoginbutton: {
    width: width - 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 0.2,
    marginTop: 5
  },
  facebookText: {
    textAlign: "center",
    width: width - 100,
    fontWeight: "700",
    color: "white"
  }
});
