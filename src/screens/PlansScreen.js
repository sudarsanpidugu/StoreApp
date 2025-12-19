import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../constants/colors";
import CommonHeader from "../screens/More/CommonHeader";
import CarOfferCard from "../components/CarOfferCard";

const PlansScreen = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title="Car Offers" />

      <ScrollView contentContainerStyle={styles.content}>
        <CarOfferCard
          badge="Car Care Combo"
          price="279"
          service="1 Service"
          validity="1 Month"
          benefits="Free car wash, oil check & interior cleaning"
        />

        <CarOfferCard
          badge="Unlimited Checkups"
          price="349"
          service="2 Services"
          validity="28 Days"
          benefits="Engine check, AC check & tyre inspection"
        />
      </ScrollView>
    </View>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
});
