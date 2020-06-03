import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
import { scale } from '../../Themes/ScalingUtils';
import { Fonts } from '../../Themes';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  imgBg: {
    height: scale(250),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  headerSubtitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  imgHeader: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: scale(50),
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  imgHeaderTitle: {
    color: "#fff",
    fontFamily: Fonts.type.base,
    marginLeft: scale(30),
    fontSize: scale(22),
  },
  headerIconContainer: {
    height: scale(40),
    width: scale(40),
    backgroundColor: "#fff",
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(10),
    marginRight: scale(20),
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(20),
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disconnectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(5),
    borderRadius: scale(30),

  },
  disconnectTitle: {
    color: "#fff",
    fontFamily: Fonts.type.base,
    fontSize: scale(18),
  },
  details: {
    margin: scale(20),
    fontSize: scale(18),
    color: "rgba(0,0,0,0.7)",
    fontFamily: Fonts.type.base,
  },
  skillContainer: {
    flexDirection: 'row',
    margin: scale(20),
  },
  skillList: {
    flexDirection: 'row',
    marginRight: scale(10),
    height: scale(40),
    alignItems: 'center',
    paddingHorizontal: scale(10),
    backgroundColor: "#E4E4E4",
    borderRadius: scale(25),
  },
  skillName: {
    fontFamily: Fonts.type.base,
    fontSize: scale(15),
    color: "rgba(0,0,0,0.5)",
  },
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
