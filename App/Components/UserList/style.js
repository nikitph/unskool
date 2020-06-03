import { StyleSheet } from 'react-native';

import { scale } from '../../Themes/ScalingUtils';
import { Fonts } from '../../Themes';

export default StyleSheet.create({
  userListContainer: {
    marginTop: scale(20),
  },
  userTitle: {
    marginLeft: scale(20),
    fontFamily: Fonts.type.base,
    fontSize: scale(20),
  },
  br: {
    height: StyleSheet.hairlineWidth,
    marginVertical: scale(10),
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  userItemContainer: {
    marginRight: scale(15),
    marginVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImg: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
  },
  userName: {
    marginTop: scale(5),
    fontSize: scale(15),
    fontFamily: Fonts.type.base,
    color: 'rgba(0,0,0,0.3)',
  },
})