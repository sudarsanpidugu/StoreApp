import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { LocationContext } from "../../constants/LocationContext";

const { height } = Dimensions.get("window");

/* ---------------- FALLBACK LOCATION ---------------- */
const FALLBACK_LOCATION = {
  title: "Hyderabad",
  address: "Hyderabad, Telangana",
  latitude: 17.385044,
  longitude: 78.486671,
};

/* ---------------- GOOGLE MAP IFRAME ---------------- */
const getMapHTML = (lat, lng) => `
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
      src="https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen>
    </iframe>
  </body>
</html>
`;

const BookingDetailsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { location } = useContext(LocationContext);
  const [isAccepted, setIsAccepted] = useState(false);

  const finalLocation = {
    ...FALLBACK_LOCATION,
    ...location,
  };

  const latitude = Number(finalLocation.latitude);
  const longitude = Number(finalLocation.longitude);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* GOOGLE MAP BACKGROUND */}
      <WebView
        source={{ html: getMapHTML(latitude, longitude) }}
        style={StyleSheet.absoluteFill}
        javaScriptEnabled
        domStorageEnabled
      />

      {/* BACK BUTTON */}
      <SafeAreaView style={styles.backWrapper}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textDark} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* CENTER PIN (UI ONLY) */}
      <View style={styles.centerPin}>
        <Ionicons name="location-sharp" size={44} color={colors.primary} />
      </View>

      {/* BOTTOM CARD */}
      <View
        style={[
          styles.bottomCard,
          { paddingBottom: insets.bottom + 14 },
        ]}
      >
        {/* DRIVER */}
        <View style={styles.driverRow}>
          <Image
            source={require("../../../assets/Image/provider/p1.jpg")}
            style={styles.avatar}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.driverName}>Jonathan Higgins</Text>
            <Text style={styles.rating}>⭐ 4.8 (127)</Text>
          </View>
        </View>

        {/* VEHICLE */}
        <View style={styles.infoRow}>
          <Ionicons
            name="car-sport-outline"
            size={18}
            color={colors.primary}
          />
          <Text style={styles.infoText}>
            CLMV069 • Blue Tesla Diesel Taxi
          </Text>
        </View>

        {/* LOCATION */}
        <View style={styles.locationCard}>
          <View style={styles.locationLeft}>
            <View style={styles.locationDot} />
            <View>
              <Text style={styles.locationTitle}>
                {finalLocation.title}
              </Text>
              <Text style={styles.locationSub}>
                {finalLocation.address}
              </Text>
            </View>
          </View>
        </View>

        {/* ACTION BUTTON */}
        <View style={styles.actionRow}>
          {!isAccepted ? (
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => setIsAccepted(true)}
            >
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.completedBtn}
              onPress={() => navigation.navigate("BookingHistory")}
            >
              <Text style={styles.btnText}>Completed</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default BookingDetailsScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },

  backWrapper: { position: "absolute", top: 0, left: 12, zIndex: 10 },

  backBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    elevation: 4,
  },

  centerPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -22,
    marginTop: -44,
    zIndex: 10,
  },

  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    elevation: 12,
  },

  driverRow: { flexDirection: "row", alignItems: "center" },

  avatar: { width: 44, height: 44, borderRadius: 22 },

  driverName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textDark,
  },

  rating: { fontSize: 12, color: colors.textSecondary },

  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },

  infoText: {
    marginLeft: 8,
    fontWeight: "600",
    color: colors.textDark,
  },

  locationCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.gray,
  },

  locationLeft: { flexDirection: "row", alignItems: "flex-start" },

  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 12,
  },

  locationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },

  locationSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },

  actionRow: { marginTop: 16 },

  acceptBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  completedBtn: {
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: { color: "#fff", fontWeight: "800" },
});
