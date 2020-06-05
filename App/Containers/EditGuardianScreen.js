import React, { Component } from 'react'
import { ScrollView, Text, View, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import EditGuardianActions from '../Redux/EditGuardianRedux'
import * as Animatable from 'react-native-animatable'

// Styles
import style from './Styles/EditGuardianScreenStyle'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import RadioForm from 'react-native-simple-radio-button'
import colorsVariables from '../Themes/Variables'
import DropdownAlert from 'react-native-dropdownalert'
import globalStyles from '../Themes/GlobalStyles'
import FastImage from 'react-native-fast-image'

import { Button } from 'react-native-elements'
import CheckBox from '../Components/CheckBox'
import Toast from 'react-native-easy-toast'
import { Images } from '../Themes'
import PhotoUpload from '../Components/PhotoUpload'
// import { sendEmail } from '../../helpers/email'
// import BackButton from '../components/BackButton';

class EditGuardianScreen extends Component {
  static navigationOptions = {
    headerTitle: () => <Animatable.Image animation='rotate' duration='9000' source={Images.launch} style={{ width: 40, height: 40 }}
    />
  }
  constructor(props) {
    super()

    const {
      uid,
      displayName,
      greeting,
      profileImage,
      email,
      street,
      state,
      city,
      zipCode,
      children,
      gender,
      privacy,
      sponsored,
      specialties,
      languages_spoken,
      latlong
    } = props.guardian
    this.state = {
      uid,
      displayName,
      greeting,
      profileImage,
      email,
      street,
      state,
      city,
      zipCode,
      children,
      gender,
      privacy,
      sponsored,
      specialties,
      languages_spoken,
      latlong
    }

    this.radioButtonChange = this.radioButtonChange.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.capitalizeWord = this.capitalizeWord.bind(this)
    this.showAlert = this.showAlert.bind(this)
  }

  /**
   *
   * @param e
   */

  handleChange(value, fieldName) {
    let inputObj = {}
    inputObj[fieldName] = value
    this.setState(inputObj)
  }

  capitalizeWord(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
  }

  showAlert(type, title, message) {
    this.dropdown.alertWithType(type, title, message)
  };

  checkboxChange(checkbox, checkboxOptions, checked) {
    // current array of options
    const options = this.state[checkboxOptions]
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

  radioButtonChange(value, group) {
    // current array of options
    let radioButtonGroup = group
    let radio = value

    const newState = {}
    newState[radioButtonGroup] = radio

    // update the state with the new array of options
    this.setState(newState)
  }

  confirmAddress() {
    if (this.state.latlong) {
      this.submitForm()
    } else {
      this.showAlert('error', 'Error', 'A valid Address is required!')
    }
  }

  /**
   *
   * @param e
   */
  submitForm() {
    this.props.attemptEditGuardian(this.state, this.showAlert, this.props.navigation)
    // Send welcome email
    // this.sendWelcomeMail(data)
  }

  getEmailBody(data) {
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
  render() {
    let formData = {
      specialties: ['running', 'dance', 'cooking', 'coding', 'music', 'Gardening', 'Guitar', 'Piano', 'Geography', 'Knitting', 'Painting', 'Science', 'Engineering', 'Wood work', 'Other'],
      languages_spoken: ['english', 'spanish', 'chinese', 'arabic', 'portuguese', 'french', 'hindi', 'malay', 'russian', 'urdu', 'other', 'bengali']
    }

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (let category in formData) {
        checkboxOutput.push(
          <View key={category} style={[globalStyles.checkboxContainer, style.checkboxContainer]}>
            <Text style={globalStyles.checkboxSubTitle}>{this.capitalizeWord(category)}</Text>
            {formData[category].map(item => {
              let checkbox = ''
              // pre-check any items that were selected and saved
              if (this.state.specialties.indexOf(item) > -1) {
                checkbox =
                  <CheckBox
                    label={item}
                    checked
                    key={item}
                    onChange={(checked) => this.checkboxChange(item, category, checked)}
                  />
              } else {
                checkbox =
                  <CheckBox
                    label={item}
                    key={item}
                    onChange={(checked) => this.checkboxChange(item, category, checked)}
                  />
              }

              return checkbox
            })}
          </View>
        )
      }
      return checkboxOutput
    }

    // set the data structure for the radio buttons
    const radio_props = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ]
    let userGender = this.state.gender
    // <BackButton path="/welcome-search" />

    return (
      <ScrollView>
        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
          <View className='image-uploader'>
            <View style={globalStyles.formImageContainer}>
              <PhotoUpload
                width={100}
                height={100}
                onPhotoSelect={avatar => {
                  if (avatar) {
                    this.setState({ profileImage: avatar })
                  }
                }}>
                <FastImage
                  style={{
                    paddingVertical: 10,
                    width: 100,
                    height: 100,
                    borderRadius: 50
                  }}
                  resizeMode='cover'
                  source={this.state.profileImage} />
              </PhotoUpload>
            </View>
          </View>
        </View>
        <Text style={[globalStyles.formTitle]}> Help us get to know you... </Text>
        <View style={style.formContainer}>
          <TextInput
            style={globalStyles.textInput}
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            placeholder='Your Name'
            defaultValue={this.state.displayName}
            onChangeText={(value) => this.handleChange(value, 'displayName')}
          />

          <TextInput
            style={[globalStyles.textInput, { height: 90 }]}
            multiline
            numberOfLines={6}
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            placeholder='Write a summary about yourself here'
            defaultValue={this.state.greeting}
            onChangeText={(value) => this.handleChange(value, 'greeting')}
          />

          {/* <View>
            <RadioForm
              radio_props={radio_props}
              formHorizontal
              buttonColor={colorsVariables.mc2BlueElectric}
              labelColor={'white'}
              initial={userGender === 'male' ? 0 : 1}
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View> */}

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
              styles={{
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

          {outputCheckboxes()}

          {/* <PrivacyForm globalStyle={globalStyles} onChange={this.radioButtonChange} privacy={this.state.privacy} */}
          {/* title={'Default Event Privacy'}/> */}

          <Button
            onPress={() => { this.confirmAddress() }}
            type='solid'
            title='Update'
            loading={this.props.fetching}
          />
        </View>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          showCancel
          translucent
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    guardian: state.login.payload,
    fetching: state.editguardian.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptEditGuardian: (gdata, alertfunc, nav) => dispatch(EditGuardianActions.editGuardianRequest(gdata, alertfunc, nav))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGuardianScreen)
