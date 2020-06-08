import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ReviewsScreenStyle'
import ReviewHeader from '../Components/ReviewHeader';
import ReviewBottomButton from '../Components/ReviewBottomButton';
import StarRate from '../Components/StartRate';
import { Images } from '../Themes';

class ReviewsScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsScreen)

class ReviewOne extends React.Component {
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

class ReviewTwo extends React.Component {
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

class ReviewThree extends React.Component {
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

class ReviewFour extends React.Component {
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