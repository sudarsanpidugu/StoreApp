import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";

import TabNavigator from "./TabNavigator";
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import OtpLoginScreen from "../screens/OtpLoginScreen";
import ServiceListScreen from "../screens/ServiceListScreen";
import BooknowScreen from "../screens/Orders/BooknowScreen";
import BookingHistory from "../screens/Orders/BookingHistory";
import Editprofile from "../screens/Profile/Editprofile";

import MoreScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/More/SettingsScreen";
import TermsScreen from "../screens/More/TermsScreen";
import PrivacyScreen from "../screens/More/PrivacyScreen";
import RateUsScreen from "../screens/More/RateUsScreen";
import FaqsScreen from "../screens/More/FaqsScreen";
import ContactUsScreen from "../screens/More/ContactUsScreen";
import CommonHeader from "../screens/More/CommonHeader";
import AddVehical from "../screens/Profile/AddVehical";
import BookingOffer from "../screens/Orders/BookingOffer";

// Additional pages for More Menu

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        
        {/* Auth screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OtpLogin" component={OtpLoginScreen} />

        {/* Main Tab Navigation */}
        <Stack.Screen name="Main" component={TabNavigator} />

        {/* Extra pages */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetailScreen} />
        <Stack.Screen name="Servicelist" component={ServiceListScreen} />
        <Stack.Screen name="Booknow" component={BooknowScreen} />
        <Stack.Screen name="BookingHistory" component={BookingHistory} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="AddVehical" component={AddVehical} />
        <Stack.Screen name="BookingOffer" component={BookingOffer} />

        {/* Profile */}
        <Stack.Screen
          name="Editprofile"
          component={Editprofile}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen name="More" component={MoreScreen} />

        {/* More Section Child Screens */}
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="FaqScreen" component={FaqsScreen} />
        <Stack.Screen name="ContactScreen" component={ContactUsScreen} />
        <Stack.Screen name="TermsScreen" component={TermsScreen} />
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
        <Stack.Screen name="RateUsScreen" component={RateUsScreen} />
        <Stack.Screen name="CommonHeader" component={CommonHeader} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
