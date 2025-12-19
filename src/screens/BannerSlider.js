import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

const BannerSlider = () => {
  const navigation = useNavigation();

  // 🔹 PLAN DATA (API READY)
  const plan = {
    name: "Premium Car Care",
    price: 3999,
    validity: "6 Months",
    expiryDate: "15 Aug 2025",
    status: "active", // "active" | "expired"
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {/* ================= LEFT : MY CAR PLAN ================= */}
        <View style={[styles.card, styles.largeCard]}>
          <Text style={styles.cardTitle}>MY CAR PLAN</Text>

          {/* ACTIVE BADGE */}
          {plan.status === "active" && (
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
          )}

          {/* PLAN NAME */}
          <Text style={styles.planName}>{plan.name}</Text>

          {/* VALIDITY */}
          <Text style={styles.planValidity}>{plan.validity}</Text>

          {/* PRICE */}
          <Text style={styles.planPrice}>₹{plan.price} /-</Text>

          {/* STATUS TEXT */}
          {plan.status === "active" ? (
            <Text style={styles.expiryText}>
              Expires on {plan.expiryDate}
            </Text>
          ) : (
            <Text style={styles.expiredText}>Expired</Text>
          )}

          {/* BUTTON FIXED AT BOTTOM */}
          <TouchableOpacity
            style={[
              styles.bottomBtn,
              plan.status === "expired" && styles.subscribeBtn,
            ]}
            onPress={() =>
              navigation.navigate(
                plan.status === "active" ? "StoreServices" : "Plan"
              )
            }
          >
            <Text
              style={[
                styles.bottomBtnText,
                plan.status === "expired" && styles.subscribeText,
              ]}
            >
              {plan.status === "active" ? "Upgrade" : "Subscribe"}
            </Text>
          </TouchableOpacity>

        </View>

        {/* ================= RIGHT : PLANS & OFFERS ================= */}
        <View style={styles.rightColumn}>
          {/* PLANS */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Plan")}
          >
            <View style={styles.rowInline}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.planTitle}>Plans</Text>
            </View>

            <Text style={styles.cardMain}>Upgrade to Premium+</Text>
            <Text style={styles.cardSub}>
              Extended warranty & roadside assist
            </Text>

            <Text style={styles.link}>View Plans</Text>
          </TouchableOpacity>

          {/* OFFERS */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Pramotion")}
          >
            <View style={styles.rowInline}>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color={colors.secondary}
              />
              <Text style={styles.planTitle}>Offers</Text>
            </View>

            <Text style={styles.cardMain}>Flat 20% Off</Text>
            <Text style={styles.cardSub}>On full car servicing</Text>

            <Text style={styles.link}>View Offers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BannerSlider;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    marginTop: 12,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  rowInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },

  largeCard: {
    flex: 1,
    paddingVertical: 18,
  },

  rightColumn: {
    flex: 1,
    gap: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    flex: 1,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
    marginBottom: 6,
  },

  planTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },

  activeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },

  activeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D32",
  },

  planName: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textDark,
  },

  planValidity: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: "600",
  },

  planPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textDark,
    marginTop: 4,
  },

  expiryText: {
    fontSize: 13,
    color: "#2E7D32",
    marginTop: 6,
    fontWeight: "600",
  },

  expiredText: {
    fontSize: 13,
    color: "#D32F2F",
    marginTop: 6,
    fontWeight: "700",
  },

  bottomBtn: {
    marginTop: "auto",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 22,
    paddingVertical: 10,
    alignItems: "center",
  },

  bottomBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },

  subscribeBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  subscribeText: {
    color: "#fff",
  },

  cardMain: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },

  cardSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },

  link: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
});
