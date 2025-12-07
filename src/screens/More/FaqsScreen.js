import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "../../screens/More/CommonHeader";

const FAQScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonHeader title="FAQs" />

      <ScrollView style={{ padding: 18 }}>
        <Text style={styles.q}>Q. What services do you provide?</Text>
        <Text style={styles.a}>A. We provide all types of car washing & detailing services.</Text>

        <Text style={styles.q}>Q. Can I schedule a booking?</Text>
        <Text style={styles.a}>A. Yes, choose a time slot while booking.</Text>

        <Text style={styles.q}>Q. Is pickup available?</Text>
        <Text style={styles.a}>A. Yes, we offer vehicle pickup & drop.</Text>
      </ScrollView>
    </View>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  q: { fontSize: 16, fontWeight: "700", marginTop: 16 },
  a: { fontSize: 14, color: "#555", marginTop: 4 },
});
