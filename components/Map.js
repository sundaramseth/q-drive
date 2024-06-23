import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import MapView, {Marker} from 'react-native-maps'; 
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAP_APIKEY } from "@env";

const Map = () => {

const origin = useSelector(selectOrigin);
const destination = useSelector(selectDestination)
const mapRef = useRef(null);
const dispatch = useDispatch();

useEffect(()=>{
if(!origin || !destination) return;

// Zoom and fit to marker
  mapRef.current.fitToSuppliedMarkers(["origin", "destination"],{
  edgePadding: {top:50, right:50, bottom:50, left:50 },
  animated:true
});

}, [origin,destination]);



// Get Travel time and distance data between two points using google distance api
useEffect(()=>{

  if(!origin || !destination) return;
  
  const getTravelTime = async() => {
    try{
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${GOOGLE_MAP_APIKEY}`);
    const data = await response.json();
    dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
    } catch(error){
      console.log(error);
    }
  }

  getTravelTime();

},[origin,destination, GOOGLE_MAP_APIKEY]);

    return(
    <MapView
    ref={mapRef}
       style={tw`flex-1`}
       mapType="mutedStandard"
       initialRegion={{
         latitude: origin.location.lat,
         longitude: origin.location.lng,
         latitudeDelta: 0.005,
         longitudeDelta: 0.005,
       }}
     >

      {origin && destination && (
        <MapViewDirections
           origin={origin.description}
           destination={destination.description}
           apikey={GOOGLE_MAP_APIKEY}
           strokeColor="black"
           strokeWidth={3}
        />
      )}



      {origin?.location && (
        <Marker 
        coordinate={{
          latitude:origin.location.lat,
          longitude:origin.location.lng
        }}
        title="Origin"
        description={origin.description}
        identifier="origin"
        />
      )
      }

      {destination?.location && (
        <Marker 
        coordinate={{
          latitude:destination.location.lat,
          longitude:destination.location.lng
        }}
        title="Destination"
        description={destination.description}
        identifier="destination"
        />
      )}

  
      </MapView>
    )
}

export default Map
