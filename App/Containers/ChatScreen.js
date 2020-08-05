import React, { Component } from 'react'
import { Button, TouchableOpacity, View, Alert } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import ChatPostTypes from '../Redux/ChatPostRedux'
import { Images } from '../Themes'
import * as Animatable from 'react-native-animatable'
import styles from './Styles/ViewGuardianScreenStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class ChatScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Animatable.Image animation='fadeIn' source={Images.launch} style={{width: 40, height: 40}}
      />,
      headerRight: <TouchableOpacity style={[styles.headerIconContainer, {margin: 10}]}
                                     onPress={() => {
                                       Alert.alert(
                                         'Are you sure you want to block this user?',
                                         'You will no longer be able to communicate with this person',
                                         [
                                           {
                                             text: 'Yes I am sure',
                                             onPress: () => navigation.navigate('DashboardScreen')
                                           },
                                           {
                                             text: 'No, Cancel',
                                             onPress: () => console.log('Cancel Pressed'),
                                             style: 'cancel'
                                           },
                                         ],
                                         {cancelable: false}
                                       )
                                     }
                                     }>
        {/* <Icon name={'md-chat'} size={15} color="#949BA1" /> */}
        <MaterialCommunityIcons name={'alert-octagon-outline'} size={28} color="#BF4342"/>
      </TouchableOpacity>
      ,
      headerBackTitle: ' '
    }
  }

  constructor (props) {
    super(props)
    const {navigation, messages, guardian} = props
    let receiver = {
      receiverId: navigation.state.params.params.uid,
      receiverName: navigation.state.params.params.displayName,
      receiverPic: navigation.state.params.params.image
    }
    let sender = {
      senderId: guardian.uid,
      senderName: guardian.displayName,
      senderPic: guardian.image
    }
    let initState = Object.assign({}, sender, receiver, messages)
    this.state = initState
    this.onSend = this.onSend.bind(this)
    console.log('hmmm', navigation.state.params.params)
  }

  componentWillMount () {
    this.setState({
      messages: this.props.messages.filter(msg => ((msg.senderId === this.props.guardian.uid && msg.receiverId === this.props.navigation.state.params.params.uid) ||
        (msg.receiverId === this.props.guardian.uid && msg.senderId === this.props.navigation.state.params.params.uid))).sort(function compare (a, b) {
        let dateA = new Date(a.createdAt)
        let dateB = new Date(b.createdAt)
        return dateB - dateA
      })
    })
  }

  onSend (messages = []) {
    let msgObj = (messages[0])
    this.props.postMessage(Object.assign({}, this.state, msgObj))
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      }
    })
  }

  render () {
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/my-community-classroom-app.appspot.com/o/app-images%2Fblank-profile-pic.png?alt=media&token=ddf9cff0-ad81-4105-85b1-6f5498e16686'

    return (
      <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 30}}>
        <GiftedChat
          messages={this.props.messages.filter(msg => ((msg.senderId === this.props.guardian.uid && msg.receiverId === this.props.navigation.state.params.params.uid) ||
            (msg.receiverId === this.props.guardian.uid && msg.senderId === this.props.navigation.state.params.params.uid))).sort(function compare (a, b) {
            let dateA = new Date(a.createdAt)
            let dateB = new Date(b.createdAt)
            return dateB - dateA
          })}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.props.guardian.uid,
            name: this.props.guardian.displayName,
            avatar: this.props.guardian.image || defaultImage
          }}
        />

      </View>
    )
  };
}

const mapStateToProps = (state) => {
  let msgArray = state.chat.payload ? Object.values(state.chat.payload) : []
  return {
    messages: msgArray,
    guardian: state.login.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    postMessage: (data) =>
      dispatch(ChatPostTypes.chatPostRequest(data))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
