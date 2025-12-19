import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import CommonHeader from "../screens/More/CommonHeader";

const PROMOTIONS = [
  {
    id: 1,
    title: "Free Car Wash",
    subTitle: "On first service booking",
    discount: "100% OFF",
    icon: "car-outline",
    bg: "#EAF0FF",
  },
  {
    id: 2,
    title: "Engine Check Offer",
    subTitle: "Save on engine diagnostics",
    discount: "₹499 OFF",
    icon: "speedometer-outline",
    bg: "#FFF7ED",
  },
  {
    id: 3,
    title: "Annual Service Plan",
    subTitle: "Best value for your car",
    discount: "20% OFF",
    icon: "calendar-outline",
    bg: "#ECFDF5",
  },
];

const PramotionScreen = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title="Pramotion" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP BANNER */}
        <View style={styles.banner}>
          <Ionicons name="pricetags-outline" size={32} color="#fff" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.bannerTitle}>Exclusive Car Deals</Text>
            <Text style={styles.bannerSub}>
              Save more on every service 🚗
            </Text>
          </View>
        </View>

        {/* PROMOTION CARDS */}
        {PROMOTIONS.map((item) => (
          <View
            key={item.id}
            style={[styles.card, { backgroundColor: item.bg }]}
          >
            <View style={styles.cardRow}>
              <View style={styles.iconBox}>
                <Ionicons
                  name={item.icon}
                  size={26}
                  color={colors.primary}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.subTitle}</Text>
              </View>

              <View style={styles.discountBox}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.ctaBtn}>
              <Text style={styles.ctaText}>View Offer</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* FOOTER NOTE */}
        <Text style={styles.noteText}>
          * Offers are valid for a limited time and may vary by location.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PramotionScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  /* BANNER */
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  bannerSub: {
    color: "#E5E7EB",
    fontSize: 12,
    marginTop: 2,
  },

  /* CARD */
  card: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.gray,
  },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },

  cardSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  discountBox: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  /* CTA */
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  ctaText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
    marginRight: 4,
  },

  /* NOTE */
  noteText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 12,
  },
});
