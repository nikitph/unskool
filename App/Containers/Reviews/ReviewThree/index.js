import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import styles from './style';
import ReviewHeader from '../../../Components/ReviewHeader';
import ReviewBottomButton from '../../../Components/ReviewBottomButton';
import StarRate from '../../../Components/StartRate';

export default class ReviewOne extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.container}>
        <ReviewHeader />
        <StarRate title="Accuracy" />
        <StarRate title="Quality" />
        <StarRate title="Professionalism" />
        <StarRate title="Host Knowledge" />
        <StarRate title="Communication" />
        <StarRate title="Creativity" />
        <StarRate title="Engaging" />
        <StarRate title="Value" />
        <StarRate title="Overall Experience" />
        <ReviewBottomButton onPress={onPress} title="Next" />
      </View>
    )
  }
}