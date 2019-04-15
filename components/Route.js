import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity , AsyncStorage} from "react-native";
import { Container, Text } from "react-native";
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import { Button } from 'react-native-paper';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import {PEAKPOWER_API_LOAD_URL, PEAKPOWER_MOBILE_ID} from '../constants/Main'

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

const user_status = {
  START: 'start',
  ORDER_PRESSED: 'order_pressed',
  ORDER_SELECTED: 'order_selected',
  ORDER_CONFIRMED: 'order_confirmed'
}

class Route extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      latitude: 43.647757,
      longitude: -79.38689,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      cordLatitude: 43.591553, 
      cordLongitude:-79.641700,
      // showPopup: false,
      selectedOrder: null,
      status: user_status.START,
      distance: "",
      duration: ""
    };

    this.mergeLot = this.mergeLot.bind(this);

    this.onMarkerPress = this.onMarkerPress.bind(this)
    this.onOrderSelected = this.onOrderSelected.bind(this)
  }

  async loadUsersRoute() {
    let start = new Date().setHours(0, 0, 0, 0);
    let end = new Date().setHours(23, 59, 59, 0);

    console.log(`start= ${start}, end=${end}`)

    let deviceId = "";
    deviceId = await AsyncStorage.getItem(PEAKPOWER_MOBILE_ID);
    console.log(deviceId)

    let apiUrl = PEAKPOWER_API_LOAD_URL + "/" + deviceId + "/" + start + "/" + end;
    console.log(apiUrl)

    if (deviceId != "") {
      try {
        let data = await fetch(apiUrl, {
          method: 'GET',
        })
        let respJson = await data.json();
        console.log("--------------------")
        // console.log(respJson);
        let coords = respJson.map((point, index) => {
          return  {
              latitude : point.lat,
              longitude : point.lng
          }
      })
      console.log(coords);
      this.setState({coords: coords})
      this.setState({x: "true"})
      } catch (error) {
        console.log("vehicletrackingservice/logging/user_logs/ api error.")
        console.log(error)
        this.setState({ x: "error" })
        return error
      }
    }
  }

  componentDidMount() {
    
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log(position)
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );

   }

  mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.loadUsersRoute();
          // this.getDirections(concatLot, this.state.cordLatitude+","+this.state.cordLongitude);
       });
     }

   }

  async getDirections(startLoc, destinationLoc) {

    console.log(startLoc);
    console.log(destinationLoc);
    try {
      // var proxy_url = 'https://cors-anywhere.herokuapp.com/';
      var target_url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`;
      var google_api_key = '&key=AIzaSyDq2gbbHtbzWzs3FFLp94bHyJYb4rloisU'
      let resp = await fetch(`${target_url}${google_api_key}`)
      //  console.log(resp)
      let respJson = await resp.json();
      // console.log(respJson)
      this.setState({distance: respJson.routes[0].legs[0].distance.text, duration: respJson.routes[0].legs[0].duration.text})
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      // console.log(coords);
      this.setState({ coords: coords })
      this.setState({ x: "true" })
      return coords
    } catch (error) {
      console.log("google directions api error.")
      console.log(error)
      this.setState({ x: "error" })
      return error
    }
  }

  onMarkerPress(e) {
    // console.log(e)
    // console.log(this.popupDialog)
    let num = e.nativeEvent.id
    console.log(num)
    let currentPoint = this.props.points.filter((p) => p.id == num)[0];
    console.log(currentPoint)
    this.setState({  status: user_status.ORDER_PRESSED, selectedOrder: currentPoint })
    // this.popupDialog.show();
  }

  mapPressed(e) {
    console.log("Map pressed.")
    this.setState({selectedOrder: null, coords: [], status: user_status.START})
  }

  onOrderSelected(e) {
    console.log("Order Selected.")
    this.setState({status: user_status.ORDER_SELECTED})

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("usre position="+position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        if (this.state.latitude != null && this.state.longitude!=null)
        {
          let concatLot = this.state.latitude +","+this.state.longitude
          this.setState({
            concat: concatLot
          }, () => {
            // this.loadUsersRoute();
              this.getDirections(concatLot, this.state.selectedOrder.lat + "," + this.state.selectedOrder.lng);
          });
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  OrderComfirmView = () => {
    if (this.state.status == user_status.ORDER_SELECTED) {
      console.log("kkkkk")
      return <View style={{height: '30%'}}>
        <Text> adfasjflksafj</Text>
      </View>
    }
  }

  render() {
    return (
      <View  style={{
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
        // alignItems: 'stretch',
      }}>
      <MapView style={styles.map} customMapStyle={mapStyle} showsUserLocation={true}  initialRegion={{
       latitude:this.state.latitude,
       longitude:this.state.longitude,
       latitudeDelta: 0.03,
       longitudeDelta: 0.03
      }} onPress={this.mapPressed.bind(this)} >

      {/* {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />} */}

       {/* {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
          title={"Your Destination"}
        />} */}

        {!!this.props.points && this.props.points.map((p)=>{
          let selectedMarkerStyle = this.state.selectedOrder && this.state.selectedOrder.id == p.id ? styles.markerSelected : {}
          return <View  key={p.id}> 
           
          <MapView.Marker key={p.id} identifier={`${p.id}`}  coordinate={{"latitude":p.lat,"longitude":p.lng}}  onPress={this.onMarkerPress} >
              <View style={{ ...styles.marker, ...selectedMarkerStyle }}>
                <Text style={{ fontWeight: 'bold' }}>${p.earn}</Text><Text >{p.period}</Text>
              </View>
          </MapView.Marker></View>
        })
        }

       {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.latitude, longitude: this.state.longitude},
              {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }
      </MapView>

      {this.OrderComfirmView()}
      <PopupDialog style={{height:0}} visible={this.state.status == user_status.ORDER_PRESSED }  dialogAnimation={slideAnimation}>
              {this.state.selectedOrder && <View style={styles.order}>
                <Text style={{...styles.orderText,...{fontWeight: 'bold'}}}>Do you accept the order?</Text>
                <Text style={styles.orderText}>{this.state.selectedOrder.name} (${this.state.selectedOrder.earn}, {this.state.selectedOrder.period})</Text>
                <Text> </Text>
                {/* <Text>Hello Hello Hello Hello Hello</Text> */}
                <View style={styles.buttonContainer} >
                <Button icon="directions-car" mode="contained" style={styles.button} onPress={this.onOrderSelected}>
                  Yes
                </Button>
                <Button icon="clear" mode="contained" style={styles.button} onPress={() => {console.log('No button pressed'); this.setState({status: user_status.START})}}>
                  No
                </Button>
                </View>
              </View>
              }
            </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    // position: 'absolute',
    // top: 10,
    // left: 10,
    // right: 200,
    // bottom: 400,
    width: '100%', 
    height: '100%'
  },
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
    // width: 60, 
    // height: 30, 
    margin: 5
  }
});

const mapStyle = [ {
  "stylers": [
    {
      "saturation": -35
    },
    {
      "lightness": -30
    },
    {
      "weight": 1
    }
  ]
},
{
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#242f3e"
    }
  ]
},
{
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#746855"
    }
  ]
},
{
  "elementType": "labels.text.stroke",
  "stylers": [
    {
      "color": "#242f3e"
    }
  ]
},
{
  "featureType": "administrative.locality",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#d59563"
    }
  ]
},
{
  "featureType": "landscape",
  "stylers": [
    {
      "saturation": -85
    },
    {
      "lightness": 40
    },
    {
      "weight": 2.5
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#d59563"
    }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#263c3f"
    }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#6b9a76"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#886655"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#212a37"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#9ca5b3"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#746855"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#1f2835"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#f3d19c"
    }
  ]
},
{
  "featureType": "transit",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#2f3948"
    }
  ]
},
{
  "featureType": "transit.station",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#d59563"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [
    {
      "color": "#17263c"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#515c6d"
    }
  ]
},
{
  "featureType": "water",
  "elementType": "labels.text.stroke",
  "stylers": [
    {
      "color": "#17263c"
    }
  ]
}
]

export default Route;