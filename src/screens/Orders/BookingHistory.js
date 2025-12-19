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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";

/* ---------------- STATUS COLORS ---------------- */
const STATUS_COLORS = {
  Create: "#F59E0B",
  "In Progress": colors.primary,
  Completed: "#2E7D32",
};

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
    status: "In Progress",
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
    status: "Create",
    distance: "2.1 km",
    image: require("../../../assets/Image/provider/p2.jpg"),
  },
];

const BookingHistory = () => {
  const navigation = useNavigation();

  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [activeTab, setActiveTab] = useState("Create");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  /* ---------------- FILTER BOOKINGS ---------------- */
  const filteredBookings = bookings.filter((b) => {
    const statusMatch = b.status === activeTab;
    const dateMatch = selectedDate ? b.date === selectedDate : true;
    return statusMatch && dateMatch;
  });

  /* ---------------- DELETE ALL ---------------- */
  const deleteAllBookings = () => {
    setBookings([]);
    setSelectedDate(null);
    setFilterSheetVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* HEADER */}
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

          <TouchableOpacity onPress={() => setFilterSheetVisible(true)}>
            <Ionicons name="filter-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ---------------- STATUS TABS ---------------- */}
        <View style={styles.tabsContainer}>
          {["Create", "In Progress", "Completed"].map((tab) => {
            const isActive = activeTab === tab;
            const tabColor = STATUS_COLORS[tab];

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, isActive && { backgroundColor: tabColor }]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab}
                </Text>
                {isActive && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ---------------- CONTENT ---------------- */}
        {filteredBookings.length === 0 ? (
          <View style={styles.centerEmptyContainer}>
            <Ionicons name="calendar-outline" size={60} color={colors.gray} />
            <Text style={styles.emptyText}>No bookings found</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredBookings.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.cardImg} />

                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.service}>{item.service}</Text>

                  <View style={styles.row}>
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.infoText}>
                      {item.displayDate} • {item.time}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Entypo
                      name="location-pin"
                      size={16}
                      color={STATUS_COLORS[item.status]}
                    />
                    <Text
                      style={[
                        styles.distance,
                        { color: STATUS_COLORS[item.status] },
                      ]}
                    >
                      {item.distance}
                    </Text>
                  </View>
                </View>

                {/* STATUS BADGE */}
                <View
                  style={[
                    styles.statusBox,
                    { backgroundColor: STATUS_COLORS[item.status] },
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>

      {/* ---------------- FILTER POPUP ---------------- */}
      <Modal transparent animationType="fade" visible={filterSheetVisible}>
        <View style={styles.centerOverlay}>
          <View style={styles.filterPopup}>
            <Text style={styles.popupTitle}>Filter Options</Text>

            <TouchableOpacity style={styles.popupItem} onPress={deleteAllBookings}>
              <Text style={[styles.popupText, { color: "#FF3B30" }]}>
                Delete All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => {
                setFilterSheetVisible(false);
                setCalendarVisible(true);
              }}
            >
              <Text style={styles.popupText}>Filter by Date</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => setFilterSheetVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ---------------- DATE FILTER ---------------- */}
      <Modal transparent animationType="slide" visible={calendarVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Date</Text>

            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setCalendarVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
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

  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 4,
    elevation: 3,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
  },

  activeTabText: {
    color: "#fff",
  },

  tabIndicator: {
    marginTop: 4,
    width: 22,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#fff",
  },


  centerEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
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
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
    elevation: 4,
    alignItems: "center",
  },

  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textDark,
  },

  service: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  infoText: {
    fontSize: 13,
    marginLeft: 6,
    color: "#555",
  },

  distance: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "700",
  },

  statusBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
  },

  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  sheetItem: {
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  sheetText: {
    fontSize: 16,
    fontWeight: "700",
  },

  cancelItem: {
    borderBottomWidth: 0,
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },

  clearBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
  },

  clearText: {
    color: colors.primary,
    fontWeight: "700",
  },
});
