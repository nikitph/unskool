import React, { Component } from 'react'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import style from './Styles/FeedbackFormScreenStyle'

import { View, TouchableHighlight, Text, Image, TextInput, ScrollView } from 'react-native'
import { SegmentedControls } from 'react-native-radio-buttons'
import * as Animatable from 'react-native-animatable'
import { Button } from 'react-native-elements'
import globalStyles from '../Themes/GlobalStyles'
import { sendEmail } from '../Services/Email'
import { Images } from '../Themes'

class FeedbackFormScreen extends Component {
  static navigationOptions = {
    headerTitle: () => <Image iterationCount='infinite' source={Images.launch} style={{ width: 40, height: 40 }} />
  }
  constructor(props) {
    super(props)
    this.state = {
      rating: '',
      device: '',
      recommended: '',
      bugs: '',
      features: '',
      comments: '',
      response: '',
      loading: false
    }
  }

  handleFieldChange(value, fieldName) {
    let inputObj = {}
    inputObj[fieldName] = value
    this.setState(inputObj)
  }

  getEmailBody(data) {
    return 'Rating: ' + data.rating +
      '\n Device : ' + data.device +
      '\n Bugs reported : ' + data.bugs +
      '\n Features requested : ' + data.features +
      '\n Comments : ' + data.comments +
      '\n Recommended :' + data.recommended +
      '\n From : ' + this.props.guardian.displayName + ' ' + this.props.guardian.email
  }

  sendMail(data) {
    let emailBody = this.getEmailBody(data)

    sendEmail('mycommunityclass@gmail.com', 'Someone Left a feedback', emailBody).then((response) => {
      if (response.ok) {
        // this.props.alertFunc('success', 'Success', 'Feedback successfully submitted!')
        this.setState({
          response: `${response.status} - ${response.ok}`,
          rating: '',
          device: '',
          recommended: '',
          bugs: '',
          features: '',
          comments: '',
          loading: false
        })
        this.props.navigation.navigate('DashboardScreen')
      } else {
        // this.props.alertFunc('error', 'Error', 'Uh oh! Something went wrong. Please try again')
        this.setState({
          response: `${response.status} - ${response.ok}`,
          loading: false
        })
      }
    })
  }

  render() {
    return (
      <ScrollView style={style.container}>
        <View style={style.titleRow}>
          <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: '100', color: 'rgba(0,0,0,0.7)' }}>Your feedback is extremely
              valuable and important for us to improve and give you the perfect user experience you deserve! {'\n'}{'\n'}
              Please share your thoughts with us below.</Text>
          </View>
          <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}>
            <Text style={style.questionStyle}>{'\n'}What do you think of our App?</Text>
          </View>
          <SegmentedControls
            options={['1', '2', '3', '4', '5']}
            onSelection={(rating) => this.handleFieldChange(rating, 'rating')}
            selectedOption={this.state.rating}
            optionContainerStyle={{ flex: 1 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '100', color: 'rgba(0,0,0,0.5)' }}>meh.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '100', color: 'rgba(0,0,0,0.5)' }}>Awesome!</Text>
            </View>
          </View>
        </View>
        <View style={style.textGroup}>
          <View style={{ marginRight: 10 }}>
            <Text
              style={style.questionStyle}>What device are you currently using?
            </Text>
          </View>
          <View>
            <TextInput
              style={[globalStyles.textInput, { height: 90 }]}
              multiline
              numberOfLines={6}
              placeholder='i.e. iPhone 7, Samsung Galaxy S8...'
              placeholderTextColor='white'
              value={this.state.device}
              onChangeText={(device) => this.handleFieldChange(device, 'device')}
            />
          </View>
        </View>
        <View style={style.textGroup}>
          <View style={{ marginRight: 10 }}>
            <Text
              style={style.questionStyle}>Did you come across any bugs or
              issues while using our app that need to be fixed immediately?
            </Text>
          </View>
          <View>
            <TextInput
              style={[globalStyles.textInput, { height: 90 }]}
              multiline
              numberOfLines={6}
              placeholder='Your Thoughts...'
              placeholderTextColor='white'
              value={this.state.bugs}
              onChangeText={(bugs) => this.handleFieldChange(bugs, 'bugs')}
            />
          </View>
        </View>
        <View style={style.textGroup}>
          <View style={{ marginRight: 10 }}>
            <Text
              style={style.questionStyle}>Are there any features you'd like to
              see added to your experience in a future update?
            </Text>
          </View>
          <View>
            <TextInput
              style={[globalStyles.textInput, { height: 90 }]}
              multiline
              numberOfLines={6}
              placeholder='Your Thoughts...'
              placeholderTextColor='white'
              value={this.state.features}
              onChangeText={(features) => this.handleFieldChange(features, 'features')}
            />
          </View>
        </View>
        <View style={style.textGroup}>
          <View style={{ marginRight: 10 }}>
            <Text
              style={style.questionStyle}>Is there anything else you'd like to
              share with us?
            </Text>
          </View>
          <View>
            <TextInput
              style={[globalStyles.textInput, { height: 90 }]}
              multiline
              numberOfLines={6}
              placeholder='Your Thoughts...'
              placeholderTextColor='white'
              value={this.state.comments}
              onChangeText={(comments) => this.handleFieldChange(comments, 'comments')}
            />
          </View>
        </View>
        <View style={style.imageGroup}>
          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <Text style={style.questionStyle}>How likely are
            you to recommend My Community Classroom
              to your friends and Family?</Text>
          </View>
          <SegmentedControls
            options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            onSelection={(recommended) => this.handleFieldChange(recommended, 'recommended')}
            selectedOption={this.state.recommended}
            optionContainerStyle={{ flex: 1 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '100', color: 'rgba(0,0,0,0.5)' }}>not at all</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: '100', color: 'rgba(0,0,0,0.5)' }}>very likely</Text>
            </View>
          </View>

        </View>
        <View style={[style.textGroup, { width: '100%' }]}>
          <View>
            <Button
              onPress={() => {
                this.setState({ loading: true })
                this.sendMail(this.state)
              }}
              type='solid'
              title='Submit'
              loading={this.state.loading}
            />
          </View>
        </View>

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    guardian: state.login.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackFormScreen)
