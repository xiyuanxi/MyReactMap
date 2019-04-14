import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,} from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { ViewPagerAndroid } from 'react-native-gesture-handler';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  doExit = () => {

  }
  
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View >
      <Text>Logging servie settings:</Text>
      {/* <TouchableOpacity
        style={styles.submitButton}
        onPress={
          () => {
            () => this.doExit()}
        }>
        <Text style={styles.submitButtonText}> Stop service & Exit </Text>
      </TouchableOpacity> */}
    </View >;
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
  

});