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
import colors from "../constants/colors";
import CommonHeader from "../screens/More/CommonHeader";

const dummyNotifications = [
    {
        id: 1,
        title: "Booking Confirmed",
        message: "Your exterior wash appointment is confirmed.",
        time: "Just Now",
        icon: "checkmark-done-circle-outline",
        unread: true,
    },
    {
        id: 2,
        title: "Offer Alert!",
        message: "Get 20% OFF on full body wash this weekend.",
        time: "2 hours ago",
        icon: "pricetag-outline",
        unread: true,
    },
    {
        id: 3,
        title: "Service Completed",
        message: "Your car wash service is completed successfully.",
        time: "1 day ago",
        icon: "car-outline",
        unread: false,
    },
];

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState(dummyNotifications);
    const [menuVisible, setMenuVisible] = useState(false);

    const markAllRead = () => {
        setNotifications(
            notifications.map((n) => ({ ...n, unread: false }))
        );
        setMenuVisible(false);
    };

    const deleteAll = () => {
        setNotifications([]);
        setMenuVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* HEADER WITH 3 DOT BUTTON */}
            <CommonHeader
                title="Notifications"
                rightComponent={
                    <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />


            {/* DROPDOWN MENU */}
            <Modal visible={menuVisible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menuBox}>
                        <TouchableOpacity style={styles.menuItem} onPress={markAllRead}>
                            <Text style={styles.menuText}>Mark all as Read</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={deleteAll}>
                            <Text style={[styles.menuText, { color: "red" }]}>Delete All</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* NOTIFICATION LIST */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {notifications.length === 0 ? (
                    <View style={{ alignItems: "center", marginTop: 80 }}>
                        <Ionicons name="notifications-off-circle" size={60} color="#ccc" />
                        <Text style={{ marginTop: 10, fontSize: 16, color: "#777" }}>
                            No Notifications
                        </Text>
                    </View>
                ) : (
                    notifications.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.card}>
                            <View style={styles.leftIcon}>
                                <Ionicons name={item.icon} size={26} color={colors.primary} />
                            </View>

                            <View style={styles.content}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    {item.unread && <View style={styles.unreadDot} />}
                                </View>

                                <Text style={styles.message}>{item.message}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: "flex-end",
        paddingTop: 60,
        paddingRight: 14,
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    menuBox: {
        width: 160,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 8,
        paddingVertical: 6,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    menuText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 14,
        marginTop: 12,
        padding: 14,
        borderRadius: 14,
        elevation: 3,
    },
    leftIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#e6f1ff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    content: { flex: 1 },
    title: { fontSize: 15, fontWeight: "700", color: "#000" },
    message: { fontSize: 13, color: "#666", marginTop: 2 },
    time: { fontSize: 12, color: "#999", marginTop: 4 },
    unreadDot: {
        width: 9,
        height: 9,
        backgroundColor: colors.primary,
        borderRadius: 6,
        marginLeft: 6,
    },
});
