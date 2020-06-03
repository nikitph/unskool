import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';

import styles from './style';
import ReviewHeader from '../../../Components/ReviewHeader';
import ReviewBottomButton from '../../../Components/ReviewBottomButton';

export default class ReviewOne extends React.Component {
  render() {
    const { onPress } = this.props;
    return (
      <View style={styles.container}>
        <ReviewHeader />
        <Text style={styles.tilte}>Please Leave a Review</Text>
        <Text style={styles.reviewNote}>Thank you for taking the time to leave us a review. We appreciate the feedback and look forward to receiving honest & true feedback so that we can continually improve our experiences for our community</Text>
        <Text style={styles.reviewTitle}>How was your experience with Teacher?</Text>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} placeholder="Write here..." />
        </View>
        <ReviewBottomButton onPress={onPress} title="Next" />
      </View>
    )
  }
}