import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {Images} from '../Themes';
import * as Animatable from 'react-native-animatable';
import Hero from '../Components/Hero';
import EventTeaser from '../Components/EventTeaser';
import Summary from '../Components/Summary';
import FooterNav from '../Components/FooterNav';
// Styles
import styles from './Styles/ViewGuardianScreenStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {sendEmail} from '../Services/Email';

class ViewGuardianScreen extends Component {
  static navigationOptions = {
    headerTitle: () => (
      <Animatable.Image
        animation="fadeIn"
        source={Images.launch}
        style={{width: 40, height: 40}}
      />
    ),
  };

  state = {
    // Modal Error
    isVisible: false,
    chatIsVisible: false,
    msg: '', //MG: Set message initially to empty string

    //Report Abuse or feedback
    report: false,
    description: '',
  };

  getEmailBody(data) {
    return (
      'Abuse reported for guardian: ' +
      this.props.navigation.state.params +
      '\n user message : ' +
      data.msg
    );
  }

  sendMail(data) {
    let emailBody = this.getEmailBody(data);

    sendEmail('nikitph@gmail.com', 'Someone Left a feedback', emailBody).then(
      response => {
        if (response.ok) {
          //this.props.alertFunc('success', 'Success', 'Feedback successfully submitted!')
          this.setState({
            response: `${response.status} - ${response.ok}`,
            loading: false,
            chatIsVisible: false,
            msg: '',
          });
          this.props.navigation.navigate('DashboardScreen');
        } else {
          // this.props.alertFunc('error', 'Error', 'Uh oh! Something went wrong. Please try again')
          this.setState({
            response: `${response.status} - ${response.ok}`,
            loading: false,
          });
        }
      },
    );
  }

  onMessageChange(message) {
    this.setState({msg: message});
  }

  onReportButtonPress() {
    this.setState({chatIsVisible: true});
    this.setState({msg: ''});
  }
  render() {
    console.log(this.props);
    let guardian = this.props.navigation.state.params;
    return (
      <Animatable.View style={styles.container} animation="fadeIn">
        <Modal
          backdropOpacity={0.8}
          style={{alignItems: 'center'}}
          isVisible={this.state.chatIsVisible}
          onBackdropPress={() => this.setState({chatIsVisible: false})}>
          <View
            style={{
              width: 300,
              // height: 400, //MC: Height of modal
              // height: 300, //MC: Height of modal
              height: 250, //MC: Height of modal
              // height: 220, //MC: Height of modal
              // height: 200, //MC: Height of modal
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'white',
              // backgroundColor: 'rgba(0,0,0,0.3)', //partially transparent
              backgroundColor: 'white', //fully transparent
              // backgroundColor: 'rgb(0, 255, 0, 1.0)',
              borderRadius: 8,
              shadowOpacity: 0.1,
              shadowColor: 'rgb(36, 100, 193)',
              shadowOffset: {width: 4, height: 2},
            }}>
            <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                fontFamily: 'AvenirNext-UltraLight',
                fontSize: 20,
              }}>
              Report user
            </Text>
            <View
              style={{
                // flex: 0.2,
                flex: 0.5,
                // flex: 0.5,
                flexDirection: 'row',
                // justifyContent: 'center',
                justifyContent: 'flex-start',
                alignItems: 'center',
                // alignItems: 'flex-start',
                backgroundColor: 'white',
                width: 250,
                borderRadius: 9,
                borderWidth: 1,
                borderColor: 'gray',
                margin: 10,
              }}>
              <TextInput
                // clearButtonMode="always"
                // placeholder="Enter message (140 char max) "
                placeholder="Please Enter additional details "
                //inputStyle={styles.inputStyle}
                multiline={false}
                maxLength={300}
                onChangeText={this.onMessageChange.bind(this)}
                value={this.state.msg}
              />
            </View>

            <View
              style={{
                width: '100%',
                paddingLeft: 25, // Originally 36
                paddingTop: 0, // Originally 40
                paddingRight: 25, // Originally 36
                paddingBottom: 18, // Originally 36
              }}>
              <TouchableOpacity
                style={{
                  height: 30, // Originally 50
                  backgroundColor: '#62cfb9',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  shadowOpacity: 0.1,
                  shadowColor: 'rgb(36, 100, 193)',
                  shadowOffset: {width: 4, height: 2},
                }}
                onPress={() => this.sendMail(this.state)}>
                <Text
                  style={{
                    color: 'white',
                    // color: 'orange',
                    letterSpacing: -0.2,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Send Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <Hero
            guardian={guardian}
            nav={this.props.navigation}
            bVisible={false}
          />
        </View>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{flex: 0.3}}>
            <Summary
              addChildrenStatus={false}
              guardian={guardian}
              nav={this.props.navigation}
              bVisible={false}
            />
          </View>
          <View style={{flex: 0.1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={[styles.headerIconContainer, {margin: 10}]}
              onPress={() => this.onReportButtonPress()}>
              {/* <Icon name={'md-chat'} size={15} color="#949BA1" /> */}
              <MaterialCommunityIcons
                name={'alert-octagon-outline'}
                size={28}
                color="#BF4342"
              />
            </TouchableOpacity>
          </View>
          {/* <View style={{paddingBottom: 120}}> */}
          {/* <EventTeaser guardian={this.props.guardian} events={this.props.events} /> */}
          {/* </View> */}
        </ScrollView>
        <FooterNav navigation={this.props.navigation} />
      </Animatable.View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewGuardianScreen);
