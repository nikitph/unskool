import React from 'react';
import {
  View,
  Image,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from '../Styles/CreateGuardianScreenStyle';
import globalStyles from '../../Themes/GlobalStyles';
import {Images} from '../../Themes';

class ScreenTwo extends React.Component {
  static navigationOptions = {
    title: 'Select 2',
  };

  constructor(props) {
    super(props);
    this.state = {
      street: '',
      state: '',
      city: '',
      zipCode: '',
      latlong: null,
    };
  }

  handleChange = (value, key) => {
    this.setState({[key]: value});
  }

  handleNext = () => {
    const {navigation} = this.props;
    const {city, state, zipCode, street, latlong} = this.state;
    if (!street) {
      this.dropdown.alertWithType('error', 'Error', 'Please Enter Street Address!');
      return null;
    } else if (!city) {
      this.dropdown.alertWithType('error', 'Error', 'Please Enter City!');
      return null;
    } else if (!state) {
      this.dropdown.alertWithType('error', 'Error', 'Please Enter State!');
      return null;
    } else if (!zipCode) {
      this.dropdown.alertWithType('error', 'Error', 'Please Enter ZipCode!');
      return null;
    } else if (!latlong) {
      this.dropdown.alertWithType('error', 'Error', 'A valid Address is required!');
      return null;
    } else {
      const displayName = navigation.getParam('displayName', '');
      const languagesSpoken = navigation.getParam('languages_spoken', '');
      navigation.navigate(
        'ScreenThree',
        {displayName, languages_spoken: languagesSpoken, city, state, zipCode, street, latlong},
      );
    }
  }

  render() {
    const {state, city, street, zipCode} = this.state;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraScrollHeight={10} contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}>
        <View style={styles.logoContainer}>
          <Image source={Images.launch} style={styles.logo}/>
        </View>
        <View style={styles.formContainer}>
          <GooglePlacesAutocomplete
            placeholder='Start typing your address here'
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => {
              let componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'short_name',
                postal_code: 'short_name'
              }
              for (let i = 0; i < details.address_components.length; i++) {
                let addressType = details.address_components[i].types[0];
                if (componentForm[addressType]) {
                  let val = details.address_components[i][componentForm[addressType]];
                  componentForm[addressType] = val;
                }
              }
              this.handleChange(`${componentForm.postal_code === 'short_name' ? '' : componentForm.postal_code}`, 'zipCode')
              this.handleChange(`${componentForm.street_number === 'short_name' ? '' : componentForm.street_number} ${componentForm.route === 'long_name' ? '' : componentForm.route}`, 'street')
              this.handleChange(`${componentForm.administrative_area_level_1 === 'short_name' ? '' : componentForm.administrative_area_level_1}`, 'state')
              this.handleChange(`${componentForm.locality === 'long_name' ? '' : componentForm.locality}`, 'city')
              this.handleChange(details.geometry.location, 'latlong')
            }}
            placeholderTextColor='white'
            enablePoweredByContainer={false}
            styles={{
              textInput: styles.textInput,
              textInputContainer: styles.textInputContainer,
              row: styles.row,
              description: styles.description,
              listView: {zIndex: 10000}
            }}

            query={{
              key: 'AIzaSyAif6TTNUxjjj4Zt-6tNT7orijVUT2mHXE',
              language: 'en', // language of the results
              types: 'address' // default: 'geocode'
            }}

          />
          <TextInput
            style={globalStyles.textInput}
            placeholderTextColor='white'
            placeholder='Street Address'
            value={street}
            onChangeText={(value) => this.handleChange(value, 'street')} />
          <View style={globalStyles.formAddress2ndRow}>
            <View style={globalStyles.formAddressItem}>
              <TextInput
                style={globalStyles.textInput}
                placeholderTextColor='white'
                placeholder='City'
                value={city}
                onChangeText={(value) => this.handleChange(value, 'city')} />
            </View>
            <View style={[globalStyles.formAddressItem, globalStyles.formAddressCenterPiece]}>
              <TextInput
                style={globalStyles.textInput}
                placeholderTextColor='white'
                placeholder='State'
                value={state}
                onChangeText={(value) => this.handleChange(value, 'state')} />
            </View>
            <View style={globalStyles.formAddressItem}>
              <TextInput name='zipCode'
                style={globalStyles.textInput}
                placeholderTextColor='white'
                value={zipCode}
                keyboardType="number-pad"
                returnKeyType="done"
                placeholder='Zipcode'
                maxLength={6}
                onChangeText={(value) => this.handleChange(value.replace(/[^0-9]/g, ''), 'zipCode')} />
            </View>
          </View>
          <Button
            onPress={this.handleNext}
            type='solid'
            title='Next'
          />
        </View>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          showCancel
          translucent
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={3000}
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, null)(ScreenTwo);
