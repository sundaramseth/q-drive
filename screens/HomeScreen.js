import React from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar,Image, View } from "react-native";
import tw from 'twrnc';
import NavOption from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_MAP_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";
import NavFavorites from "../components/NavFavourites";

const HomeScreen = () => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full p-5`}>
            <View style={tw`pt-10 pb-5 pl-2`}>
             <Text style={[tw`font-bold`, {fontSize:32}]}>Q-Drive</Text>
            </View>

            <GooglePlacesAutocomplete 
            placeholder="Where From?"
            styles={{
                container:{
                    flex:0
                },
                textInput:{
                    fontSize:18
                }
            }}

            fetchDetails={true}
            
            onPress={(data, details = null)=>{
                dispatch(setOrigin({
                    location:details.geometry.location,
                    description:data.description
                }))  
              dispatch(setDestination(null));
            }}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
                key:GOOGLE_MAP_APIKEY,
                language:'en'
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            />
            <NavOption />
            <NavFavorites/>
        </SafeAreaView>
    )
} 

export default HomeScreen

