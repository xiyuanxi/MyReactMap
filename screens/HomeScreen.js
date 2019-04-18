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
import Route from '../components/Route'

import {PEAKPOWER_MOBILE_ID} from '../constants/Main'

const GOOGLE_MAPS_APIKEY = 'AIzaSyDq2gbbHtbzWzs3FFLp94bHyJYb4rloisU'
// var DeviceInfo = require('react-native-device-info');

// const points = [
//   {
//     id: 1,
//     name: "181 University Ave",
//     earn: 150,
//     period: "1-3pm",
//     lat: 43.6492404,
//     lng: -79.3875532,
//   },
//   {
//     id: 2,
//     name: "30 Adelaide St",
//     earn: 300,
//     period: "4-5pm",
//     lat: 43.6509524,
//     lng: -79.3790198,
//   },
//   {
//     id: 3,
//     name: "65 Queen",
//     earn: 350,
//     period: "5-8pm",
//     lat: 43.6515567,
//     lng: -79.384461,
//   }
// ];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceId: "",
      inputDeviceId: null,
      points: []
    };
  }

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
          <Route/>
          <Text style={{fontSize: 16, position: "absolute", top: 26, right:10, color: "red"}}>
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
