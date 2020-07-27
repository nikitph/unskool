import React, { Component } from 'react'
import {
  View,
  ListView,
  Text,
  Touchable,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay'

// Styles
import styles from './Styles/SearchScreenStyle'
import { ListItem, SearchBar } from 'react-native-elements'
import SingleGuardianActions from '../Redux/SingleGuardianRedux'
import Icon from 'react-native-vector-icons/Ionicons'

class SearchScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      data: this.props.guardians,
      error: null,
    }

    this.arrayholder = this.props.guardians
  }

  componentDidMount () {
  }

  isDataURL (s) {
    this.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i
    return !!s.match(this.isDataURL.regex)
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    )
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    })

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.displayName.toUpperCase()}`
      const textData = text.toUpperCase()

      return itemData.indexOf(textData) > -1
    })
    this.setState({
      data: newData,
    })
  }

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here to search..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    )
  }

  render () {
    if (this.props.guardians === []) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => {

            return (
              <TouchableOpacity style={styles.row}
                                onPress={() => this.props.getGuardian(item.uid, this.props.navigation)}>
                <View style={{flex: 0.2, alignItems: 'flex-start'}}>
                  <Image source={require('../Images/blank-profile-pic.png')}
                         style={{borderRadius: 20, height: 40, width: 40, alignItems: 'center'}} resizeMode={'cover'}/>
                </View>
                <View style={{flex: 0.7, alignItems: 'flex-start'}}>
                  <Text style={styles.label}>{item.displayName}</Text>
                </View>
                <View style={{flex: 0.1, alignItems: 'center'}}>
                  <Icon name="ios-arrow-forward" size={32} color="rgba(116,100,78,1)"
                  />
                </View>
              </TouchableOpacity>
            )
          }}
          ListHeaderComponent={this.renderHeader}
        />
        <OrientationLoadingOverlay
          visible={this.props.fetching}
          color='white'
          indicatorSize='large'
          messageFontSize={24}
          message='Loading Guardian'
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let guardians = state.guardians.payload ? Object.values(state.guardians.payload) : []
  guardians = guardians.filter(guardian => (guardian.displayName)).filter(guardian => guardian.uid)

  return {
    guardians: guardians,
    fetching: state.singleguardian.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGuardian: (gid, nav) => dispatch(SingleGuardianActions.singleGuardianRequest(gid, nav))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
