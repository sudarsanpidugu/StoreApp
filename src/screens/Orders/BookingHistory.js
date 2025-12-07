import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const bookings = [
  {
    id: 1,
    service: "Exterior Wash",
    name: "Crystal Clear Car Wash",
    date: "12 Jan 2025",
    time: "4:30 PM",
    status: "Completed",
    distance: "1.2 km",
    image: require("../../../assets/Image/provider/p1.jpg"),
  },
  {
    id: 2,
    service: "Interior Wash",
    name: "Prestige Auto Spa",
    date: "20 Jan 2025",
    time: "10:00 AM",
    status: "Upcoming",
    distance: "3.4 km",
    image: require("../../../assets/Image/provider/p3.jpg"),
  },
  {
    id: 3,
    service: "Foam Wash",
    name: "Aquashine Car Wash",
    date: "05 Jan 2025",
    time: "02:15 PM",
    status: "Cancelled",
    distance: "2.1 km",
    image: require("../../../assets/Image/provider/p2.jpg"),
  },
];

const BookingHistory = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* HEADER GRADIENT */}
      <LinearGradient
        colors={[colors.primary, "#4ca3ff"]}
        style={styles.headerGradient}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Booking History</Text>

          <View style={{ width: 28 }} />
        </View>

        {/* BOOKINGS LIST */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {bookings.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.cardImg} />

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.service}>{item.service}</Text>

                <View style={styles.row}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>{item.date} | {item.time}</Text>
                </View>

                <View style={styles.row}>
                  <Entypo name="location-pin" size={18} color={colors.primary} />
                  <Text style={[styles.infoText, { color: colors.primary, fontWeight: "700" }]}>
                    {item.distance}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.statusBox,
                  item.status === "Completed"
                    ? styles.completed
                    : item.status === "Upcoming"
                      ? styles.upcoming
                      : styles.cancelled,
                ]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  headerGradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: Platform.OS === "android" ? StatusBar.currentHeight + 110 : 130,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerArea: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    flex: 1,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 12,
    borderRadius: 14,
    elevation: 5,
    shadowColor: "#000",
    alignItems: "center",
  },
  cardImg: { width: 75, height: 75, borderRadius: 10 },

  title: { fontSize: 15, fontWeight: "700", color: colors.textDark },
  service: { fontSize: 12, color: "#777", marginBottom: 4 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  infoText: { fontSize: 13, marginLeft: 4, color: "#555" },

  statusBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: { fontSize: 12, fontWeight: "800", color: "#fff" },

  completed: { backgroundColor: "green" },
  upcoming: { backgroundColor: "#FFA500" },
  cancelled: { backgroundColor: "#FF3B30" },
});
