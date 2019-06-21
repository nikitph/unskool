import React, { Component } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'

class ChatScreen extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    let msg = []
    this.setState({
      messages: msg
    })
  }

  onSend (messages = []) {
    let msgObj = (messages[0])
    let receiver = this.props.navigation.state.params
    // sendMessage(this.props, Object.assign({}, msgObj, {receiver: this.props.gid, sender: this.props.user.uid}))
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, messages),
    //   };
    // });
  }

  render () {
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
const mapStateToProps = (state) => {
  return {
    guardian: state.login.payload
  }
}

export default connect(mapStateToProps)(ChatScreen)
