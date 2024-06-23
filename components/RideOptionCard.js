import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, Text, Touchable, View, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectTravelTimeInformation } from "../slices/navSlice";


const data = [
    {
        id:"Uber-X-123",
        title:"UberX",
        multiplier:1,
        image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png"
    },
    {
        id:"Uber-X-1234",
        title:"Uber XL",
        multiplier:1.2,
        image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350380/assets/2f/29d010-64eb-47ac-b6bb-97503a838259/original/UberX-%281%29.png"
    },
    {
        id:"Uber-X-1235",
        title:"Uber LUX",
        multiplier:1.75,
        image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png"
    },
    {
        id:"Uber-X-1236",
        title:"Uber Prime",
        multiplier:2,
        image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png"
    }
    
]



const SURGE_CHARGE_RATE = 15;

const RideOptionCard = () => {

    
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    const rideInKM = parseFloat(travelTimeInformation?.distance?.text) * (1.609344)

    return(
     
     <SafeAreaView style={tw`bg-white flex-grow`}>
        <View style={tw`border-b mt-auto border-gray-100`}>
            <TouchableOpacity 
            onPress={() => navigation.navigate("NavigateCard")}
            style={tw`absolute top-0 left-5 z-50 p-3 rounded-full`}
            >
            <Icon name="chevron-left" type="fontawesome" color="black"/>
            </TouchableOpacity>
            <Text style={tw`text-center py-2 text-xl`}>Select a Ride - {rideInKM.toFixed(2)} Km</Text>
        </View>
            <FlatList 
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item:{id,title,multiplier,image},item})=>(
                <TouchableOpacity 
                onPress={() => setSelected(item)}
                style={tw`flex-row justify-between px-10 items-center 
                ${id === selected?.id && "bg-gray-200"}`}>
                    <Image 
                    style={{
                        width:100,
                        height:100,
                        resizeMode:"contain"
                    }}
                    source={{uri:image}}
                    />
                    <View style={tw`-ml-6`}>
                       <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>{travelTimeInformation?.duration?.text}</Text>
                    </View>
                    <Text style={tw`text-lg`}>
                        {new Intl.NumberFormat("en-gb", {
                            style:"currency",
                            currency:"INR"
                        }).format(rideInKM * SURGE_CHARGE_RATE * multiplier)}
                    </Text>
                </TouchableOpacity>

            )}
            />
            <View style={tw`flex m-auto border-t border-gray-200 w-100`}>
                <TouchableOpacity
                disabled={!selected}
                style={tw`py-3 m-1 bg-black ${!selected && "bg-gray-300"}`}>
                    <Text  style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
     </SafeAreaView>
    )
}

export default RideOptionCard
