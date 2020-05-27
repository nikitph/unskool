import React from 'react';
import { View, Text, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

import styles from './style';
import ReviewHeader from '../../../Components/ReviewHeader';
import ReviewBottomButton from '../../../Components/ReviewBottomButton';
import StarRate from '../../../Components/StartRate';
import { Images } from '../../../Themes';

export default class ReviewFour extends React.Component {
  fullStar = (data) => {
    console.log("this sis data", data);
    return (
      <Image style={{ height: 20, width: 30, resizeMode: 'contain' }} source={Images.family} />
    )
  }
  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.container}>
        <ReviewHeader />
        <Text style={styles.title}>Levels of Engagement - Please rate the level of each category based on the level of engagement you experienced.</Text>
        <StarRate title="Physical Exertion" />
        <StarRate title="Mental Exertion" />
        <StarRate title="Emotional Exertion" />
        <StarRate title="Spiritual Integration" />
        <StarRate title="Social Integration" />
        <StarRate title="Technical Integration" />
        <ReviewBottomButton onPress={onPress} title="Submit" />
      </View>
    )
  }
}