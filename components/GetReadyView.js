import React, { Component } from "react";
import {  Linking, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity , Text} from "react-native";
import ProgressBar from 'react-native-progress/Bar'
import { Button } from 'react-native-paper';

export default class GetReadyView extends React.Component {

    render() {
        return(
        <View style={{
            flex: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            // backgroundColor:'red'
          }}>
            <Text style = {{ fontWeight: 'bold', fontSize: 26, textAlign: 'center' }}>Get Ready</Text>
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
            <Text style = {{ fontWeight: 'bold', fontSize: 18, textAlign: 'left' }}> Charging Time</Text>
            <Text style = {{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>20min/50min</Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Button icon="battery-charging-full" mode="contained" style={styles.button} onPress={ this.props.handle}>START</Button>
            </View>
            <Text >   </Text>

            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, }} />
            <Text style = {{ fontWeight: 'bold', fontSize: 22, textAlign: 'left', color:'#8855aa' }}>Promotions</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Image style={styles.stretch} source={require('../assets/images/ad.jpg')} />
                <Button icon="restaurant" mode="contained" style={styles.button} onPress={() => { console.log('GO button pressed'); }}>GO</Button>
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