import React from 'react';
import { Platform, StatusBar, StyleSheet, View,AsyncStorage, Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Location, TaskManager, Notifications, Permissions } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {LOCATION_TRACKER, PEAKPOWER_API_URL, PEAKPOWER_MOBILE_ID}  from './constants/Main'; 

var deviceId = "";

const localNotification = {
  title: 'PeakPower Logging Servie',
  body: 'Service is running.', // (string) — body text of the notification.
  // body: 'Tap for service options.', // (string) — body text of the notification.
  ios: { // (optional) (object) — notification configuration specific to iOS.
    sound: true // (optional) (boolean) — if true, play a sound. Default: false.
  },
  android: // (optional) (object) — notification configuration specific to Android.
  {
    sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
    //icon (optional) (string) — URL of icon to display in notification drawer.
    //color (optional) (string) — color of the notification icon in notification drawer.
    priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
    sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
    vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
    // link (optional) (string) — external link to open when notification is selected.
  }
};

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    deviceId: "",
    notification: {},
  };

  constructor(props) {
    super(props)
   
    // this._handleNotification = this._handleNotification.bind(this)
  }

  // _handleNotification = (notification) => {
  //   console.log(notification)
  //   this.setState({notification: notification});
  // };
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      console.log(notification.origin);
      if (notification.origin == "selected") {
        console.log("cccc");
        // Alert.alert("cccc")
        //  alert("aaaaaaaaaaa");
      }
      // alert("bbbbbbbbbb");
      console.log(notification);
    });
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

  async componentDidMount() {
    const { status }= await Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log(status)
    if (status !== 'granted') {
      return;
    }
    let t = new Date();
    t.setSeconds(t.getSeconds() + 2);
    const schedulingOptions = {
      time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
      // repeat: 'minute'
    };



    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    this.listenForNotifications();
    // if (Constants.lisDevice && resut.status === 'granted') {
    //   console.log('Notification permissions granted.')
    // }
    // this.notificationSubscription = Notifications.addListener(
    //   (notification) => this._handleNotification(notification),
    // );
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
      timeInterval: 20000,
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
