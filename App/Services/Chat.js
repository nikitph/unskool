import db from './firebase'

export function sendMessage (guardian, msg) {
  const { uid } = guardian
  const { displayName } = guardian
  const {text, _id, receiver, sender } = msg
  const msgObj = Object.assign({text, _id, receiver, sender},
    {createdAt: msg.createdAt.toJSON()}, { user: msg.user })

  let senderMsgRef =
    db.ref(`chats/${uid}/messages`)
      .push(msgObj)
  const senderMsgKey = senderMsgRef.key

  let receiverMsgRef =
    db.ref(`chats/${receiver}/messages`)
      .push(msgObj)
  const receiverMsgKey = receiverMsgRef.key

  let message = 'has sent you a message.'
  let timestamp = (new Date()).getTime()

  // build the userObj for the notifications tree
  let notifObj = {
    noteType: 'chat',
    displayName,
    gid: uid,
    message,
    seen: false,
    timestamp
  }

  const notificationItem =
    db
      .ref(`guardians/${receiver}/notifications`)
      .push(notifObj)

  const notificationKey = notificationItem.key
}
