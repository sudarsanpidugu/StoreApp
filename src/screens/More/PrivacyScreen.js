import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "../../screens/More/CommonHeader";

const PrivacyScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonHeader title="Privacy Policy" />
      <ScrollView style={{ padding: 18 }}>
        <Text style={styles.text}>
          We respect your privacy. We do not share your personal data with any 3rd party organisations.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  text: { fontSize: 14, lineHeight: 20, color: "#444" },
});
