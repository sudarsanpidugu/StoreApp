import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LocationContext } from "../constants/LocationContext";
import colors from "../constants/colors";


const lightMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
];

const ExploreScreen = () => {
  const navigation = useNavigation();
  const { setLocation } = useContext(LocationContext);
  const mapRef = useRef(null);

  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState("Fetching location...");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);


  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    const reg = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    setRegion(reg);
    mapRef.current?.animateToRegion(reg, 900);
    reverseGeocode(reg.latitude, reg.longitude);
    setLoading(false);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);


  const reverseGeocode = async (lat, lng) => {
    const res = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
    if (res.length > 0) {
      const p = res[0];
      setAddress(
        `${p.name || ""} ${p.street || ""}, ${p.city || p.region || ""}`.trim()
      );
    }
  };

  /* 🔍 SEARCH WITH SUGGESTIONS */
  const onSearchChange = async (text) => {
    setSearch(text);
    if (text.length < 3) return setSuggestions([]);

    const res = await Location.geocodeAsync(text);
    setSuggestions(res.slice(0, 6));
  };

  if (loading || !region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#6B7280" />
        <TextInput
          placeholder="Search area, street, landmark"
          value={search}
          onChangeText={onSearchChange}
          style={styles.searchInput}
        />
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          <FlatList
            data={suggestions}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  const reg = {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  };
                  setRegion(reg);
                  mapRef.current?.animateToRegion(reg, 800);
                  reverseGeocode(reg.latitude, reg.longitude);
                  setSearch("");
                  setSuggestions([]);
                }}
              >
                <Ionicons name="location-outline" size={18} color={colors.primary} />
                <Text style={styles.suggestionText}>{search}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={region}
        customMapStyle={lightMapStyle}
        onRegionChangeComplete={(r) => {
          setRegion(r);
          reverseGeocode(r.latitude, r.longitude);
        }}
      />

      <TouchableOpacity style={styles.gpsBtn} onPress={getCurrentLocation}>
        <Ionicons name="locate" size={22} color="#fff" />
      </TouchableOpacity>

      <View style={styles.centerPin}>
        <Ionicons name="location-sharp" size={44} color={colors.primary} />
      </View>

      <View style={styles.bottomSheet}>
        <Text style={styles.sheetLabel}>Delivering to</Text>
        <Text style={styles.sheetAddress} numberOfLines={2}>
          {address}
        </Text>

        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => {
            setLocation({
              title: address,
              latitude: region.latitude,
              longitude: region.longitude,
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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* SEARCH */
  searchBar: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 20,
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
  },

  suggestionBox: {
    position: "absolute",
    top: 108,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 5,
    zIndex: 20,
  },

  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  suggestionText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#111827",
  },

  /* MAP CONTROLS */
  gpsBtn: {
    position: "absolute",
    right: 16,
    bottom: 180,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 30,
    elevation: 6,
  },

  centerPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -22,
    marginTop: -44,
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


