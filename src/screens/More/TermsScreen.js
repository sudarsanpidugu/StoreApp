import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "../../screens/More/CommonHeader";

const TermsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonHeader title="Terms & Conditions" />

      <ScrollView style={{ padding: 18 }}>
        <Text style={styles.text}>
          These are the terms and conditions for using our car wash service.
          Booking, cancellations & service policies apply.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  text: { fontSize: 14, lineHeight: 20, color: "#444" },
});
