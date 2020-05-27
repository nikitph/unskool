import './App/Config/ReactotronConfig'
import { YellowBox, AppRegistry } from 'react-native'
import App from './App/Containers/App'
YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified']);

AppRegistry.registerComponent('unskool', () => App)
