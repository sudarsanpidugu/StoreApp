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
  Modal,
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

const categories = ["Service Station", "Car Tyers", "Puncture Shops", "Detailing", "Polish & Wax"];

const ServiceListScreen = () => {
  const navigation = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Service Station");

  const [filterModal, setFilterModal] = useState(false);

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
          <TouchableOpacity onPress={() => setFilterModal(true)}>
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerSubtitle}>Choose the best service near you</Text>

        {/* DROPDOWN */}
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => setShowDropdown(!showDropdown)}
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
            </View>
          )}
        </View>

        {/* FILTER MODAL */}
        <Modal visible={filterModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setFilterModal(false)}
              >
                <Ionicons name="close" size={26} color="#333" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Filter by Service</Text>

              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioRow}
                  onPress={() => {
                    setSelectedCategory(item);
                    setFilterModal(false);
                  }}
                >
                  <Ionicons
                    name={selectedCategory === item ? "radio-button-on" : "radio-button-off"}
                    size={22}
                    color={colors.primary}
                  />
                  <Text style={styles.radioLabel}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

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
                onPress={() => navigation.navigate("Booknow", { provider: item })}
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
    height: Platform.OS === "android" ? StatusBar.currentHeight + 150 : 160,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerArea: {
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 8 : 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    position: "relative",
    zIndex: 9999,
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

  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
    paddingLeft: 10,
  },

  /* MODAL */
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  closeBtn: {
    position: "absolute",
    right: 15,
    top: 12,
    padding: 6,
  },

  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 18 },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  radioLabel: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "600",
    color: "#333",
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
