import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import colors from "../../constants/colors";
import CommonHeader from "./CommonHeader";

/* ---------------- INITIAL CHAT DATA ---------------- */
const INITIAL_CHATS = [
  {
    id: "1",
    name: "Ravi Kumar",
    lastMessage: "Hi, I need help with my order",
    time: "10:45 AM",
    date: "2025-12-16",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Amit Sharma",
    lastMessage: "Thanks for the update 👍",
    time: "09:10 AM",
    date: "2025-12-16",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Service Support",
    lastMessage: "Your issue has been resolved",
    time: "11:00 AM",
    date: "2025-12-15",
    unreadCount: 1,
  },
];

/* ---------------- DATE LABEL ---------------- */
const getDateLabel = (date) => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  if (date === today) return "Today";
  if (date === yesterday) return "Yesterday";
  return date;
};

const ChatsScreen = () => {
  const [chatList, setChatList] = useState(INITIAL_CHATS);
  const [filterVisible, setFilterVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  /* ---------------- DELETE ALL ---------------- */
  const deleteAllChats = () => {
    Alert.alert(
      "Delete All Chats",
      "Are you sure you want to delete all messages?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setChatList([]),
        },
      ]
    );
  };

  /* ---------------- FILTER BY DATE ---------------- */
  const filteredChats = selectedDate
    ? chatList.filter((c) => c.date === selectedDate)
    : chatList;

  /* ---------------- GROUP DATE WISE ---------------- */
  const groupedChats = filteredChats.reduce((acc, item) => {
    const label = getDateLabel(item.date);
    if (!acc[label]) acc[label] = [];
    acc[label].push(item);
    return acc;
  }, {});

  const dateKeys = Object.keys(groupedChats);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <CommonHeader
        title="Chat History"
        rightComponent={
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <Ionicons name="filter-outline" size={22} color="#fff" />
          </TouchableOpacity>
        }
      />

      {/* CHAT LIST */}
      <ScrollView contentContainerStyle={styles.list}>
        {dateKeys.length === 0 ? (
          <Text style={styles.emptyText}>No chats found</Text>
        ) : (
          dateKeys.map((date) => (
            <View key={date}>
              <Text style={styles.dateHeader}>{date}</Text>

              {groupedChats[date].map((item) => (
                <View key={item.id} style={styles.card}>
                  {/* AVATAR */}
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item.name.charAt(0)}
                    </Text>
                  </View>

                  {/* INFO */}
                  <View style={styles.chatInfo}>
                    <View style={styles.topRow}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>

                    <View style={styles.bottomRow}>
                      <Text
                        style={styles.lastMessage}
                        numberOfLines={1}
                      >
                        {item.lastMessage}
                      </Text>

                      {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadText}>
                            {item.unreadCount}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* WHATSAPP ICON */}
                  <FontAwesome
                    name="whatsapp"
                    size={22}
                    color="#25D366"
                  />
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* FILTER MODAL */}
      <Modal visible={filterVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setFilterVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.filterBox}>
            {/* DATE FILTER */}
            <TouchableOpacity
              style={styles.filterItem}
              onPress={() => {
                setFilterVisible(false);
                setCalendarVisible(true);
              }}
            >
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.filterText}>Filter by Date</Text>
            </TouchableOpacity>

            {/* DELETE ALL */}
            <TouchableOpacity
              style={styles.filterItem}
              onPress={() => {
                setFilterVisible(false);
                deleteAllChats();
              }}
            >
              <Ionicons
                name="trash-outline"
                sizeor
                size={18}
                color="#DC2626"
              />
              <Text style={[styles.filterText, { color: "#DC2626" }]}>
                Delete All Messages
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* CALENDAR MODAL */}
      <Modal visible={calendarVisible} transparent animationType="fade">
        <View style={styles.modalOverlayCenter}>
          <View style={styles.calendarBox}>
            <TouchableOpacity
              style={styles.modalCloseIcon}
              onPress={() => setCalendarVisible(false)}
            >
              <Ionicons name="close" size={22} />
            </TouchableOpacity>

            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setCalendarVisible(false);
              }}
              markedDates={
                selectedDate
                  ? {
                      [selectedDate]: {
                        selected: true,
                        selectedColor: colors.primary,
                      },
                    }
                  : {}
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatsScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  list: {
    padding: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  dateHeader: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textDark,
    marginVertical: 8,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
  },

  chatInfo: {
    flex: 1,
    marginRight: 6,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },

  time: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  lastMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    marginRight: 6,
  },

  unreadBadge: {
    backgroundColor: "#22C55E",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },

  unreadText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 90,
    paddingRight: 12,
  },

  filterBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 220,
    elevation: 6,
  },

  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
  },

  modalOverlayCenter: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  calendarBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },

  modalCloseIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
});
