import React, {Component} from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  LayoutAnimation
} from 'react-native'// import PropTypes from 'prop-types';
import style from './Styles/SummaryStyle'
import { Avatar, Badge } from 'react-native-elements'
import GlobalStyles from '../Themes/GlobalStyles'

export default class Summary extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expandTags: false
    }

    this.expandTags = this.expandTags.bind(this)
  }

  expandTags () {
    LayoutAnimation.easeInEaseOut()
    this.setState({
      expandTags: !this.state.expandTags
    })
  }

  render () {
    let userData = this.props.guardian
    console.log(this.props)

    // if guardianData is passed in the props, then show guardian data
    // instead of admin user data

    const { greeting } = userData
    const languages = userData['languages spoken'] || []
    const specialties = userData.specialties || []
    let wrapState = this.state.expandTags ? 'wrap' : 'nowrap'
    let ellipseText = !this.state.expandTags ? '...' : '^'

    let languageTags = dataToTag(languages, 'languages')
    let specialtyTags = dataToTag(specialties, 'specialties')

    function dataToAvatar (children, childs, nav) {
      return (
        Object.keys(children).map((item, i) => {
          let keyId = `${childs}${item}${i}`
          console.log(children[item])
          console.log(item)
          if (children[item].profileImage) {
            return (
              <View key={keyId} style={{padding: 5}}>
                <Avatar rounded
                  size='medium'
                  source={{
                    uri: children[item].profileImage
                  }}
                  showEditButton
                  onEditPress={() => nav.navigate('EditChildScreen', { childData: children[item], ckey: item})}
              />
              </View>
            )
          }
        })
      )
    }

    let avatars = dataToAvatar(userData.children, 'childs', this.props.nav)

    function dataToTag (items, cat) {
      return (
        items.map((item, i) => {
          let keyId = `${cat}${item}${i}`
          return (
            <Badge value={item} status='error' key={keyId} badgeStyle={style.tagItem} />
          )
        })
      )
    }

    // check if the user wrote a greeting
    const greetingCopy = greeting
      ? <Text style={style.summaryCopy}>{greeting}</Text>
      : <Text style={[style.summaryCopy, style.summaryBodyCopy]} >It looks like you don't have a summary bio yet, you can add one by clicking the edit button (which you don't see yet, because we're developing it).</Text>
    return (
      <View style={style.container}>
        <View style={style.greetingContainer}>{ greetingCopy }</View>
        <View style={{flexDirection: 'row', flex: 1, marginLeft: 10, marginRight: 10}}>
          <View style={{flex: 0.8, flexDirection: 'row', flexWrap: wrapState, overflow: 'hidden'}}>
            {languageTags}
            {specialtyTags}
          </View>
          <View style={{flex: 0.2, paddingLeft: 5, alignItems: 'center'}}>
            <TouchableHighlight onPress={() => {
              this.expandTags()
            }} underlayColor={'white'}>
              <View style={style.ellipsis}>
                <Text style={{width: 20, textAlign: 'center', color: '#fff'}}>{ellipseText}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <Text style={GlobalStyles.formSubTitle}>Children</Text>
        <View style={{flex: 0.8, flexDirection: 'row', flexWrap: wrapState, overflow: 'hidden', padding: 10}}>
          {avatars}
        </View>
      </View>
    )
  }
}
