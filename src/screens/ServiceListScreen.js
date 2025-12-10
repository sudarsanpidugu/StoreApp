import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import CategoryScreen from "./CategoryScreen";

const providers = [
  { id: "1", name: "Crystal Clear Car Wash", desc: "Premium exterior wash & polish", rating: 4.5, distance: "1.3 km", image: require("../../assets/Image/provider/p1.jpg") },
  { id: "2", name: "Aquashine Car Wash", desc: "Quick & reliable service", rating: 4.4, distance: "2.1 km", image: require("../../assets/Image/provider/p2.jpg") },
  { id: "3", name: "Prestige Auto Spa", desc: "Luxury detailing services", rating: 4.8, distance: "3.6 km", image: require("../../assets/Image/provider/p3.jpg") },
  { id: "4", name: "Turbowash Express", desc: "Express cleaning specialists", rating: 4.6, distance: "1.9 km", image: require("../../assets/Image/provider/p1.jpg") },
];

const categories = [
  "Service Station", "Car Tyers", "Puncture Shops", "Detailing",
  "Polish & Wax", "Car Tyers", "Puncture Shops", "Detailing", "Polish & Wax",
];

const ServiceListScreen = () => {
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState("Service Station");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* HEADER GRADIENT */}
      <LinearGradient
        colors={[colors.primary, "#4ca3ff"]}
        style={styles.headerGradient}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Stores</Text>

          {/* FILTER ICON */}
          <TouchableOpacity
            onPress={() => {
              setShowFilterPopup(true);
              setShowDropdown(false);
            }}
          >
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerSubtitle}>Choose the best service near you</Text>

        {/* CATEGORY DROPDOWN */}
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => {
              setShowDropdown(!showDropdown);
              setShowFilterPopup(false);
            }}
          >
            <Text style={styles.dropdownText}>{selectedCategory}</Text>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownAbsolute}>
              <ScrollView style={{ maxHeight: 200 }}>
                {categories.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCategory(item);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* ⭐ CENTER POPUP WITH RADIO BUTTONS */}
        {showFilterPopup && (
          <View style={styles.popupOverlay}>
            <View style={styles.popupBox}>

              {/* CLOSE BUTTON */}
              <TouchableOpacity
                style={styles.popupClose}
                onPress={() => setShowFilterPopup(false)}
              >
                <Ionicons name="close" size={26} color="#333" />
              </TouchableOpacity>

              <Text style={styles.popupTitle}>Filter by Category</Text>

              <ScrollView style={{ maxHeight: 280 }}>
                {categories.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.popupRow}
                    onPress={() => {
                      setSelectedCategory(item);
                      setShowFilterPopup(false);
                    }}
                  >
                    <Ionicons
                      name={selectedCategory === item ? "radio-button-on" : "radio-button-off"}
                      size={22}
                      color={colors.primary}
                    />
                    <Text style={styles.popupItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

            </View>
          </View>
        )}

        {/* MAIN CONTENT */}
        <CategoryScreen />

        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Text style={styles.heading}>Near by Stores</Text>

            {providers.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => navigation.navigate("ServiceDetails", { provider: item })}
              >
                <Image source={item.image} style={styles.cardImage} />

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>

                  <View style={styles.cardFooter}>
                    <View style={styles.ratingRow}>
                      <FontAwesome name="star" size={14} color="#FFB000" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>

                    <View style={styles.locationRow}>
                      <Entypo name="location-pin" size={18} color={colors.primary} />
                      <Text style={styles.locationText}>{item.distance}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ServiceListScreen;

const styles = StyleSheet.create({
  headerGradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: Platform.OS === "android" ? StatusBar.currentHeight + 130 : 110,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerArea: {
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    flex: 1,
  },

  headerSubtitle: {
    color: "#e8f4ff",
    marginLeft: 18,
    marginTop: 5,
    fontSize: 14,
  },

  /* DROPDOWN */
  dropdownWrapper: {
    marginHorizontal: 18,
    marginTop: 12,
    zIndex: 999,
  },

  dropdownBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 6,
    alignItems: "center",
  },

  dropdownText: { fontSize: 15, color: "#000", fontWeight: "600" },

  dropdownAbsolute: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 8,
    paddingVertical: 6,
    zIndex: 9999,
  },

  dropdownItem: { paddingVertical: 10, paddingHorizontal: 14 },
  dropdownItemText: { fontSize: 14, fontWeight: "600", color: "#444" },

  /* ⭐ CENTER POPUP */
  popupOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  popupBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
    maxHeight: 350,
  },

  popupClose: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },

  popupTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 10,
  },

  popupRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  popupItemText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
    paddingLeft: 10,
  },

  /* CARD */
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 18,
    padding: 12,
    borderRadius: 16,
    elevation: 4,
  },

  cardImage: { width: 85, height: 85, borderRadius: 14 },
  cardBody: { marginLeft: 12, flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "800", color: "#000" },
  cardDesc: { fontSize: 13, marginVertical: 2, color: "#666" },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 4, fontWeight: "700" },

  locationRow: { flexDirection: "row", alignItems: "center" },
  locationText: { marginLeft: 4, fontWeight: "700", color: colors.primary },
});
