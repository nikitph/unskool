import { StyleSheet } from 'react-native'
import { scale } from '../../Themes/ScalingUtils';
import { Fonts, Colors } from '../../Themes';
export default StyleSheet.create({
  container: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(25),
    position: 'absolute',
    bottom: scale(20),
    right: scale(15),
    borderRadius: scale(5)
  },
  title: {
    fontSize: scale(18),
    color: "#fff",
    fontFamily: Fonts.type.bold,
  },
})