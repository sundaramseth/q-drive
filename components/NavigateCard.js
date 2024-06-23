import React from "react";
import { StyleSheet, Text, Touchable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavourites";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/base";

const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    return(
        <SafeAreaView style={tw`bg-white flex-1`}>
        <Text style={tw`text-center py-3 text-xl font-500`}>
        Good Morning, Sundaram
        </Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
            <View>
                <GooglePlacesAutocomplete 
                styles={toInputBoxStyle}
                placeholder="where to?"
                fetchDetails={true}

                onPress={(data, details=null)=> {
                    dispatch(
                        setDestination({
                        location:details.geometry.location,
                        description:data.description
                    })
                );

                navigation.navigate('RideOptionCard');
                }}


                enablePoweredByContainer={false}
                query={{
                    key:GOOGLE_MAP_APIKEY,
                    language:'en'
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                />
            </View>

            <NavFavorites/>
        </View>

        <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate("RideOptionCard")}
            style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                <Icon name="car" type="font-awesome" color="white" size={16}/>
                <Text style={tw`text-white text-center`}>Auto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full`}>
                <Icon name="motorcycle" type="font-awesome" color="black" size={16}/>
                <Text style={tw`text-black text-center`}>Bike</Text>
            </TouchableOpacity>

        </View>
        </SafeAreaView>  
    )
}

export default NavigateCard


const toInputBoxStyle = StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingTop:20,
        flex:0
    },
    textInput:{
        backgroundColor:"#DDDDDF",
        borderRadius:0,
        fontSize:18,
    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom:0
    }
})