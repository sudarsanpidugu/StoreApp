import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/* ACTION DATA */
const actions = [
  {
    id: "1",
    title: "Bookings",
    count: 24,
    icon: "calendar-outline",
    color: "#FF9800",
    route: "BookingHistory",
  },
  {
    id: "2",
    title: "Calls",
    count: 128,
    icon: "call-outline",
    color: "#1E88E5",
    route: "Calls",
  },
  {
    id: "3",
    title: "Chats",
    count: 54,
    icon: "chatbubble-ellipses-outline",
    color: "#4CAF50",
    route: "Chats",
  },
];

const ActionStatsCards = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {actions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.route)}
          >
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: `${item.color}20` },
              ]}
            >
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>

            <Text style={styles.count}>{item.count}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ActionStatsCards;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "31%", 
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  count: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },

  title: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    fontWeight: "600",
  },
});
