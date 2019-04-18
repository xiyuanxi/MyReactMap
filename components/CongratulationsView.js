import React, { Component } from "react";
import {  Linking, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity , Text} from "react-native";
import ProgressBar from 'react-native-progress/Bar'
import { Button } from 'react-native-paper';

export default class CongratulationsView extends React.Component {

    render() {
        return(
        <View style={{
            flex: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            // backgroundColor:'red'
          }}>
            <Text style = {{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>Congratulations</Text>
            <Text style = {{ fontWeight: 'bold', fontSize: 18, textAlign: 'left' }}>Battery Status</Text>
            <ProgressBar
             style={{ marginLeft: 'auto', marginRight: 'auto' }}
             height={30}
             width={300}
             progress={0.8}
             borderRadius={4}
             color={this.props.color}
             unfilledColor={this.props.unfilledColor || 'transparent'}
           ></ProgressBar>
           <Text >   </Text>
            <Text style = {{ fontWeight: 'bold', fontSize: 18, textAlign: 'left' }}> Available Distance</Text>
            <Text style = {{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>85km/70min</Text>
            <Text >   </Text>
            <Text style = {{ fontWeight: 'bold', fontSize: 18, textAlign: 'left' }}> You Earn</Text>
            <Text style = {{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>$300</Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Button icon="done-all" mode="contained" style={styles.button} onPress={ this.props.handle}>RETURN</Button>
            </View>

        </View>
        )
    }
}

const styles = StyleSheet.create({
    stretch: {
      width: 240,
      height: 280,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
         width: 220, 
        // height: 30, 
        margin: 5
      }
  });