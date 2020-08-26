import React, {Component} from 'react';
import {connect} from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import style from './Styles/EditEventScreenStyle';

import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import globalStyles from '../Themes/GlobalStyles';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import EditEventActions from '../Redux/EditEventRedux';
import DeleteEventActions from '../Redux/DeleteEventRedux';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {generateCalendarDates} from '../Services/DateGenerator';
// import actions from '../../redux/actions';

import CheckBox from '../Components/CheckBox';
import {Button} from 'react-native-elements';
import PrivacyForm from '../Components/PrivacyForm';
import PhotoUpload from '../Components/PhotoUpload';
import DropdownAlert from 'react-native-dropdownalert';
import {Images} from '../Themes';

const now = moment()
  .hour(0)
  .minute(0);
const nowFormat = now.format('YYYY-MM-DD');
const today = now.format('YYYY-MM-DD');
const priorDay = today.slice(-2) - 1;
const yesterday = `${today.slice(0, 8)}${priorDay}`;
// import BackButton from '../components/BackButton';

class EditEventScreen extends Component {
  static navigationOptions = {
    headerTitle: () => (
      <Image source={Images.launch} style={{width: 40, height: 40}} />
    ),
  };
  constructor(props) {
    super(props);
    let event = this.props.navigation.state.params.eventData;
    let ekey = this.props.navigation.state.params.ekey;

    //
    // STATE OBJECT
    //
    const {
      gid,
      hostName,
      privacy,
      latlong,
      image,
      title,
      summary,
      profileImage,
      seatsAvailable,
      recurringDays,
      frequency,
      externalLink = '',
      eventType = 'inperson',
      ageRange,
      startDate,
      startTime,
      formattedStartDate,
      finishDate,
      finishTime,
      formattedFinishDate,
      sponsored,
    } = event;
    this.state = {ekey, ...event};

    // FILE UPLOAD
    // this.storageRef = storage.ref(`event-images/${props.auth.uid}`);

    // bind functions
    this.radioButtonChange = this.radioButtonChange.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  handleImageSelector() {
    this.setState({imageModal: !this.state.imageModal});
  }

  showAlert(type, title, message) {
    this.refs._scrollView.scrollTo(0);
    this.dropdown.alertWithType(type, title, message);
  }

  getSelectedImages(images, current) {
    this.setState({selectedImage: current});
  }

  /**
   *
   * @param e
   */
  handleChange(value, fieldName) {
    let inputObj = {};
    inputObj[fieldName] = value;
    this.setState(inputObj);
  }

  // HANDLE THE SEATS AVAILABLE
  //
  //
  handleSeatsAvailable(option) {
    // get the current seats available
    let currentSeats = this.state.seatsAvailable;

    option === 'add' ? currentSeats++ : currentSeats--;

    if (currentSeats < 0) currentSeats = 0;

    this.setState({seatsAvailable: currentSeats});
  }

  checkboxChange(checkbox, checkboxOptions, checked) {
    // current array of options
    let options = [];
    if (this.state[checkboxOptions]) {
      options = _.uniq([...this.state[checkboxOptions]]);
    }

    // check if the check box is checked or unchecked
    if (checked) {
      // add the numerical value of the checkbox to options array
      options.push(checkbox);
    } else {
      // or remove the value from the unchecked checkbox from the array
      const ind = options.indexOf(checkbox);
      options.splice(ind, 1);
    }
    let y = options.sort(function(a, b) {
      return a.split('-')[0] - b.split('-')[0];
    });

    this.setState({[checkboxOptions]: options});
  }

  radioButtonChange(value, group) {
    // current array of options
    let radioButtonGroup = group;
    let radio = value;

    const newState = {};
    newState[radioButtonGroup] = radio;

    // update the state with the new array of options
    this.setState(newState);
  }

  /**
   *
   * @param e
   */
  submitForm() {
    const newEvent = {...this.state};

    let {
      formattedStartDate,
      formattedFinishDate,
      recurringDays,
      frequency,
    } = newEvent;

    // generate a collection of formatted dates from the recurring event days and place that collection into the newEvent obj
    let recurringDaysSequence = [
      {sortNo: 1, value: 'M'},
      {sortNo: 2, value: 'T'},
      {sortNo: 3, value: 'W'},
      {sortNo: 4, value: 'Th'},
      {sortNo: 5, value: 'F'},
      {sortNo: 6, value: 'S'},
      {sortNo: 7, value: 'Su'},
    ];
    let newRecurDays = [];

    if (recurringDays) {
      newRecurDays = _.sortBy(
        _.filter(recurringDaysSequence, day =>
          recurringDays.includes(day.value),
        ),
        'sortNo',
      ).map(d => d.value);
    }
    newEvent['recurringDays'] = newRecurDays;
    newEvent.calendarDates = generateCalendarDates(
      formattedStartDate,
      formattedFinishDate,
      newRecurDays,
      frequency,
    );

    // store the selected image's url
    const {selectedImage, profileImage} = this.state;
    let imageUri;
    selectedImage ? (imageUri = selectedImage.uri) : (imageUri = profileImage);

    // add a timestamp to the added event
    newEvent.timestamp = new Date().getTime();

    // update the store, create a new user object with the updated event in it
    /* const newUserObject = app.props.user;

    // get the collection of the host's events
    const eventGroup = app.props.user.hostEvents || {};

    // add the new event to the event group
    eventGroup[`${newEvent.title}`] = newEvent;
    newUserObject['hostEvents'] = eventGroup;

    // pass the updated object to the store
    store.dispatch(actions.handleHostEvent(newUserObject));

    // update the database
    //
    // add the event to the guardian host branch - path, data
    let userId = addItem(`guardians/${this.state.gid}/hostEvents`, newEvent);
    // add the event to the general hosts tree - path, data
    updateProfile(`hostEvents/${this.state.gid}/${userId}`, newEvent);

    // update the database
    const eventRef = database.ref(`guardians/${this.state.gid}/hostEvents/${userId}`)
    const hostRef = database.ref(`hostEvents/${this.state.gid}/${userId}`)

    // upload the profile image
    handleFileUpload(imageUri, selectedImage, this.storageRef, eventRef);
    handleFileUpload(imageUri, selectedImage, this.storageRef, hostRef);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app}) */
    this.props.attemptEditEvent(
      newEvent,
      this.showAlert,
      this.props.navigation,
    );
  }

  deleteEvent() {
    this.props.attemptDeleteEvent(
      {ekey: this.state.ekey, gid: this.state.gid},
      this.showAlert,
      this.props.navigation,
    );
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const {profileImage} = this.state;
    let formData = {
      ageRange: ['0-3', '3-6', '6-9', '9-12', '12-15'],
    };

    const outputCheckboxes = () => {
      let checkboxOutput = [];
      for (let category in formData) {
        checkboxOutput.push(
          <View>
            <Text style={globalStyles.formSubTitle}>{category}</Text>
            <View style={[globalStyles.checkboxContainer, {marginBottom: 30}]}>
              {formData[category].map(item => {
                let checkbox = '';
                // pre-check any items that were selected and saved
                if (
                  this.state[category] &&
                  this.state[category].indexOf(item) > -1
                ) {
                  checkbox = (
                    <CheckBox
                      label={item}
                      checked
                      key={item}
                      onChange={checked =>
                        this.checkboxChange(item, category, checked)
                      }
                    />
                  );
                } else {
                  checkbox = (
                    <CheckBox
                      label={item}
                      key={item}
                      onChange={checked =>
                        this.checkboxChange(item, category, checked)
                      }
                    />
                  );
                }

                return checkbox;
              })}
            </View>
          </View>,
        );
      }
      return checkboxOutput;
    };

    // set the data structure for the frequency radio buttons group
    const frequency_radio_props = [
      {label: 'none', value: 'none'},
      {label: 'weekly', value: 'weekly'},
      {label: 'monthly', value: 'monthly'},
    ];

    // needed to ensure radio doesnt reset on privacy change
    let frequencySelected;
    frequency_radio_props.map((option, i) => {
      // if there's a match, return the index of the matching item
      if (this.state.frequency === option.value) {
        frequencySelected = i;
      }
    });

    // set the data structure for the event type radio buttons group
    const event_type_radio_props = [
      {label: 'inperson', value: 'inperson'},
      {label: 'online', value: 'online'},
      {label: 'virtual', value: 'virtual'},
    ];

    // needed to ensure radio doesnt reset on privacy change
    let eventTypeSelected;
    event_type_radio_props.map((option, i) => {
      // if there's a match, return the index of the matching item
      if (this.state.eventType === option.value) {
        eventTypeSelected = i;
      }
    });

    // set the data structure for the recurringDays checkbox group
    const recurringDays_checkbox_props = [
      {label: 'Mon', value: 'M'},
      {label: 'Tue', value: 'T'},
      {label: 'Wed', value: 'W'},
      {label: 'Thu', value: 'Th'},
      {label: 'Fri', value: 'F'},
      {label: 'Sat', value: 'S'},
      {label: 'Sun', value: 'Su'},
    ];

    // handle the output of the required image
    let eventImage =
      profileImage !== '../Images/blank-profile-pic.png'
        ? {uri: profileImage}
        : require('../Images/blank-profile-pic.png');

    return (
      <ScrollView style={style.container} ref="_scrollView">
        <Text
          style={[globalStyles.title, {color: 'white', textAlign: 'center'}]}>
          {' '}
          Add an Event!{' '}
        </Text>
        <View className="image-uploader">
          <View style={globalStyles.formImageContainer}>
            <PhotoUpload
              width={100}
              height={100}
              onPhotoSelect={avatar => {
                if (avatar) {
                  this.setState({profileImage: avatar});
                }
              }}>
              <Image
                style={{
                  paddingVertical: 10,
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
                resizeMode="cover"
                source={{
                  uri: this.state.profileImage,
                }}
              />
            </PhotoUpload>
          </View>
        </View>

        <View style={{paddingBottom: 140}}>
          <TextInput
            style={globalStyles.textInput}
            placeholder="Event Title"
            placeholderTextColor="white"
            defaultValue={this.state.title}
            onChangeText={value => this.handleChange(value, 'title')}
          />

          <TextInput
            style={[globalStyles.textInput, {height: 90}]}
            multiline
            numberOfLines={6}
            placeholder="Summary of the event"
            placeholderTextColor="white"
            defaultValue={this.state.summary}
            onChangeText={value => this.handleChange(value, 'summary')}
          />

          <Text style={[style.subTitle, {textAlign: 'center'}]}>
            Seats Available
          </Text>
          <View style={style.seatsAvailableContainer}>
            <View style={style.seatsAvailableControls}>
              <TouchableHighlight
                onPress={() => this.handleSeatsAvailable('minus')}>
                <Image
                  source={require('../Images/minus-white.png')}
                  resizeMode="cover"
                  style={style.seatControlsIcon}
                />
              </TouchableHighlight>
              <Image
                source={require('../Images/chair-white.png')}
                resizeMode="cover"
                style={style.seatIcon}
              />
              <TouchableHighlight
                onPress={() => this.handleSeatsAvailable('add')}>
                <Image
                  source={require('../Images/plus-sign-white.png')}
                  resizeMode="cover"
                  style={style.seatControlsIcon}
                />
              </TouchableHighlight>
            </View>
            <View style={style.seatCount}>
              <Text style={style.seatCountCopy}>
                {this.state.seatsAvailable}
              </Text>
            </View>
          </View>

          <Text style={style.subTitle}> Start Date </Text>
          <DatePicker
            style={style.datePicker}
            date={this.state.startDate}
            mode="datetime"
            placeholder="Start Date"
            format="MMMM Do YYYY, h:mm a"
            minDate={`${yesterday}`}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: style.dateInput,
              placeholderText: style.datePickerText,
              dateText: style.dateText,
            }}
            minuteInterval={15}
            showIcon={false}
            onDateChange={date => {
              this.setState({
                startDate: date,
                startTime: moment(date, 'MMMM Do YYYY, h:mm a').format(
                  'h:mm a',
                ),
                formattedStartDate: moment(date, 'MMMM Do YYYY, h:mm a').format(
                  'YYYY-MM-DD',
                ),
              });
            }}
          />

          <Text style={style.subTitle}> Finish Date </Text>
          <DatePicker
            style={style.datePicker}
            date={this.state.finishDate}
            mode="datetime"
            placeholder="Finish Date"
            format="MMMM Do YYYY, h:mm a"
            minDate={`${yesterday}`}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: style.dateInput,
              placeholderText: style.datePickerText,
              dateText: style.dateText,
            }}
            minuteInterval={5}
            showIcon={false}
            onDateChange={date => {
              this.setState({
                finishDate: date,
                finishTime: moment(date, 'MMMM Do YYYY, h:mm a').format(
                  'h:mm a',
                ),
                formattedFinishDate: moment(
                  date,
                  'MMMM Do YYYY, h:mm a',
                ).format('YYYY-MM-DD'),
              });
            }}
          />

          <Text style={style.subTitle}>Repeats</Text>
          <View style={[globalStyles.radioButtonContainer, {marginTop: 5}]}>
            {/* custom checkbox output for the event form. This doesn't exist in the formData */
            recurringDays_checkbox_props.map(item => {
              let {label, value} = item;
              const isChecked =
                this.state.recurringDays &&
                this.state.recurringDays.indexOf(item.value) > -1;
              return (
                <CheckBox
                  label={label}
                  key={label}
                  checked={isChecked}
                  onChange={checked =>
                    this.checkboxChange(value, 'recurringDays', checked)
                  }
                />
              );
            })}
          </View>

          <View>
            <Text style={style.subTitle}>Frequency</Text>
            <RadioForm
              radio_props={frequency_radio_props}
              initial={frequencySelected}
              style={{marginTop: 5, marginBottom: 5}}
              buttonColor={'rgba(0, 0, 0, 0.3)'}
              buttonSize={30}
              buttonWrapStyle={{padding: 30, marginRight: 10}}
              labelStyle={{
                marginRight: 30,
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: 15,
              }}
              formHorizontal
              onPress={value => {
                this.radioButtonChange(value, 'frequency');
              }}
            />
          </View>
          <View style={[globalStyles.radioButtonContainer, {marginBottom: 30}]}>
            {outputCheckboxes()}
          </View>

          <View>
            <Text style={style.subTitle}>Event Type</Text>
            <RadioForm
              radio_props={event_type_radio_props}
              initial={eventTypeSelected}
              style={{marginTop: 5, marginBottom: 5}}
              buttonColor={'rgba(0, 0, 0, 0.3)'}
              buttonSize={30}
              buttonWrapStyle={{padding: 30, marginRight: 10}}
              labelStyle={{
                marginRight: 30,
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: 15,
              }}
              formHorizontal
              onPress={value => {
                this.radioButtonChange(value, 'eventType');
              }}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="External URL"
              placeholderTextColor="white"
              defaultValue={this.state.externalLink}
              onChangeText={value => this.handleChange(value, 'externalLink')}
            />
          </View>

          <PrivacyForm
            globalStyle={globalStyles}
            onChange={this.radioButtonChange}
            privacy={this.state.privacy}
            title={'Event Privacy'}
          />

          <Button
            onPress={() => {
              this.submitForm();
            }}
            type="solid"
            title="Update Event"
            loading={this.props.fetching}
          />
          <View style={{margin: 7}} />
          <Button
            onPress={() => {
              this.deleteEvent();
            }}
            type="solid"
            buttonStyle={{backgroundColor: 'red'}}
            title="Delete Event"
            loading={this.props.deleting}
          />
        </View>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          showCancel
          translucent
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    guardian: state.login.payload,
    fetching: state.editevent.fetching,
    deleting: state.deleteevent.fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    attemptEditEvent: (edata, alertfunc, nav) =>
      dispatch(EditEventActions.editEventRequest(edata, alertfunc, nav)),
    attemptDeleteEvent: (edata, alertfunc, nav) =>
      dispatch(DeleteEventActions.deleteEventRequest(edata, alertfunc, nav)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEventScreen);
