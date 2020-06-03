import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import ReviewOne from './ReviewOne';
import ReviewTwo from './ReviewTwo';
import ReviewThree from './ReviewThree';
import ReviewFour from './ReviewFour';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 }
  }
  render() {
    const { index } = this.state;
    return (
      <Swiper
        showsPagination={false}
        showsButtons={false}
        loop={false}
        scrollEnabled={false}
        index={index}
      >
        <ReviewOne onPress={() => this.setState({ index: 1 })} />
        <ReviewTwo onPress={() => this.setState({ index: 2 })} />
        <ReviewThree onPress={() => this.setState({ index: 3 })} />
        <ReviewFour onPress={() => console.log("completed")} />
      </Swiper >
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})