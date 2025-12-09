import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

const services = [
  { id: 1, name: "Car Service", icon: "soap" },
  { id: 2, name: "Bike Service", icon: "tools" },
  { id: 3, name: "Car Shownroom", icon: "wrench" },
  { id: 4, name: "General Mechanic", icon: "car" },
];

const CategoryScreen = () => {
  const navigation = useNavigation(); // 👉 add navigation hook

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>

      <View style={styles.row}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceItem}
            onPress={() => navigation.navigate("Servicelist", { type: service.name })} // 👉 navigate to list
          >
            <View style={styles.squareBox}>
              <FontAwesome5 name={service.icon} size={28} color={colors.primary} />
            </View>
            <Text style={styles.label}>{service.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceItem: {
    alignItems: "center",
    width: 80,
  },
  squareBox: {
    width: 70,
    height: 70,
    backgroundColor: "#E5F2FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 8,
  },
  label: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: colors.textDark,
  },
});
