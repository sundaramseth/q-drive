import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from 'twrnc';
import Map from "../components/Map";
import { createStackNavigator } from "@react-navigation/stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionCard from "../components/RideOptionCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {

    const Stack = createStackNavigator();
    const navigation = useNavigation();


    return(
        <View>
            
            <View style={tw`z-50 flex absolute top-12 left-7 `}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate("HomeScreen")}
            style={tw`bg-gray-200 rounded-25 py-2 px-2 shadow-lg`}>
                 <Icon name="menu-outline" type="ionicon" color="black" size={25} />
            </TouchableOpacity>
            </View>
       

           <View style={tw`h-1/2`}>
                <Map/>
                
           </View>
           
           <View style={tw`h-1/2`}>
            <Stack.Navigator>
                <Stack.Screen
                name="NavigateCard"
                component={NavigateCard}
                options={{
                    headerShown:false
                }}

                />
                <Stack.Screen 
                name="RideOptionCard"
                component={RideOptionCard}
                options={{
                    headerShown:false
                }}
                />
            </Stack.Navigator>
           </View>
        </View>
    )
}

export default MapScreen