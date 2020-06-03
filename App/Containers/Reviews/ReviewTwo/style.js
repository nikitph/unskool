import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../Themes/ScalingUtils';
import { Fonts, Colors } from '../../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: verticalScale(18),
    color: "#000",
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