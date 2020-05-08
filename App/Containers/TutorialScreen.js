import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images, Metrics } from '../Themes'
import React, { Component } from 'react'
import {
  View,
  Image
} from 'react-native'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'
import { Button } from 'react-native-elements'
import style from './Styles/CreateGuardianScreenStyle'
import * as Animatable from 'react-native-animatable'

class TutorialScreen extends Component {
  static navigationOptions = {
    header: null
  }
  _renderDotIndicator () {
    return <PagerDotIndicator pageCount={5}
      selectedDotStyle={{width: 13, borderRadius: 6, backgroundColor: '#74bcf7'}}
      dotStyle={{width: 5,
        height: 5,
        borderRadius: 2.5,
        margin: 5,
        borderWidth: 1,
        borderColor: '#74bcf7)',
        backgroundColor: '#74bcf7' }} />
  }

  render () {
    const imageDimensions = { width: Metrics.screenWidth, height: 500 }

    return (
      <View style={{height: '100%', backgroundColor: 'white', paddingTop: 50, paddingBottom: 20}}>
        <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={Images.launch} style={style.logo}/>
        </View>
        <IndicatorViewPager
          style={{flex: 0.8}}
          indicator={this._renderDotIndicator()}
        >
          <View><Image source={Images.tut0} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={Images.tut1} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={Images.tut2} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={Images.tut3} resizeMode='contain' style={imageDimensions} /></View>
          <View><Image source={Images.tut4} resizeMode='contain' style={imageDimensions} />
            <View style={{ margin: 20 }}><Button title='Get Started' onPress={() => this.props.navigation.navigate('DashboardScreen')} /></View>
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
