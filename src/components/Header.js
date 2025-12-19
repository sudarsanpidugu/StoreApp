import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Switch,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { LocationContext } from "../constants/LocationContext";
import colors from "../constants/colors";

const Header = () => {
  const navigation = useNavigation();
  const { location } = useContext(LocationContext);
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={["#0F3C91", "#518EFF"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.wrapper}
      >
        {/* TOP ROW */}
        <View style={styles.row}>
          {/* LEFT : BRAND + LOCATION */}
          <View style={styles.leftSection}>
            <Text style={styles.brandText}>StoreApp</Text>

            <TouchableOpacity
              style={styles.locationRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Explore")}
            >
              <Ionicons name="location-outline" size={18} color="#fff" />
              <Text style={styles.locationText} numberOfLines={1}>
                {location?.title || "Select location"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* RIGHT : NOTIFICATION + SWITCH */}
          <View style={styles.rightActions}>
            {/* 🔔 NOTIFICATION BUTTON */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
              style={{ marginRight: 10 }}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>

            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              trackColor={{ false: "#9CA3AF", true: "#22C55E" }}
              thumbColor="#ffffff"
              style={styles.switch}
            />
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={colors.primary} />
          <TextInput
            placeholder="Search items, stores..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Header;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#0F3C91",
  },

  wrapper: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 5,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* LEFT SIDE */
  leftSection: {
    maxWidth: "70%",
  },

  brandText: {
    color: "#ffc519ff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  locationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    maxWidth: "90%",
  },

  /* RIGHT SIDE */
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },

  /* SEARCH */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 14,
    paddingHorizontal: 14,
    height: 46,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
});
