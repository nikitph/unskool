import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../Themes/ScalingUtils';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    marginHorizontal: scale(20),
    height: verticalScale(55),
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: verticalScale(10),
    paddingBottom: verticalScale(10)
  },
  containerStyle: {
    width: scale(120),
  },
  title: {
    fontSize: scale(15),
    fontFamily: Fonts.type.bold,
    color: Colors.panther,
    flex: 1,
    marginRight: scale(20),
    paddingBottom: verticalScale(10),
  },
});