import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Animated,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, FontAwesome,Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

const providers = [
  {
    id: "1",
    name: "Crystal Clear Car Wash",
    distance: "1km",
    rating: 4.5,
    image: require("../../assets/Image/provider/p1.jpg"),
    lat: 17.421,
    long: 78.457,
  },
  {
    id: "2",
    name: "AquaShine Car Wash",
    distance: "1km",
    rating: 4.2,
    image: require("../../assets/Image/provider/p2.jpg"),
    lat: 17.423,
    long: 78.459,
  },
  {
    id: "3",
    name: "Prestige Auto Spa",
    distance: "1km",
    rating: 4.8,
    image: require("../../assets/Image/provider/p3.jpg"),
    lat: 17.425,
    long: 78.461,
  },
];

const ExploreScreen = () => {
  const navigation = useNavigation();

  const [region, setRegion] = useState({
    latitude: 17.422,
    longitude: 78.458,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={colors.primary} />
          <TextInput
            placeholder="Search Car Wash..."
            placeholderTextColor={colors.gray}
            style={styles.input}
          />
          <Ionicons name="locate" size={22} color={colors.primary} />
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(reg) => setRegion(reg)}
        >
          {providers.map((item) => (
            <Marker
              key={item.id}
              coordinate={{ latitude: item.lat, longitude: item.long }}
              title={item.name}
            />
          ))}
        </MapView>
      </View>

      {/* Provider Cards */}
      <View style={styles.bottomContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {providers.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("ServiceDetails", { provider: item })}
            >
              <Image source={item.image} style={styles.cardImage} />

              <Text style={styles.cardTitle}>{item.name}</Text>

              <View style={styles.ratingRow}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome
                    key={i}
                    name="star"
                    size={14}
                    color={i < Math.floor(item.rating) ? "#FFB000" : "#D7D7D7"}
                  />
                ))}
                <Text style={styles.ratingText}> {item.rating}</Text>
              </View>

              <View style={styles.locationRow}>
                    <Entypo name="location-pin" size={18} color={colors.primary} />
                    <Text style={styles.locationText}>{item.distance}</Text>
                  </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  locationRow: { flexDirection: "row", alignItems: "center" },
    locationText: { marginLeft: 4, fontWeight: "700", color: colors.primary },

  mapContainer: {
    flex: 1,
    overflow: "hidden",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  map: {
    flex: 1, 
  },

  searchWrapper: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 18,
  },

  searchBox: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 14,
    height: 50,
    borderWidth: 0.4,
    borderColor: "#ddd",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  input: { flex: 1, paddingLeft: 8, fontSize: 15, color: colors.textDark },

  bottomContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingLeft: 10,
  },

  card: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 12,
    padding: 12,
    elevation: 8,
    shadowColor: "#000",
  },

  cardImage: {
    width: "100%",
    height: 85,
    borderRadius: 12,
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 4,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  ratingText: {
    fontSize: 12,
    marginLeft: 5,
    color: "#444",
    fontWeight: "600",
  },

  priceTag: {
    backgroundColor: "#E8F9E7",
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
  },

  priceText: {
    color: "green",
    fontWeight: "700",
    fontSize: 13,
  },
});
