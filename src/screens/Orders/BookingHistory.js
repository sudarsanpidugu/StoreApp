import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

/* ---------------- BOOKINGS DATA ---------------- */
const INITIAL_BOOKINGS = [
  {
    id: 1,
    service: "Exterior Wash",
    name: "Crystal Clear Car Wash",
    date: "2025-01-12",
    displayDate: "12 Jan 2025",
    time: "4:30 PM",
    status: "Completed",
    distance: "1.2 km",
    image: require("../../../assets/Image/provider/p1.jpg"),
  },
  {
    id: 2,
    service: "Interior Wash",
    name: "Prestige Auto Spa",
    date: "2025-01-20",
    displayDate: "20 Jan 2025",
    time: "10:00 AM",
    status: "Accept", // ✅ ACCEPT
    distance: "3.4 km",
    image: require("../../../assets/Image/provider/p3.jpg"),
  },
  {
    id: 3,
    service: "Foam Wash",
    name: "Aquashine Car Wash",
    date: "2025-01-05",
    displayDate: "05 Jan 2025",
    time: "02:15 PM",
    status: "Cancel",
    distance: "2.1 km",
    image: require("../../../assets/Image/provider/p2.jpg"),
  },
];

const BookingHistory = () => {
  const navigation = useNavigation();

  const [bookingList, setBookingList] = useState(INITIAL_BOOKINGS);
  const [filterVisible, setFilterVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("Accept");

  /* ---------------- FILTER BOOKINGS ---------------- */
  const filteredBookings = bookingList.filter((b) => {
    const statusMatch = b.status === activeTab;
    const dateMatch = selectedDate ? b.date === selectedDate : true;
    return statusMatch && dateMatch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* HEADER GRADIENT */}
      <LinearGradient
        colors={[colors.primary, "#4ca3ff"]}
        style={styles.headerGradient}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Booking History</Text>

          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <Ionicons name="filter-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ---------------- TABS ---------------- */}
        <View style={styles.tabsContainer}>
          {["Accept", "Completed", "Cancel"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>

              {activeTab === tab && (
                <View style={styles.activeIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------------- CONTENT ---------------- */}
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={52} color={colors.gray} />
            <Text style={styles.emptyText}>No bookings found</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredBookings.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.cardImg} />

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.service}>{item.service}</Text>

                  <View style={styles.row}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>
                      {item.displayDate} | {item.time}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Entypo name="location-pin" size={18} color={colors.primary} />
                    <Text style={[styles.infoText, styles.distance]}>
                      {item.distance}
                    </Text>
                  </View>
                </View>

                {/* STATUS */}
                <View
                  style={[
                    styles.statusBox,
                    item.status === "Completed"
                      ? styles.completed
                      : item.status === "Accept"
                      ? styles.accept
                      : styles.cancel,
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

export default BookingHistory;

/* ---------------- STYLES ---------------- */
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
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    flex: 1,
    textAlign: "center",
  },

  /* TABS */
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.gray,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: colors.primary,
  },

  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
  },

  activeTabText: {
    color: colors.textLight,
  },

  activeIndicator: {
    marginTop: 4,
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.secondary,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  emptyText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 15,
    padding: 12,
    borderRadius: 14,
    elevation: 4,
  },

  cardImg: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },

  service: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  infoText: {
    fontSize: 13,
    marginLeft: 4,
    color: "#555",
  },

  distance: {
    color: colors.primary,
    fontWeight: "700",
  },

  statusBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
  },

  accept: { backgroundColor: colors.primary },   // ACCEPT
  completed: { backgroundColor: "green" },       // COMPLETED
  cancel: { backgroundColor: "#FF3B30" },        // CANCEL
});
