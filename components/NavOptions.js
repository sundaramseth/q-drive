import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import React from "react";
import { FlatList, Text, Touchable, Image, TouchableOpacity, View } from "react-native";
import { useSelector } from 'react-redux';
import tw from "twrnc";
import { selectOrigin } from '../slices/navSlice';

data = [
    {
        id:"123",
        title:"Rikshaw",
        image:"https://cdn4.iconfinder.com/data/icons/transportation-390/512/Auto_Rickshaw-512.png",
        screen:"MapScreen",
    },
    {
        id:"1234",
        title:"Bike",
        image:"https://static.vecteezy.com/system/resources/previews/012/482/271/non_2x/motorcycle-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-free-vector.jpg",
        screen:"BikeScreen",
    }
]


const NavOption = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin)


    return(
       <FlatList 
       data={data}
       keyExtractor={(item) => item.id}
       horizontal
       renderItem={({item}) => (
        <TouchableOpacity 
        onPress={()=>navigation.navigate(item.screen)}
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 h-50`}
        disabled={!origin}
        >
            <View style={tw`${!origin && "opacity-20"}`}>
                <Image
                style={{width:60, height:60, resizeMode:"contain" }} 
                source={{uri:item.image}} />
                <Text style={tw`mt-4 text-lg font-semibold`}>{item.title}</Text>
                <Icon 
                style={tw`p-2 bg-black rounded-full w-10 mt-2`}
                name="arrowright" 
                color="white"
                type='antdesign' 
                />
            </View>
        </TouchableOpacity>
       )}
       />
    )
}

export default NavOption

