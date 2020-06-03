import { StyleSheet } from 'react-native';

import { scale } from '../../../Themes/ScalingUtils';
import { Fonts, Colors } from '../../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: scale(60),
  },
  title: {
    marginVertical: scale(20),
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
    marginHorizontal: scale(15),
    color: Colors.panther
  },
})