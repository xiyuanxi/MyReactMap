import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity } from "react-native";
import { Container, Text } from "react-native";

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

class LocationA extends Component {
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
    };

    this.mergeLot = this.mergeLot.bind(this);

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
         this.getDirections(concatLot, this.state.cordLatitude+","+this.state.cordLongitude);
       });
     }

   }

   async getDirections(startLoc, destinationLoc) {

    console.log(startLoc);
    console.log(destinationLoc);
         try {
              var proxy_url = 'https://cors-anywhere.herokuapp.com/';
              var target_url = `https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`;
              var google_api_key = '&key=AIzaSyDq2gbbHtbzWzs3FFLp94bHyJYb4rloisU'
             let resp = await fetch(`${target_url}${google_api_key}`)
            //  console.log(resp)
             let respJson = await resp.json();
             let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
             let coords = points.map((point, index) => {
                 return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
             })
             this.setState({coords: coords})
             this.setState({x: "true"})
             return coords
         } catch(error) {
          console.log("google directions api error.")
           console.log(error)
             this.setState({x: "error"})
             return error
         }
     }
  render() {

    return (
      <View>
      <MapView style={styles.map} customMapStyle={mapStyle} showsUserLocation={true}  initialRegion={{
       latitude:this.state.latitude,
       longitude:this.state.longitude,
       latitudeDelta: 1,
       longitudeDelta: 1
      }}>

      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}

       {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
          title={"Your Destination"}
        />}

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

export default LocationA;