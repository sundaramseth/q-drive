import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Icon } from "@rneui/base";
import tw from "twrnc";

const data=[
    {
        id:"123",
        icon:"home",
        location:"Home",
        destination:"Code Streen Mirzapur"
    },
    {
        id:"1234",
        icon:"business-outline",
        location:"Work",
        destination:"Mumbai, India"
    }

];

const NavFavorites = () => {
    return(
    <FlatList 
    data={data}
    ItemSeparatorComponent={()=>(
        <View style={[tw`bg-gray-200`, {height:0.5}]} />
    )}
    keyExtractor={(item)=>item.id}
    renderItem={({item:{location, destination, icon}})=>(
        <TouchableOpacity style={tw`flex-row items-center p-4`}>
            <Icon 
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
            />
            <View>
                <Text style={tw`font-semibold text-lg`}>
                    {location}
                </Text>
                <Text style={tw`text-gray-500`}>
                    {destination}
                </Text>
            </View>
        </TouchableOpacity>
    )}/>
    )
}

export default NavFavorites;

const styles =  StyleSheet.create({});