import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonHeader from "../../screens/More/CommonHeader";

const ContactUsScreen = () => {
  return (
    <>
      <CommonHeader title="Contact Us" />
      <View style={styles.container}>
        <Text style={styles.text}>📞 Phone: +91 846400XXXX</Text>
        <Text style={styles.text}>📧 Email: support@carwash.com</Text>
        <Text style={styles.text}>📍 Location: Hyderabad, India</Text>
      </View>
    </>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18 },
  text: { fontSize: 16, marginBottom: 12, fontWeight: "600" },
});
