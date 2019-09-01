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
    console.log(usr)
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
      <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 30}}>
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
  let msgArray = state.itemchat ? Object.values(state.itemchat.payload) : []
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
