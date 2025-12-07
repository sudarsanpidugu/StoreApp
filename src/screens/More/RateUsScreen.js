import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CommonHeader from "../../screens/More/CommonHeader";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const RateUsScreen = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title="Rate Us" />

      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text style={styles.title}>Do you like this app?</Text>

        <View style={styles.starRow}>
          {[1,2,3,4,5].map((i) => (
            <Ionicons key={i} name="star" size={32} color="#FFB000" />
          ))}
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Submit Rating</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RateUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 20 },
  starRow: { flexDirection: "row", marginBottom: 30 },
  btn: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
