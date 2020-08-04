import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';

import { Images } from '../../Themes';
import CheckBox from '../../Components/CheckBox';
import styles from '../Styles/CreateGuardianScreenStyle';
import globalStyles from '../../Themes/GlobalStyles';
import CreateGuardianActions from '../../Redux/CreateGuardianRedux'


class ScreenThree extends React.Component {
  static navigationOptions = {
    title: 'Step 3',
  };
  constructor(props) {
    super(props);
    this.state = {
      greeting: '',
      specialties: ['running', 'dance', 'cooking', 'coding', 'music', 'Gardening', 'Guitar', 'Piano', 'Geography', 'Knitting', 'Painting', 'Science', 'Engineering', 'Wood work'],
      selectedSpecialties: [],
      showAddSpecialty: false,
      newSpecialty: '',
      children: [' '],
      gender: 'male',
      privacy: 'public',
      sponsored: false,
    };
  }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  }

  showAlert(type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  };

  handleSpecialties(value, checked) {
    let options = [];
    if (this.state['selectedSpecialties']) {
      options = [...this.state['selectedSpecialties']];
    }
    if (checked) {
      options.push(value);
    } else {
      const index = options.indexOf(value);
      options.splice(index, 1);
    }

    this.setState({ selectedSpecialties: options });
  }

  showAddSpecialty = () => this.setState({ showAddSpecialty: true });

  handleAddSpecilities = () => {
    const { newSpecialty, specialties } = this.state;
    if (!newSpecialty) {
      this.showAlert('error', 'Error', 'Please Enter Speciality!');
      return null;
    }
    this.setState({
      showAddSpecialty: false,
      newLanguage: '',
      specialties: _.uniq([...specialties, newSpecialty]),
    });
  }

  submitData = () => {
    const { uid, photoURL, email, attemptCreateGuardian, navigation } = this.props;
    const { greeting, selectedSpecialties, children, gender, privacy, sponsored } = this.state;
    const guardianData = {
      uid, photoURL, email, greeting,
      children, gender, privacy, sponsored,
      specialties: selectedSpecialties,
      displayName: navigation.getParam('displayName', ''),
      languages_spoken: navigation.getParam('languages_spoken', ''),
      city: navigation.getParam('city', ''),
      state: navigation.getParam('state', ''),
      zipCode: navigation.getParam('zipCode', ''),
      street: navigation.getParam('street', ''),
      latlong: navigation.getParam('latlong', ''),
    };

    console.log('guardianData', guardianData);
    attemptCreateGuardian(guardianData, this.showAlert, navigation);
  }

  render() {
    const { newSpecialty, specialties, showAddSpecialty } = this.state;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraScrollHeight={10} contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}>
        <View style={styles.logoContainer}>
          <Image source={Images.launch} style={styles.logo} />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={[globalStyles.textInput, { height: 90 }]}
            multiline
            numberOfLines={6}
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            placeholder='Write a summary about yourself here'
            onChangeText={(value) => this.handleChange(value, 'greeting')}
          />
          <Text style={globalStyles.formSubTitle}>Specialties</Text>
          <View style={[globalStyles.checkboxContainer, styles.checkboxContainer]}>
            {
              specialties.map((item) => {
                return (
                  <View key={item}>
                    <CheckBox
                      label={item}
                      key={item}
                      onChange={(checked) => this.handleSpecialties(item, checked)}
                    />
                  </View>
                )
              })
            }
          </View>
          <Button
            onPress={this.showAddSpecialty}
            type='solid'
            title='Other'
            containerStyle={{ marginVertical: 10 }}
          />
          {showAddSpecialty && (
            <View style={styles.addSpecialtiesCon}>
              <TextInput
                style={[globalStyles.textInput, { flex: 1, height: 30, marginRight: 10 }]}
                placeholder="Enter Specialty*"
                value={newSpecialty}
                onChangeText={(text) => this.setState({ newSpecialty: text })}
              />
              <Button
                onPress={this.handleAddSpecilities}
                type='solid'
                title='Add'
              />
            </View>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              onPress={this.submitData}
              type='solid'
              title='Submit'
              loading={this.props.fetching}
              containerStyle={{ flex: 0.48 }}
            />
            <Button
              onPress={this.submitData}
              type='solid'
              title='Skip'
              loading={this.props.fetching}
              containerStyle={{ flex: 0.48 }}
            />
          </View>
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

const mapStateToProps = (state) => {
  return {
    uid: state.signup.payload.uid || '',
    photoURL: state.signup.payload.photoURL || '',
    email: state.signup.payload.email || '',
    fetching: state.createguardian.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptCreateGuardian: (gdata, alertfunc, nav) => dispatch(CreateGuardianActions.createGuardianRequest(gdata, alertfunc, nav))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenThree);