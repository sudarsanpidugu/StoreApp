import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import OrdersScreen from "../screens/Orders/OrdersScreen";

import TabNavigator from "./TabNavigator";
import HomeScreen from "../screens/HomeScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import OtpLoginScreen from "../screens/OtpLoginScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        {/* Auth screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetailScreen} />
        <Stack.Screen name="OtpLogin" component={OtpLoginScreen} />


        {/* Main Tab Navigation */}
        <Stack.Screen name="Main" component={TabNavigator} />

        {/* Extra pages */}
        <Stack.Screen name="Orders" component={OrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
