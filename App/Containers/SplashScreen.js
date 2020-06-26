import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import ChatActions from '../Redux/ChatRedux'

class SplashScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        let user = await AsyncStorage.getItem('user');
        let userData = JSON.parse(user)
        if (userData) {
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DashboardScreen' }, { guardian: userData })], 0)
          this.props.postChat({uid: userData.uid})
        } else {
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'LaunchScreen' })], 0)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    user: state.login,
});

const mapDispatchToProps = (dispatch) => {
  return {
    postChat: (data) =>
      dispatch(ChatActions.chatRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
