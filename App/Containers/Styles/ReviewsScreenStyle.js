import { StyleSheet } from 'react-native';

import { ApplicationStyles } from '../../Themes/'
import { scale, verticalScale } from '../../Themes/ScalingUtils';
import { Fonts, Colors } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
    fontSize: scale(18),
    marginHorizontal: scale(20),
    color: Colors.panther
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

  radioButtonContainer: {
    margin: verticalScale(20),
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    padding: verticalScale(10),
    borderRadius: verticalScale(10),
    backgroundColor: "#fff",
  },
  br: {
    marginTop: verticalScale(20)
  },
  listContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    alignItems: 'center'
  },
  listTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: verticalScale(15),
    flex: 1,
    marginRight: verticalScale(5),
    color: Colors.coal,
  },

})
