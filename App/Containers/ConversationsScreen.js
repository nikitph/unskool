import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Switch } from 'react-native'
import { connect } from 'react-redux'
import { dbService, mapp } from '../Services/Firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import { SegmentedControls } from 'react-native-radio-buttons'

const usr = mapp.auth();

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/ConversationsScreenStyle'
import * as _ from 'lodash'
import { Images } from '../Themes'

class ConversationsScreen extends Component {
  static navigationOptions = {
    headerTitle: <Image animation='fadeIn' source={Images.launch} style={{width: 40, height: 40}}/>
  };
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'}
    ],
    myMessages: true
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}, nav, myMessages) {
    console.log(item)
    return (
      <TouchableOpacity style={styles.row} onPress={()=> nav.navigate('ChatScreen',
        {params: {uid : item.receiverId, displayName: item.receiverName, image: item.receiverPic}})}>
        <View style={{flex:0.2, alignItems:'flex-start'}}>
          <Image source={{uri: this.state.myMessages ? item.receiverPic : item.senderPic}}
                 style={{borderRadius:20, height:40, width:40,alignItems:'center'}} resizeMode={'cover'}/>
        </View>
        <View style={{flex:0.7, alignItems:'flex-start'}}>
          <Text style={styles.label}>{this.state.myMessages ? item.receiverName : item.senderName}</Text>
        </View>
        <View style={{flex:0.1, alignItems:'center'}}>
          <Icon name="ios-arrow-forward" size={32} color="rgba(116,100,78,1)"
          />
        </View>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - There are no relevant conversations - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  handleFieldChange (value, fieldName) {
    let inputObj = {};
    inputObj[fieldName] = value === "My conversations";
    this.setState(inputObj);
  }

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.conContainer}>
          <SegmentedControls
            options={ ["My Conversations","Conversations received"] }
            onSelection={(myMessages)=> this.handleFieldChange(myMessages ,'myMessages') }
            selectedOption={ this.state.myMessages ? "My Conversations" : "Conversations received" }
            optionContainerStyle={{flex:1}}
            containerBorderTint={'#F1E7D1'}
            containerBorderRadius={0}
            selectedBackgroundColor={'#665234'}
            tint={'#665234'}
            separatorTint={'#665234'}
          />
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.conversations.filter(msg=> {
            return !this.state.myMessages ? msg.receiverId === usr.currentUser.uid :  msg.senderId === usr.currentUser.uid
          })}
          renderItem={item => this.renderRow(item, this.props.navigation, this.state.myMessages)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let msgArray = state.chat.payload ? Object.values(state.chat.payload)
    .map(({senderName, senderId, senderPic, receiverName, receiverId, receiverPic})=>
      ({senderName, senderId, senderPic, receiverName, receiverId, receiverPic})) : [];
  return {
    conversations: _.uniqWith(msgArray, _.isEqual)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsScreen)
