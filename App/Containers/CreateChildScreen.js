import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as Animatable from 'react-native-animatable'
// Styles
import styles from './Styles/CreateChildScreenStyle'
import { Images } from '../Themes'

class CreateChildScreen extends Component {
  static navigationOptions = {
    headerTitle: <Animatable.Image animation='rotate' duration='9000' source={Images.launch} style={{ width: 40, height: 40 }}
    />
  };
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>CreateChildScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChildScreen)
