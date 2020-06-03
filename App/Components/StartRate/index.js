import React from 'react';
import { View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';

import styles from './style';

class StarRate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 4
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          starSize={20}
          containerStyle={styles.containerStyle}
          rating={this.state.starCount}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
          fullStarColor="#7B5A78"
        />
      </View>
    );
  }
}

export default StarRate;
