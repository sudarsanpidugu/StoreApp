import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import CommonHeader from "../More/CommonHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const BookingOffer = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Dummy Booking Details
  const data = {
    serviceName: "Premium Car Wash",
    carName: "Honda City",
    carModel: "ZX 2021",
    location: "Madhapur, Hyderabad",
    dateTime: "15 Feb 2025, 4:00 PM",
    serviceType: "Exterior + Interior",
  };

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const scaleAnim = new Animated.Value(1);

  const offers = [
    { id: 1, title: "₹150 OFF", desc: "On full car wash service", color1: "#FF9A9E", color2: "#FECFEF" },
    { id: 2, title: "Save 20%", desc: "Interior & detailing package", color1: "#A1C4FD", color2: "#C2E9FB" },
    { id: 3, title: "₹75 Cashback", desc: "On quick foam wash", color1: "#FBC2EB", color2: "#A6C1EE" },
  ];

  const applyOffer = (offer) => {
    setSelectedOffer(offer.id);

    // Bounce animation
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.15, friction: 4, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();

    // Show popup
    setPopupMessage(`${offer.title} applied successfully!`);
    setShowPopup(true);

    // Auto close after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleSubmit = () => {
    navigation.navigate("BookingHistory");
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Booking Offer" />

      <ScrollView contentContainerStyle={{ paddingBottom: 170 }}>
        
        {/* Booking Details */}
        <View style={styles.detailsBox}>
          <Text style={styles.sectionTitle}>Booking Details</Text>

          <Text style={styles.rowText}>Service Name: <Text style={styles.value}>{data.serviceName}</Text></Text>
          <Text style={styles.rowText}>Car Name: <Text style={styles.value}>{data.carName}</Text></Text>
          <Text style={styles.rowText}>Car Model: <Text style={styles.value}>{data.carModel}</Text></Text>
          <Text style={styles.rowText}>Location: <Text style={styles.value}>{data.location}</Text></Text>
          <Text style={styles.rowText}>Date & Time: <Text style={styles.value}>{data.dateTime}</Text></Text>
          <Text style={styles.rowText}>Service Type: <Text style={styles.value}>{data.serviceType}</Text></Text>
        </View>

        {/* Offers */}
        <Text style={styles.offerHeading}>Exclusive Offers For You</Text>

        {offers.map((offer) => (
          <Animated.View
            key={offer.id}
            style={[
              styles.offerCard,
              selectedOffer === offer.id && styles.selectedOffer,
              { transform: [{ scale: selectedOffer === offer.id ? scaleAnim : 1 }] },
            ]}
          >
            <TouchableOpacity onPress={() => applyOffer(offer)}>
              {selectedOffer === offer.id ? (
                <LinearGradient colors={[offer.color1, offer.color2]} style={styles.gradientCard}>
                  <View style={styles.offerRow}>
                    <Text style={styles.offerTitleSelected}>{offer.title}</Text>
                    <Text style={styles.tick}>✔</Text>
                  </View>
                  <Text style={styles.offerDescSelected}>{offer.desc}</Text>
                </LinearGradient>
              ) : (
                <View>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerDesc}>{offer.desc}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}

      </ScrollView>

      {/* Bottom Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Booking</Text>
        </TouchableOpacity>
      </View>

      {/* Popup */}
      {showPopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupIcon}>🎉</Text>
            <Text style={styles.popupTitle}>Offer Applied!</Text>
            <Text style={styles.popupMsg}>{popupMessage}</Text>
          </View>
        </View>
      )}

    </View>
  );
};

export default BookingOffer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fbff" },

  detailsBox: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 10,
  },

  rowText: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  value: { fontWeight: "400", color: "#555" },

  offerHeading: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 20,
    marginLeft: 18,
    marginBottom: 10,
  },

  offerCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 12,
    elevation: 3,
  },

  selectedOffer: { borderColor: colors.primary },

  gradientCard: { padding: 15, borderRadius: 15 },

  offerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

  offerTitleSelected: { fontSize: 16, fontWeight: "800", color: "#fff" },
  offerDescSelected: { fontSize: 13, color: "#fff", marginTop: 5 },

  offerTitle: { fontSize: 16, fontWeight: "700", color: colors.primary },
  offerDesc: { fontSize: 13, color: "#555", marginTop: 4 },

  tick: { fontSize: 20, color: "#fff", fontWeight: "900" },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
    elevation: 15,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  popupOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  popupBox: {
    width: "75%",
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: "center",
  },

  popupIcon: { fontSize: 45, marginBottom: 10 },
  popupTitle: { fontSize: 20, fontWeight: "800", color: colors.primary },
  popupMsg: { fontSize: 14, color: "#444", textAlign: "center", marginTop: 5 },
});
