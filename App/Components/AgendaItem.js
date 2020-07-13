import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import style from './Styles/AgendaItemStyle'
import { View, TouchableHighlight, Text, Image } from 'react-native'

export default class AgendaItem extends Component {

  render () {
    const props = this.props.item
    let subRowData = this.getSubRowData(props)
    return (
      <View style={style.container}>
        <View style={style.titleRow}>
          <TouchableHighlight style={style.button}>
            <Text style={style.buttonText}>
              {props.startTime + ' - ' + props.finishTime}
            </Text>
          </TouchableHighlight>
          <Text style={{fontSize: 18, fontWeight: '100', fontFamily: 'AvenirNext-UltraLight'}}>{props.title}</Text>
        </View>
        <View style={style.textGroup}>
          <View style={{marginRight: 10}}>
            <Text style={{fontSize: 14, fontWeight: '100', color: 'rgba(0,0,0,0.5)'}}>{subRowData.text}</Text>
          </View>
          <View style={{marginRight: 10}}>
            {subRowData.buttonText !== '' ? <TouchableHighlight style={style.moreButton}>
              <Text style={style.moreButtonText}>
                {subRowData.buttonText}
              </Text>
            </TouchableHighlight> : <View></View>}
          </View>
        </View>
        <View style={style.imageGroup}>
          {subRowData.images ? subRowData.images.map((location) => {
            let avatarImage = location != '../Images/blank-profile-pic.png'
              ? {uri: location}
              : require('../Images/blank-profile-pic.png')
            return <View style={style.avatar}><Image style={style.avatar}
                                                     source={avatarImage}/></View>
          }) : <View></View>}
        </View>
        <View style={{marginTop: 5}}>
        </View>
      </View>
    )
  }

  getSubRowData (item) {

    let subRowData = {text: '', buttonText: '', images: []}
    let names = []
    let images = []

    if (item.mychildren) {

      item.mychildren.forEach((child) => {
        names.push(child.fName)
        let childImage = child.profileImage
        images.push(childImage)
      })

    }

    if (item.students) {

      Object.keys(item.students).map((studentKey) => {
        let student = item.students[studentKey]
        names.push(student.fName)
        let studentImage = student.profileImage
        images.push(studentImage)
      })
    }

    if (names.length > 3) {
      subRowData.buttonText = '+' + (names.length - 3).toString()
      names = names.slice(0, 3)
    }

    subRowData.text = names.join(', ')

    if (images.length > 5)
      images = images.slice(0, 5)

    subRowData.images = images

    return subRowData

  }

}
