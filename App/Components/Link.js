import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'

import style from '../Themes/GlobalStyles'

const Link = ({ text, onClick, extraStyle, textStyles, iconTop, customElement, hasGradient }) => (
  <TouchableOpacity style={[style.Link, extraStyle || {}]} onPress={onClick}>
    <View>
      {
        customElement &&
        customElement
      }
      {
        iconTop &&
        <Image
          source={iconTop.url}
          resizeMode='contain'
          style={iconTop.dimensions} />
      }
      <Text style={[style.LinkText, textStyles || {}]}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
)

Link.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  extraStyle: PropTypes.object
}

export default Link
