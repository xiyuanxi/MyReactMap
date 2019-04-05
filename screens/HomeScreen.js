import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import { WebBrowser } from 'expo';
import LocationA from '../components/LocationA'

import { MonoText } from '../components/StyledText';


const GOOGLE_MAPS_APIKEY = 'AIzaSyDq2gbbHtbzWzs3FFLp94bHyJYb4rloisU'
// var DeviceInfo = require('react-native-device-info');

const PEAKPOWER_MOBILE_ID =  "PEAK_POWER_MOBILE_DEVICE_ID";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    // AsyncStorage.getItem('DeviceId').then((value) => {
    //   console.log(value)
    //   this.setState({ deviceId: value })
    //   // if (this.state.deviceId != value) {
    //   //   console.log("1 this.state.deviceId =" +this.state.deviceId)
    //   //   this.setState({ deviceId: value })
    //   // } else {
    //   //   console.log("2 this.state.deviceId =" +this.state.deviceId)
    //   // }
    // })
  }
  // deviceId = "";
  state = {
    deviceId: "",
    inputDeviceId: null
  };

  static navigationOptions = {
    header: null,
  };

  handleDeviceId = (text) => {
    this.setState({ inputDeviceId: text })
  }

  setDeviceId = (text) => {
    AsyncStorage.setItem(PEAKPOWER_MOBILE_ID, text);
    // this.deviceId = text;
    this.setState({ deviceId: text })
  }

  componentDidMount = () => {
    AsyncStorage.getItem(PEAKPOWER_MOBILE_ID).then((value) => {
      console.log(value)
      if(value) this.setState({ deviceId: value })
    })
  }

  render() {
    // DeviceInfo = require('react-native-device-info');
    // const deviceId = DeviceInfo.getUniqueID()
   
    return (
      <View style={styles.container}>
        {this.state.deviceId !="" && <View>
          <LocationA />
          <Text style={{fontSize: 20, position: "absolute", top: 30, right:20, color: "red"}}>
            Device ID: {this.state.deviceId}
          </Text>
        </View>
        }
        {this.state.deviceId == "" && <View style={{ position: "absolute", top: 40}}>
          <Text> 
            No Device ID, please input Device ID:</Text>
          <TextInput style={styles.input}
            // underlineColorAndroid="transparent"
            placeholder="Device ID"
            // placeholderTextColor="#9a73ef"s
            autoCapitalize="none" 
            onChangeText = {this.handleDeviceId}/>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              () => this.setDeviceId(this.state.inputDeviceId)
            }>
            <Text style={styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
        </View>}
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
