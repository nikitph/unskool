import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics, Colors } from '../Themes'
import { NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import { Card, ListItem, Icon, Avatar, Divider, Badge, Button } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Style
import styles from './Styles/ChildViewScreenStyle'
import style from '../Components/Styles/SummaryStyle'

class ChildViewScreen extends Component {
  static navigationOptions = {
    headerTitle: () => <Animatable.Image animation='fadeIn' source={Images.launch} style={{ width: 40, height: 40 }}
    />
  };

  render() {
    const allergies = this.props.navigation.state.params.childData.allergies || []

    let allergyTags = dataToTag(allergies, 'allergies')

    function dataToTag(items, cat) {
      return (
        items.map((item, i) => {
          let keyId = `${cat}${item}${i}`
          return (
            <Badge value={item} status='error' key={keyId} badgeStyle={style.tagItem} />
          )
        })
      )
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'transparent', marginBottom: 100 }}>
        <View style={{ width: '100%', backgroundColor: 'black', justifyContent: 'center' }}>
          <Card
            title={this.props.navigation.state.params.childData.fName + ' ' + this.props.navigation.state.params.childData.lName}
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

              <Avatar rounded
                size='medium'
                source={{
                  uri: this.props.navigation.state.params.childData.profileImage
                }}
              />
            </View>
            <Divider />
            <Text style={{ marginTop: 10 }}>
              Age : {this.props.navigation.state.params.childData.age}
            </Text>
            <Divider />

            <Text style={{ marginTop: 10 }}>
              gender : {this.props.navigation.state.params.childData.gender}
            </Text>
            <Divider />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' }}>
              {allergyTags}
            </View>
          </Card>
        </View>
        <View style={{ flex: 0.4, backgroundColor: '#F1E7D1', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={styles.text}>
            {this.props.navigation.state.params.childData.fname}
          </Text>
        </View>
        <Button
          onPress={() => { this.props.navigation.dispatch(this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DashboardScreen' })], 0)) }}
          type='solid'
          title='Submit'
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChildViewScreen)
