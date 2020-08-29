import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images, Metrics } from '../Themes'
import React, { Component } from 'react'
import {
  View,
  Image
} from 'react-native'
import { IndicatorViewPager, PagerDotIndicator } from 'react-native-best-viewpager'
import { Button } from 'react-native-elements'
import style from './Styles/CreateGuardianScreenStyle'
import * as Animatable from 'react-native-animatable'

class TutorialScreen extends Component {
  static navigationOptions = {
    headerShown: false
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={5}
      selectedDotStyle={{ width: 13, borderRadius: 6, backgroundColor: '#74bcf7' }}
      dotStyle={{
        width: 5,
        height: 5,
        borderRadius: 2.5,
        margin: 5,
        borderWidth: 1,
        borderColor: '#74bcf7',
        backgroundColor: '#74bcf7'
      }} />
  }

  render() {
    const imageDimensions = { width: Metrics.screenWidth, height: Metrics.screenHeight/1.5 }

    return (
      <View style={{ flex:1, backgroundColor: 'white',  }}>
        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={Images.launch} style={style.logo} />
        </View>
        <IndicatorViewPager
          style={{ flex: 0.7 }}
          indicator={this._renderDotIndicator()}
        >
          <View><Image source={Images.tut0} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={Images.tut1} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={Images.tut2} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={Images.tut3} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={Images.tut4} resizeMode='contain' style={imageDimensions} />
            <View style={{paddingVertical:30}}><Button title='Get Started' onPress={() => {
                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DashboardScreen' })], 0)
              }}
            />
            </View>
          </View>
        </IndicatorViewPager>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TutorialScreen)
