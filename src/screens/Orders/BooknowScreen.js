import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const BooknowScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [serviceType, setServiceType] = useState("Self");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTimeChange = (event, date) => {
    if (event.type === "dismissed") return setShowPicker(false);
    setShowPicker(false);
    if (date) setSelectedDate(date);
  };

  const formattedDateTime = selectedDate
    ? selectedDate.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
    : "Select Date & Time";

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* HEADER */}
      <LinearGradient
        colors={[colors.primary, "#7abbfcff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Service</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* FORM */}
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
            <View style={styles.card}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} placeholder="Enter full name" placeholderTextColor="#999" />

              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={10}
              />

              <Text style={styles.label}>Car Name</Text>
              <TextInput style={styles.input} placeholder="Ex: Swift, Fortuner" placeholderTextColor="#999" />

              <Text style={styles.label}>Car Model</Text>
              <TextInput style={styles.input} placeholder="Ex: 2020 Model" placeholderTextColor="#999" />

              <Text style={styles.label}>Car Color</Text>
              <TextInput style={styles.input} placeholder="Ex: White" placeholderTextColor="#999" />

              <Text style={styles.label}>Location</Text>
              <TextInput style={styles.input} placeholder="Enter pickup location" placeholderTextColor="#999" />

              <Text style={styles.label}>Select Date & Time</Text>
              <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                <Text style={{ fontSize: 15, color: selectedDate ? "#000" : "#999" }}>{formattedDateTime}</Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="datetime"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={handleTimeChange}
                />
              )}

              <Text style={styles.sectionTitle}>Service Type</Text>

              <View style={styles.radioRow}>
                {["Self", "Pickup"].map((type) => (
                  <TouchableOpacity key={type} style={styles.radioItem} onPress={() => setServiceType(type)}>
                    <View style={[styles.radioCircle, serviceType === type && styles.radioSelected]}>
                      {serviceType === type && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.radioLabel}>{type === "Self" ? "Self" : "Service Pickup"}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* FOOTER BUTTON */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 0 }]}>
          <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate("BookingOffer")}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default BooknowScreen;

const styles = StyleSheet.create({
  headerGradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: Platform.OS === "android" ? StatusBar.currentHeight + 110 : 130,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },


  headerArea: {
    paddingHorizontal: 18,
    paddingVertical: 14,
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 18,
    elevation: 4,
  },

  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#333" },

  input: {
    backgroundColor: "#F2F4F7",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 14,
  },

  sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 10, color: colors.primary },

  radioRow: { flexDirection: "row", marginTop: 6, gap: 25 },
  radioItem: { flexDirection: "row", alignItems: "center" },

  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  radioSelected: { borderColor: colors.primary },
  radioInner: { height: 12, width: 12, borderRadius: 6, backgroundColor: colors.primary },
  radioLabel: { marginLeft: 8, fontSize: 15, fontWeight: "600", color: "#333" },

  footer: {
    position: "absolute",
    bottom: 5,     // <-- 5px gap above nav bar
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 20,
  },



  bookBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 5,   // optional extra gap for look
  },


  bookText: { fontSize: 18, fontWeight: "800", color: "#fff" },
});
