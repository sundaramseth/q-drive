import React from 'react'
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 1) Set up redux 
import MapScreen from './screens/MapScreen';

import BikeScreen from './screens/BikeScreen';
import { KeyboardAvoidingView, Platform } from 'react-native';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding":"height"}
        style={{flex:1}}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
        <Stack.Navigator>
        <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen 
        name="MapScreen" 
        component={MapScreen} 
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen 
        name="BikeScreen" 
        component={BikeScreen} 
        options={{
          headerShown:false,
        }}
        />
       </Stack.Navigator>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
