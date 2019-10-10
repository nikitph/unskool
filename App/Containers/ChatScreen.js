import React, { Component } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import ChatPostTypes from '../Redux/ChatPostRedux'
import { dbService, mapp } from '../Services/Firebase'

const usr = mapp.auth()

class ChatScreen extends Component {
  constructor (props) {
    super(props)
    const {navigation, messages} = props
    let sender = {
      buyerId: usr.currentUser.uid,
      buyerName: usr.currentUser.displayName,
      buyerPic: usr.currentUser.photoURL
    }
    let initState = Object.assign({}, sender, messages)
    this.state = initState
    this.onSend = this.onSend.bind(this)
  }

  componentWillMount () {
    this.setState({
      messages: this.props.messages.filter(msg => (msg.sender === usr.currentUser.uid ||
        msg.receiver === usr.currentUser.uid)).sort(function compare (a, b) {
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
    return (
      <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 30}}>
        <GiftedChat
          messages={this.props.messages.filter(msg => (msg.sender === usr.currentUser.uid ||
            msg.receiver === usr.currentUser.uid)).sort(function compare (a, b) {
            let dateA = new Date(a.createdAt)
            let dateB = new Date(b.createdAt)
            return dateB - dateA
          })}
          onSend={(messages) => this.onSend(messages)}
          user={{_id: usr.currentUser.uid, name: usr.currentUser.displayName, avatar: usr.currentUser.photoURL}}
        />

      </View>
    )
  };
}
const mapStateToProps = (state) => {
  let msgArray = state.chat ? Object.values(state.chat.payload) : []
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

export default connect(mapStateToProps, mapDispatchToProps())(ChatScreen)
