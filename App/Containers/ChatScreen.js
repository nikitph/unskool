import React, { Component } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import ChatPostTypes from '../Redux/ChatPostRedux'

class ChatScreen extends Component {
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
            avatar: this.props.guardian.image
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
