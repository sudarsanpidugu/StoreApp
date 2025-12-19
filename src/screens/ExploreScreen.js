import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LocationContext } from "../constants/LocationContext";
import colors from "../constants/colors";

/* GOOGLE MAP IFRAME (YOUR PROVIDED URL) */
const MAP_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    </style>
  </head>
  <body>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4517443869618!2d78.38498667383035!3d17.438079401345412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9186323a93cb%3A0xc7a40dc7dd7942d8!2sCafell%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1766149692747!5m2!1sen!2sin"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen>
    </iframe>
  </body>
</html>
`;

const ExploreScreen = () => {
  const navigation = useNavigation();
  const { setLocation } = useContext(LocationContext);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* MAP BACKGROUND */}
      <WebView
        source={{ html: MAP_HTML }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
      />

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#6B7280" />
        <TextInput
          placeholder="Search area, street, landmark"
          style={styles.searchInput}
          placeholderTextColor="#6B7280"
        />
      </View>

      {/* CENTER PIN */}
      <View style={styles.centerPin}>
        <Ionicons name="location-sharp" size={44} color={colors.primary} />
      </View>

      {/* BOTTOM CONFIRM */}
      <View style={styles.bottomSheet}>
        <Text style={styles.sheetLabel}>Delivering to</Text>
        <Text style={styles.sheetAddress}>
          Cafell Technologies Pvt Ltd, Hyderabad
        </Text>

        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => {
            setLocation({
              title: "Cafell Technologies Pvt Ltd, Hyderabad",
              latitude: 17.4380794,
              longitude: 78.3849866,
            });
            navigation.goBack();
          }}
        >
          <Text style={styles.confirmText}>Confirm location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExploreScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  /* SEARCH */
  searchBar: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    elevation: 5,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#111827",
  },

  /* CENTER PIN */
  centerPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -22,
    marginTop: -44,
    zIndex: 10,
  },

  /* BOTTOM SHEET */
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 20,
  },

  sheetLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  sheetAddress: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 8,
    color: "#111827",
  },

  confirmBtn: {
    marginTop: 12,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
