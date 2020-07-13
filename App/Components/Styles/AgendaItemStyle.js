import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    width: '100%',
    flexDirection: 'column',
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  imageGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 5
  },

  textGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5
  },

  button: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderRadius: 15,
    padding: 5,
    marginRight: 10,
    borderColor: 'rgba(102,108,114,0.8)',
  },

  moreButton: {
    backgroundColor: '#B3C0CF',
    borderRadius: 7,
    padding: 3,
    marginRight: 10,
  },

  buttonText: {
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '400'
  },

  moreButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    paddingRight: 5,
    paddingLeft: 5,
    fontWeight: '200'
  }
})
