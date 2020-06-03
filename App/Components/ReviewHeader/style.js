import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { Colors, Metrics, Fonts } from '../../Themes/'
import { scale } from '../../Themes/ScalingUtils';

export default StyleSheet.create({
  container: {
    ...ifIphoneX({
      paddingTop: scale(50)
    }, {
      paddingTop: scale(20)
    }),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: scale(10),
    paddingHorizontal: scale(15),
  },
  lhsContainer: {

  },
  rhsContainer: {

  },
  rhsTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h6,
    color: Colors.coal,
  },
});