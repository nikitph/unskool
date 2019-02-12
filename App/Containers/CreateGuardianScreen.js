import React, { Component } from 'react'
import { ScrollView, Text, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import style from './Styles/CreateGuardianScreenStyle'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import RadioForm from 'react-native-simple-radio-button'
import colorsVariables from '../Themes/Variables'
import globalStyles from '../Themes/GlobalStyles'

import { Button, CheckBox } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
// import { sendEmail } from '../../helpers/email'
// import BackButton from '../components/BackButton';

class CreateGuardianScreen extends Component {
  constructor (props) {
    super()

    //
    // STATE OBJECT
    //

    // pull the formData tree from the DB and grab all of the checkboxes for the guardians
    // setup the state properties
    let categories = {
      uid: props.uid,
      displayName: '',
      greeting: '',
      photoURL: props.photoURL,
      email: props.email,
      street: '',
      city: '',
      zipCode: '',
      children: [' '],
      gender: null,
      privacy: 'public',
      sponsored: false,
      }

    this.state = {
      categories,
      formData: {
        specialties: [ 'running', 'dance', 'cooking', 'coding', 'music', 'Gardening', 'Guitar', 'Piano', 'Geography', 'Knitting', 'Painting', 'Science', 'Engineering', 'Wood work', 'Other' ],
        languages_spoken: [ 'english', 'spanish', 'chinese', 'arabic', 'portuguese', 'french', 'hindi', 'malay', 'russian', 'urdu', 'other', 'bengali' ]
      }
    }

    this.radioButtonChange = this.radioButtonChange.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.capitalizeWord = this.capitalizeWord.bind(this)
  }

  /**
   *
   * @param e
   */

  handleChange (value, fieldName) {
    let inputObj = {}
    inputObj[fieldName] = value
    this.setState(inputObj)
  }

  capitalizeWord (str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
  }

  checkboxChange (checkbox, checkboxOptions, checked) {
    // current array of options
    const options = this.state[ checkboxOptions ]
    let index

    // check if the check box is checked or unchecked
    if (checked) {
      // add the numerical value of the checkbox to options array
      options.push(checkbox)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(checkbox)
      options.splice(index, 1)
    }
  }

  radioButtonChange (value, group) {
    // current array of options
    let radioButtonGroup = group
    let radio = value

    const newState = {}
    newState[radioButtonGroup] = radio

    // update the state with the new array of options
    this.setState(newState)
  }

  confirmAddress () {
    if (this.state.latlong) {
      this.submitForm()
    } else {
      this.refs.toast.show('A valid Address is required!', 2500)
    }
  }

  /**
   *
   * @param e
   */
  submitForm () {
  /*  const props = this.props
    const { app } = props
    const data = {...this.state}

    // update the store with the information the user submitted
    store.dispatch(
      actions.newAccountCreated(data)
    )

    // update the database - path, data
    updateProfile(`guardians/${data.uid}`, data)

    // navigate to the tutorial page
    app.goToScene('Tutorial', {app})

    // Send welcome email
    this.sendWelcomeMail(data) */
  }

  getEmailBody (data) {
    return 'Hi ' + data.displayName +
      '\n Welcome to My Community Classroom!' +
      '\n Thank you for taking the time to register to be a part of a new growing educational community.' +
      'We are excited to have you on board as we build a platform that is dedicated to empowering families ' +
      'and children by blowing open the doors to education as we strive to nurture our future citizens of the world!' +
      '\n PLEASE FLAG & SAVE THIS EMAIL – as it is a reminder of your login credentials should you ever need to reference it again.' +
      '\n \n Login : ' + data.email +
      '\n \n Please feel free to contact us at info@mycommunityclassroom.com with any questions or feedback you may have for us.' +
      '\n \n - The MC2 Founding Team'
  }

 /* sendWelcomeMail (data) {
    let emailBody = this.getEmailBody(data)
    sendEmail(data.email, 'Welcome to MC2', emailBody).then((response) => {
    })
  } */

  /**
   *
   * @returns {XML}
   */
  render () {
    let formData = this.state.formData || {}

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (let category in formData) {
        checkboxOutput.push(
          <View key={category} style={[globalStyles.checkboxContainer, style.checkboxContainer]}>
            <Text style={globalStyles.checkboxSubTitle}>{this.capitalizeWord(category)}</Text>
            {formData[category].map(item => {
              return (
                <View key={item}>
                  <CheckBox
                    title={item}
                    key={item}
                    onPress={(checked) => this.checkboxChange(item, category, checked)}
                  />
                </View>
              )
            })}
          </View>
        )
      }
      return checkboxOutput
    }

    // set the data structure for the radio buttons
    const radio_props = [
      {label: 'Male', value: 'male' },
      {label: 'Female', value: 'female' }
    ]
    let userGender = this.state.gender
    // <BackButton path="/welcome-search" />

    return (
      <ScrollView>
        <Text style={[globalStyles.formTitle]}> Help us get to know you... </Text>
        <View style={style.formContainer}>
          <TextInput
            style={globalStyles.textInput}
            placeholderTextColor='white'
            placeholder='Your Name'
            onChangeText={(value) => this.handleChange(value, 'displayName')}
          />

          <TextInput
            style={[globalStyles.textInput, {height: 90}]}
            multiline
            numberOfLines={6}
            placeholderTextColor='white'
            placeholder='Write a summary about yourself here'
            onChangeText={(value) => this.handleChange(value, 'greeting')}
          />

          <View>
            <RadioForm
              radio_props={radio_props}
              formHorizontal
              buttonColor={colorsVariables.mc2BlueElectric}
              labelColor={'white'}
              initial={userGender === 'male' ? 0 : 1}
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          <View>
            <Text style={globalStyles.formSubTitle}>Address</Text>
            <GooglePlacesAutocomplete
              placeholder='Start typing your address here'
              minLength={2} // minimum length of text to search
              autoFocus
              returnKeyType={'default'}
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                let componentForm = {
                  street_number: 'short_name',
                  route: 'long_name',
                  locality: 'long_name',
                  administrative_area_level_1: 'short_name',
                  country: 'short_name',
                  postal_code: 'short_name'
                }

                for (let i = 0; i < details.address_components.length; i++) {
                  let addressType = details.address_components[i].types[0]
                  if (componentForm[addressType]) {
                    let val = details.address_components[i][componentForm[addressType]]
                    componentForm[addressType] = val
                  }
                }
                this.handleChange(componentForm.postal_code, 'zipCode')
                this.handleChange(componentForm.street_number + ' ' + componentForm.route, 'street')
                this.handleChange(componentForm.administrative_area_level_1, 'state')
                this.handleChange(componentForm.locality, 'city')
                this.handleChange(details.geometry.location, 'latlong')
              }}
              placeholderTextColor='white'
              getDefaultValue={() => ''}
              enablePoweredByContainer={false}
              styles={{ textInput: { minHeight: 40,
                borderRadius: 3,
                fontSize: 12,
                padding: 10,
                marginTop: 4,
                marginBottom: 4,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.3)'},
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0
                },
                row: {
                  padding: 10,
                  height: 36,
                  flexDirection: 'row',
                  backgroundColor: 'white'
                },
                description: {
                  fontSize: 12
                }
              }}

              query={{
                key: 'AIzaSyAif6TTNUxjjj4Zt-6tNT7orijVUT2mHXE',
                language: 'en', // language of the results
                types: 'address' // default: 'geocode'
              }}

              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                types: 'food'
              }}
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
            <TextInput
              style={globalStyles.textInput}
              placeholderTextColor='white'
              placeholder='Street Address'
              value={this.state.street}
              onChangeText={(value) => this.handleChange(value, 'street')} />
            <View style={globalStyles.formAddress2ndRow}>
              <View style={globalStyles.formAddressItem}>
                <TextInput
                  style={globalStyles.textInputDisabled}
                  placeholderTextColor='white'
                  placeholder='City'
                  value={this.state.city}
                  editable={false}
                  onChangeText={(value) => this.handleChange(value, 'city')} />
              </View>
              <View style={[globalStyles.formAddressItem, globalStyles.formAddressCenterPiece]}>
                <TextInput
                  style={globalStyles.textInputDisabled}
                  placeholderTextColor='white'
                  placeholder='State'
                  value={this.state.state}
                  editable={false}
                  onChangeText={(value) => this.handleChange(value, 'state')} />
              </View>
              <View style={globalStyles.formAddressItem}>
                <TextInput name='zipCode'
                  style={globalStyles.textInputDisabled}
                  placeholderTextColor='white'
                  value={this.state.zipCode}
                  editable={false}
                  placeholder='Zipcode'
                  onChangeText={(value) => this.handleChange(value, 'zipCode')} />
              </View>
            </View>
          </View>

          { outputCheckboxes() }

          {/* <PrivacyForm globalStyle={globalStyles} onChange={this.radioButtonChange} privacy={this.state.privacy} */}
          {/* title={'Default Event Privacy'}/> */}

          <Button text='Submit' extraStyle={style.submit} onPress={() => this.confirmAddress()} />
        </View>
        <Toast ref='toast' position='bottom' opacity={0.9} fadeOutDuration={500} textStyle={{
          fontSize: 18,
          fontFamily: 'AvenirNext-Regular',
          fontWeight: '400',
          color: 'white',
          textAlign: 'center'
        }} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.signup.payload.uid || '',
    photoURL: state.signup.payload.photoURL || '',
    email: state.signup.payload.email || ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGuardianScreen)
