/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { put } from 'redux-saga/effects'
import ChatPostActions from '../Redux/ChatPostRedux'
// import { ChatPostSelectors } from '../Redux/ChatPostRedux'
import { mapp } from '../Services/Firebase'

const db = mapp.database()

export function * chatPost (action) {
  const {data} = action
  const {text, senderName, senderId, senderPic, receiverName, receiverId, receiverPic, _id} = data
  const msgObj = Object.assign({text, senderName, senderId, senderPic, receiverName, receiverId, receiverPic, _id},
    {createdAt: data.createdAt.toJSON()}, {user: data.user}, {receiverPic: data.receiverPic || 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'})
  console.log(db)
  console.log(msgObj)

  try {
    let receiverMsgRef =
      db.ref(`messages/${data.receiverId}`)
        .push(msgObj)
    const receiverMsgKey = receiverMsgRef.key
    console.log(msgObj)

    let senderMsgRef =
      db.ref(`messages/${data.senderId}`)
        .push(msgObj)
    const senderMsgKey = senderMsgRef.key
    console.log(msgObj)

    let id = data.user._id === data.senderId ? data.receiverId : data.senderId
    let notifRef =
      db.ref(`notifications/${id}`)
        .push(Object.assign({}, msgObj, {read: false}))
    const notifKey = notifRef.key
    console.log(msgObj)

    yield put(ChatPostActions.chatPostSuccess({receiverMsgKey, senderMsgKey, notifKey}))
  } catch (error) {
    console.log(error)
    yield put(ChatPostActions.chatPostFailure({error}))
  }
}
