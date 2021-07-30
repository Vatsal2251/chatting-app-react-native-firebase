import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

const globleScreenOptions = {
  headerStyle: { backgroundColor: "#fff" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globleScreenOptions}>
        <Stack.Screen name="Login" options={{ headerTitleStyle: { alignSelf: 'center', color: "black", fontWeight: "700" } }} component={LoginScreen} />
        <Stack.Screen name="Register" options={{ headerTitleStyle: { alignSelf: 'center', color: "black", fontWeight: "700" }, headerLeft: null }} component={RegisterScreen} />
        <Stack.Screen name="Home" options={{ headerLeft: null }} component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
