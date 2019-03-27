import React, { Component } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

class ChatScreen extends Component {
  constructor () {
    super()
  }

  componentWillMount () {
    let msg = []
    this.setState({
      messages: msg
    })
  }

  onSend (messages = []) {
    let msgObj = (messages[0])
    // sendMessage(this.props, Object.assign({}, msgObj, {receiver: this.props.gid, sender: this.props.user.uid}))
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, messages),
    //   };
    // });
  }

  render () {
    const props = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white', paddingBottom:30}}>
        <GiftedChat
          messages={[]}
          onSend={(messages) => this.onSend(messages)}
          user={{_id: '1', name: 'test', avatar: ''}}
        />

      </View>
    )
  };
}

export default ChatScreen
