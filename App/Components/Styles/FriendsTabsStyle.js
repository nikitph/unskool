import { StyleSheet } from 'react-native'

import { scale } from '../../Themes/ScalingUtils';
import { Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listImage: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
  },
  listRightContainer: {
    marginLeft: scale(20),
    flex: 1,
  },
  listName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: Fonts.type.base,
    color: "#000",
    fontSize: scale(20),
  },
  timePeriod: {
    fontFamily: Fonts.type.base,
    color: "rgba(0,0,0,0.4)",
    fontSize: scale(12),
  },
  listDetails: {
    fontFamily: Fonts.type.base,
    color: "rgba(0,0,0,0.4)",
    fontSize: scale(18),
  },
  startContainer: {
    flexDirection: 'row',
    marginTop: scale(15),
  },
  indicatorContainerStyle: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: scale(18),
    fontFamily: Fonts.type.base,
  },
})
