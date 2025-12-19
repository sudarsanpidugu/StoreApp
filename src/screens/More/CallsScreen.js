import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import colors from "../../constants/colors";
import CommonHeader from "./CommonHeader";

/* ---------------- INITIAL CALL DATA ---------------- */
const INITIAL_CALLS = [
  {
    id: "1",
    name: "Ravi Kumar",
    phone: "+91 98765 43210",
    type: "incoming",
    time: "10:45 AM",
    date: "2025-12-16",
  },
  {
    id: "2",
    name: "Amit Sharma",
    phone: "+91 91234 56789",
    type: "outgoing",
    time: "04:20 PM",
    date: "2025-12-16",
  },
  {
    id: "3",
    name: "Service Support",
    phone: "+91 80000 11111",
    type: "missed",
    time: "11:10 AM",
    date: "2025-12-15",
  },
];

/* ---------------- CALL TYPE CONFIG ---------------- */
const callTypeConfig = {
  incoming: { label: "Incoming", color: "#16A34A" },
  outgoing: { label: "Outgoing", color: "#2563EB" },
  missed: { label: "Missed", color: "#DC2626" },
};

const CallsScreen = () => {
  const [callList, setCallList] = useState(INITIAL_CALLS);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [lastDeletedDate, setLastDeletedDate] = useState(null);

  /* ---------------- DELETE HANDLER ---------------- */
  const handleDelete = (item) => {
    setCallList((prev) => prev.filter((c) => c.id !== item.id));
    setLastDeletedDate(item.date);
  };

  /* ---------------- FILTER BY CALENDAR ---------------- */
  const filteredCalls = selectedDate
    ? callList.filter((item) => item.date === selectedDate)
    : callList;

  /* ---------------- GROUP CALLS DATE-WISE ---------------- */
  const groupedCalls = filteredCalls.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedCalls).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <CommonHeader
        title="Call History"
        rightComponent={
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <Ionicons name="calendar-outline" size={22} color="#fff" />
          </TouchableOpacity>
        }
      />

      {/* LAST DELETED DATE */}
      {lastDeletedDate && (
        <View style={styles.deletedInfo}>
          <Ionicons name="calendar-outline" size={14} color={colors.primary} />
          <Text style={styles.deletedText}>
            Last deleted call date: {lastDeletedDate}
          </Text>
        </View>
      )}

      {/* CALL LIST (DATE WISE) */}
      <ScrollView contentContainerStyle={styles.list}>
        {sortedDates.length === 0 ? (
          <Text style={styles.emptyText}>No calls found</Text>
        ) : (
          sortedDates.map((date) => (
            <View key={date}>
              {/* DATE HEADER */}
              <Text style={styles.dateHeader}>{date}</Text>

              {groupedCalls[date].map((item) => {
                const type = callTypeConfig[item.type];

                return (
                  <View key={item.id} style={styles.card}>
                    {/* BIG RED DELETE ICON */}
                    <TouchableOpacity
                      style={styles.deleteIcon}
                      onPress={() => handleDelete(item)}
                    >
                      <Ionicons
                        name="trash"
                        size={26}
                        color="#DC2626"
                      />
                    </TouchableOpacity>

                    {/* TOP ROW */}
                    <View style={styles.topRow}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {item.name.charAt(0)}
                        </Text>
                      </View>

                      <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.phone}>{item.phone}</Text>
                      </View>
                    </View>

                    {/* BOTTOM ROW */}
                    <View style={styles.bottomRow}>
                      <View style={styles.callType}>
                        <Ionicons
                          name="call-outline"
                          size={14}
                          color={type.color}
                        />
                        <Text
                          style={[styles.callLabel, { color: type.color }]}
                        >
                          {type.label}
                        </Text>
                      </View>

                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))
        )}
      </ScrollView>

      {/* CALENDAR MODAL */}
      <Modal visible={calendarVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.calendarBox}>
            <TouchableOpacity
              style={styles.modalCloseIcon}
              onPress={() => setCalendarVisible(false)}
            >
              <Ionicons name="close" size={22} color={colors.textDark} />
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

export default CallsScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  list: {
    padding: 16,
  },

  dateHeader: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textDark,
    marginVertical: 8,
  },

  deletedInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    marginHorizontal: 16,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },

  deletedText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
  },

  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },

  phone: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  callType: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  callLabel: {
    fontSize: 12,
    fontWeight: "600",
  },

  time: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
  },

  modalOverlay: {
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
