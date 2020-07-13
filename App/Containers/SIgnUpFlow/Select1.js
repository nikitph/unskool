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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';

import CheckBox from '../../Components/CheckBox';
import styles from '../Styles/CreateGuardianScreenStyle';
import globalStyles from '../../Themes/GlobalStyles';
import {Images} from '../../Themes';


class Select1 extends React.Component {
  static navigationOptions = {
    title: 'Select 1',
  };

  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      languagesSpoken: ['english', 'spanish', 'chinese', 'arabic', 'portuguese', 'french', 'hindi', 'malay', 'russian', 'urdu', 'bengali'],
      selectedLanguages: [],
      showAddLanguages: false,
      newLanguage: '',
    };
  }

  showAlert(type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  };

  handleChange = (value, key) => {
    this.setState({[key]: value});
  }

  handleLanguages(value, checked) {
    let options = [...this.state['selectedLanguages']];
    if (checked) {
      options.push(value);
    } else {
      const index = options.indexOf(value);
      options.splice(index, 1);
    }

    this.setState({selectedLanguages: options});
  }

  handleNext = () => {
    const {navigation} = this.props;
    const {fName, lName, selectedLanguages} = this.state;
    if (!fName) {
      this.showAlert('error', 'Error', 'Please Enter First Name!');
      return null;
    } else if (!lName) {
      this.showAlert('error', 'Error', 'Please Enter Last Name!');
      return null;
    } else if (selectedLanguages.length < 1) {
      this.showAlert('error', 'Error', 'Please Select Any One Language!');
      return null;
    } else {
      navigation.navigate(
        'Select2',
        {displayName: `${fName} ${lName}`, languages_spoken: selectedLanguages},
      );
    }
  }

  showAddLanguages = () => this.setState({showAddLanguages: true});

  handleAddSpecilities = async () => {
    const {newLanguage, languagesSpoken} = this.state;
    if (!newLanguage) {
      this.showAlert('error', 'Error', 'Please Enter Language!');
      return null;
    }
    this.setState({
      showAddLanguages: false,
      newLanguage: '',
      languagesSpoken: _.uniq([...languagesSpoken, newLanguage]),
    });
  }

  render() {
    const {fName, lName, languagesSpoken, showAddLanguages, newLanguage} = this.state;
    return (
      <KeyboardAwareScrollView extraScrollHeight={10} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.logoContainer}>
          <Image source={Images.launch} style={styles.logo}/>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            value={fName}
            style={globalStyles.textInput}
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            placeholder='First Name'
            onChangeText={(value) => this.handleChange(value.trim(), 'fName')}
          />
          <TextInput
            value={lName}
            style={globalStyles.textInput}
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
            placeholder='Last Name'
            onChangeText={(value) => this.handleChange(value.trim(), 'lName')}
          />
          <Text style={globalStyles.formSubTitle}>Languages Spoken</Text>
          <View style={[globalStyles.checkboxContainer, styles.checkboxContainer]}>
            {
              languagesSpoken.map((item) => {
                return (
                  <View key={item}>
                    <CheckBox
                      label={item}
                      key={item}
                      onChange={(checked) => this.handleLanguages(item, checked)}
                    />
                  </View>
                )
              })
            }
          </View>
          <Button
            onPress={this.showAddLanguages}
            type='solid'
            title='Other'
            containerStyle={{marginVertical: 10}}
          />
          {showAddLanguages && (
            <View style={styles.addSpecialtiesCon}>
              <TextInput
                style={[globalStyles.textInput, {flex: 1, height: 30, marginRight: 10}]}
                placeholder="Enter Language*"
                value={newLanguage}
                onChangeText={(text) => this.setState({newLanguage: text})}
              />
              <Button
                onPress={this.handleAddSpecilities}
                type='solid'
                title='Add'
              />
            </View>
          )}
          <Button
            onPress={this.handleNext}
            type='solid'
            title='Next'
            containerStyle={{marginVertical: 10}}
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

export default connect(null, null)(Select1);
