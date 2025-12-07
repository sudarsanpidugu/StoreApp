import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen"; 
import ProfileScreen from "../screens/Profile/ProfileScreen";
import MoreScreen from "../screens/MoreScreen";
import colors from "../constants/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 60 + insets.bottom,              // ⬅ Add safe bottom padding
          paddingBottom: insets.bottom,            // Keep icons up
          borderTopWidth: 0.5,
          borderTopColor: "#e0e0e0",
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#555",
        tabBarItemStyle: { paddingVertical: 4 },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 2,
        },

        tabBarIcon: ({ color }) => {
          let iconName =
            route.name === "Home"
              ? "home-outline"
              : route.name === "Explore"
              ? "search-outline"
              : route.name === "Profile"
              ? "person-outline"
              : "menu-outline";

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
