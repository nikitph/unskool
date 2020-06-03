import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './style';
import ReviewHeader from '../../../Components/ReviewHeader';
import ReviewBottomButton from '../../../Components/ReviewBottomButton';

export default class ReviewOne extends React.Component {
  constructor() {
    super();
    this.state = {
      optionsOne: [
        "Much better than I expected",
        "A bit better than I expected",
        "About the same as I expected",
        "A bit worse than I expected",
        "Much worse than I expected",
      ],
      optionOneActiveIndex: "",
      optionsTwo: [
        "Yes, I typically have high expectations",
        "I feel that I have average expectations",
        "I usually don't have many expectations",
      ],
      optionTwoActiveIndex: "",
    }
  }

  list = (title, index, type, activeIndex) => {
    const selected = index === activeIndex ? true : false;

    return (
      <TouchableOpacity onPress={() => this.setState({ [type]: index })} style={styles.listContainer}>
        <Text style={styles.listTitle}>{title}</Text>
        <Icon size={30} color="#7B5A78" name={selected ? "radio-button-checked" : "radio-button-unchecked"} />
      </TouchableOpacity>
    )
  }

  render() {
    const { optionsOne, optionsTwo, optionOneActiveIndex, optionTwoActiveIndex } = this.state;
    const { onPress } = this.props;

    return (
      <View style={styles.container}>
        <ReviewHeader />
        <View style={styles.radioButtonContainer}>
          <Text style={styles.title}>Was it everything you expected?</Text>
          <View style={styles.br}>
            {optionsOne.map((d, i) => <View key={i.toString()}>{this.list(d, i, "optionOneActiveIndex", optionOneActiveIndex)}</View>)}
          </View>
        </View>
        <View style={styles.radioButtonContainer}>
          <Text style={styles.title}>Would you say you typically have high expectations?</Text>
          <View style={styles.br}>
            {optionsTwo.map((d, i) => <View key={i.toString()}>{this.list(d, i, "optionTwoActiveIndex", optionTwoActiveIndex)}</View>)}
          </View>
        </View>
        <ReviewBottomButton onPress={onPress} title="Next" />
      </View>
    )
  }
}