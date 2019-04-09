import React from 'react';
import { Platform, StatusBar, StyleSheet, View,AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Location, TaskManager } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {LOCATION_TRACKER, PEAKPOWER_API_URL, PEAKPOWER_MOBILE_ID}  from './constants/Main'; 

var deviceId = "";
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    deviceId: "",
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  componentDidMount() {
    //this.watchCurLocation();
    this.onLoad();  
   }

  //init task manager
  onLoad = async() => {
    let isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TRACKER)
    console.log("Task Is Registered = " +isRegistered);
    if (!isRegistered) await Location.startLocationUpdatesAsync(LOCATION_TRACKER, {
      accuracy: Location.Accuracy.High,
      /* after edit */
      timeInterval: 2500,
      distanceInterval: 5,
    })
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

TaskManager.defineTask(LOCATION_TRACKER, ({ data, error }) => {
  console.log('location update')
  if (error) {
    console.log(error)
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("Location data is:");
    console.log(data);
    if (deviceId == "")
      AsyncStorage.getItem(PEAKPOWER_MOBILE_ID).then((value) => {
        console.log(value)
        if (value) deviceId = value
      })
      console.log("deviceId is:" + deviceId);
    if (deviceId != "") {
      fetch(PEAKPOWER_API_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: data.locations[0].coords.latitude,
          lng: data.locations[0].coords.longitude,
          uid: deviceId,
          phonetime: data.locations[0].timestamp,
        }),
      })
      .catch((error) => {
        console.error(error);
      });
    }
   
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
