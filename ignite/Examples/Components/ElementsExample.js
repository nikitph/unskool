style = {
  fullscreen: {
    flex: 1
  },

  deviceWidth: {
    width: deviceWidth
  },

  deviceHeight: {
    height: deviceHeight
  },

  loader: {
    flex: 1,
    height: 80,
    position: 'absolute'
  },

  container: {
    flex: 1,
  // justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0
  },

  title: {
    fontSize: 30
  },

  text: {
    fontSize: 16
  },

  addItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
    height: 35,
    width: 35,
    padding: 10,
    shadowColor: 'rgba(51, 51, 112, 0.6)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1
  },
  Button: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 13,
    borderRadius: 15
  },

  ButtonText: {
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    fontWeight: '500'
  },

  Nav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    height: '100%',
    width: '75%',
    top: 0
  },

  NavText: {
    color: 'white'
  },

  NavLink: {
    height: 50
  },

// FORM Styles
//
// bootstrap forms particular to forms
//

  formContainer: {
    paddingLeft: pagePadding,
    paddingRight: pagePadding
  },

  formTitle: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center'
  },

  formSubTitle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500'
  },

  formImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  formImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth - (pagePadding * 2),
    height: 320
  },

  uploadImageButton: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  imagePickerTitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },

  closeImagePicker: {
    backgroundColor: 'maroon',
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },

  chooseImage: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },

  textInput: {
    minHeight: 40,
    borderRadius: 3,
    fontSize: 12,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  textInputDisabled: {
    minHeight: 40,
    borderRadius: 3,
    fontSize: 12,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },

  formAddress2ndRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  },

  formAddressItem: {
    width: '32%'
  },

  formAddressCenterPiece: {
    marginLeft: '2%',
    marginRight: '2%'
  },

// RADIO BUTTON
  radioButtonContainer: {
    marginRight: -4,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexGrow: 1
  },

// CHECKBOX
//
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    marginTop: 20
  },
  checkboxSubTitle: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
    fontWeight: '500'
  }}
