import React, { Component } from "react";
import {  Linking, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity , Text} from "react-native";
import Moment from 'moment';

import Echarts from "native-echarts";
import ProgressBar from 'react-native-progress/Bar'
import EchartsShow from './EchartShow'
import { Button } from 'react-native-paper';
// import { ProgressBar, Colors } from 'react-native-paper';

const  batteryData= [30,30.83,32.5,35,37.5,40,42.5,45,47.5,50,52.5,55,57.5,60,60,60,59.17,57.5,55,52.5,50,47.5,45,42.5,40,37.5,35,32.5,30,27.5,25,22.5,20,17.5,15,12.5,10,10.83,12.5,15,17.5,20,22.5,25,27.5,30,32.5,35]
const InverterData= [10,20,30,30,30,30,30,30,30,30,30,30,30,30,0,-10,-20,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,10,20,30,30,30,30,30,30,30,30,30,30]

export default class SimulateProcess extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      xAxisData: [],
      batteryData: [],
      InverterData: [],
      progress: 0
    };


    let start  = this.props.startTime
    start.setMinutes(Math.ceil(start.getMinutes()  / 5) * 5)

    Moment.locale('en');
    // timeString = Moment(start).format('YYYY/MM/DD HH:mm');

    timeStrings = [];
    for (let m = 0; m <= this.props.duration; m += 5) {
      // timeString += Moment(start).format('YYYY/MM/DD HH:mm') + ", ";
      timeStrings.push(Moment(start).format('HH:mm') )
      start.setMinutes(Math.ceil(start.getMinutes() / 5 + 1) * 5)
    }

    // this.setState({ xAxisData: timeStrings })
    this.state.xAxisData = timeStrings
    this.state.batteryData = batteryData
    this.state.InverterData = InverterData
    console.log(timeStrings)

  }

  // convertDatetime(date) {
  //   date = String(date).split(' ');
  //   var days = String(date[0]).split('-');
  //   var hours = String(date[1]).split(':');
  // }

  componentDidMount() {
    console.log(this.props.startTime)
    console.log(this.props.duration)

    // let start  = this.props.startTime
    // start.setMinutes(Math.ceil(start.getMinutes()  / 5) * 5)
    // // console.log(start)
    // // console.log(start.toLocaleString())
    // // console.log(start.toString())

    // let timeString = ""

    // Moment.locale('en');
    // // timeString = Moment(start).format('YYYY/MM/DD HH:mm');

    // timeStrings = [];
    // for (let m = 0; m <= this.props.duration; m += 5) {
    //   // timeString += Moment(start).format('YYYY/MM/DD HH:mm') + ", ";
    //   timeStrings.push(Moment(start).format('HH:mm') )
    //   start.setMinutes(Math.ceil(start.getMinutes() / 5 + 1) * 5)
    // }

    // this.setState({ xAxisData: timeStrings })
    // console.log(timeStrings)

    setTimeout(
      () => {
        let timerId = setInterval(() => this.setState({ progress: this.state.progress == 100 ? 100 : this.state.progress + 5 }), 50);
        setTimeout(() => { clearInterval(timerId); this.setState({ progress: 100 }) }, 2000);
      }, 500);
  }

  render() {
       return (
         <View>
           {/* {this.state.progress==0 && <Echarts option={option} height={350} />} */}
           <EchartsShow xAxisData={this.state.xAxisData} BatteryData={this.state.batteryData} InverterData={this.state.InverterData} />

           <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{this.state.progress}%</Text>
           <ProgressBar
             style={{ marginLeft: 'auto', marginRight: 'auto' }}
             height={30}
             width={300}
             progress={this.state.progress / 100}
             borderRadius={4}
             color={this.props.color}
             unfilledColor={this.props.unfilledColor || 'transparent'}
           >
             {this.props.children}
           </ProgressBar>
           <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text >   </Text>
              <Button icon="done" mode="contained" style={styles.button} onPress={ this.props.handle}>IS DONE</Button>
            </View>
           {/* <ProgressBar style={{height:60,width:350}} progress={0.5} color={Colors.red800} /> */}
         </View>
      );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
  },
  marker: {
    backgroundColor: "rgba(250, 210, 150, 0.7)",
    paddingHorizontal: 4,
    paddingVertical: 0,
    borderRadius: 5,
    margin: 0
  },
  markerSelected: {
    backgroundColor: "rgba(255, 110, 150, 0.9)"
  },
  order: {
    // width: 400,
    // fontSize: 28,
    backgroundColor: "rgba(190, 255, 210, 0.5)",

    padding: 10
  },
  orderText: {
    fontSize: 18
  },
  buttonContainer: {
    // backgroundColor: "rgba(0, 190, 210, 0.7)",
    // alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    // margin: 5
    // height: 60
  },
  button: {
     width: 220, 
    // height: 30, 
    margin: 5
  }
});

