import { StyleSheet } from 'react-native';

import { scale } from '../../../Themes/ScalingUtils';
import { Fonts, Colors } from '../../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tilte: {
    marginHorizontal: scale(15),
    fontSize: Fonts.size.h3,
    color: Colors.banner,
    fontFamily: Fonts.type.bold,
    marginTop: scale(10),
  },
  reviewNote: {
    marginTop: scale(10),
    marginHorizontal: scale(15),
    fontSize: Fonts.size.regular,
    color: Colors.banner,
    fontFamily: Fonts.type.bold,
  },
  reviewTitle: {
    marginHorizontal: scale(15),
    fontSize: Fonts.size.h4,
    color: Colors.banner,
    fontFamily: Fonts.type.bold,
    marginTop: scale(50),
  },
  textInputContainer: {
    height: scale(100),
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scale(5),
    borderColor: Colors.border,
    margin: scale(15),
    padding: scale(15),
  },
  textInput: {
    fontFamily: Fonts.type.bold,
    color: Colors.banner,
    fontSize: Fonts.size.h6
  },
})