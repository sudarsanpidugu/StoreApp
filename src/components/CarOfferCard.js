import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CarOfferCard = ({ badge, price, service, validity, benefits }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("BookingDetails", {
      badge,
      price,
      service,
      validity,
      benefits,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      // onPress={handlePress}
      style={styles.card}
    >
      {/* Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>

      {/* Price / Service / Validity */}
      <View style={styles.row}>
        <View>
          <Text style={styles.price}>₹{price}</Text>
          <Text style={styles.label}>Price</Text>
        </View>

        <View>
          <Text style={styles.value}>{service}</Text>
          <Text style={styles.label}>Service</Text>
        </View>

        <View>
          <Text style={styles.value}>{validity}</Text>
          <Text style={styles.label}>Validity</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* ✅ VALID ICON */}
        <Ionicons
          name="car-sport-outline"
          size={16}
          color={colors.secondary}
        />
        <Text style={styles.footerText}>{benefits}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CarOfferCard;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.textLight,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray,
  },

  badge: {
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 12,
  },

  badgeText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  price: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textDark,
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
  },

  label: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 2,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
});
