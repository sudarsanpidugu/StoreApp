import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import CommonHeader from "./More/CommonHeader";
import CarOfferCard from "../components/CarOfferCard";

const StoreServicesScreen = () => {
    const navigation = useNavigation();

    return (
        <>
            <CommonHeader title={"Change Place"} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}

                {/* MAIN CARD */}
                <View style={styles.card}>
                    {/* STORE ID */}
                    <Text style={styles.cardTopText}>
                        CAR STORE ID • 10101011586822
                    </Text>

                    {/* PRIMARY SERVICE (LIKE AIRTEL BLACK) */}
                    {/* ================= ACTIVE PLAN ================= */}
                    <View style={styles.activePlanCard}>
                        <View style={styles.activeHeader}>
                            <Text style={styles.activeTitle}>Active Plan</Text>

                            <View style={styles.activeBadge}>
                                <Text style={styles.activeBadgeText}>ACTIVE</Text>
                            </View>
                        </View>

                        <Text style={styles.planName}>Car Store Premium</Text>

                        <View style={styles.planRow}>
                            <View>
                                <Text style={styles.planValue}>₹499</Text>
                                <Text style={styles.planLabel}>Price</Text>
                            </View>

                            <View>
                                <Text style={styles.planValue}>3 Months</Text>
                                <Text style={styles.planLabel}>Validity</Text>
                            </View>

                            <View>
                                <Text style={styles.planValue}>14 Days</Text>
                                <Text style={styles.planLabel}>Next Service</Text>
                            </View>
                        </View>

                        <Text style={styles.renewText}>
                            Renews on <Text style={{ fontWeight: "700" }}>28 Sep 2025</Text>
                        </Text>
                    </View>


                    {/* BILL INFO */}
                    <Text style={styles.billText}>
                        14 days left for next service
                    </Text>

                    <View style={styles.divider} />

                    {/* POSTPAID STYLE – CAR SERVICE */}
                    <TouchableOpacity
                        style={styles.serviceRow}
                        onPress={() => navigation.navigate("Bookings")}
                    >
                        <View style={styles.iconCircle}>
                            <Ionicons
                                name="calendar-outline"
                                size={18}
                                color={colors.primary}
                            />
                        </View>

                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceTitle}>Scheduled Services</Text>
                            <Text style={styles.serviceSub}>
                                3 upcoming • 1 pending
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={colors.gray}
                        />
                    </TouchableOpacity>

                    {/* DTH STYLE – CAR SUPPORT */}
                    <TouchableOpacity
                        style={styles.serviceRow}
                        onPress={() => navigation.navigate("Calls")}
                    >
                        <View style={styles.iconCircle}>
                            <Ionicons
                                name="call-outline"
                                size={18}
                                color={colors.primary}
                            />
                        </View>

                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceTitle}>Support Calls</Text>
                            <Text style={styles.serviceSub}>
                                24×7 assistance • 128 calls
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={colors.gray}
                        />
                    </TouchableOpacity>

                    {/* CHAT */}
                    <TouchableOpacity
                        style={styles.serviceRow}
                        onPress={() => navigation.navigate("Chats")}
                    >
                        <View style={styles.iconCircle}>
                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={18}
                                color={colors.primary}
                            />
                        </View>

                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceTitle}>Service Chats</Text>
                            <Text style={styles.serviceSub}>
                                54 unread messages
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={colors.gray}
                        />
                    </TouchableOpacity>

                    {/* ACTION BUTTONS */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.outlineBtn}  onPress={() => navigation.navigate("Plan")}>
                            <Text style={styles.outlineText}>Change Plan</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            style={styles.primaryBtn}
                            onPress={() => navigation.navigate("Plan")}
                        >
                            <Text style={styles.primaryText}>Manage Services</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>

                {/* <Text style={styles.sectionTitle}>Recommended Car Offers</Text>

                <CarOfferCard
                    badge="Car Care Combo"
                    price="279"
                    service="1 Service"
                    validity="1 Month"
                    benefits="Free car wash, oil check & interior cleaning"
                />

                <CarOfferCard
                    badge="Premium Maintenance"
                    price="349"
                    service="2 Services"
                    validity="28 Days"
                    benefits="Engine check, AC service & tyre inspection"
                />

                <CarOfferCard
                    badge="Unlimited Checkups"
                    price="499"
                    service="Unlimited"
                    validity="3 Months"
                    benefits="Priority support & free inspections"
                /> */}

            </ScrollView>
        </>
    );
};

export default StoreServicesScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.textDark,
    },

    card: {
        backgroundColor: colors.textLight,
        borderRadius: 20,
        padding: 16,
    },

    cardTopText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 12,
        fontWeight: "600",
    },

    /* ================= ACTIVE PLAN ================= */
    activePlanCard: {
        backgroundColor: colors.textLight,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.primary,
    },

    activeHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    activeTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.textDark,
    },

    activeBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    activeBadgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },

    planName: {
        fontSize: 16,
        fontWeight: "800",
        color: colors.textDark,
        marginBottom: 12,
    },

    planRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    planValue: {
        fontSize: 16,
        fontWeight: "800",
        color: colors.textDark,
        textAlign: "center",
    },

    planLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 2,
    },

    renewText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 6,
    },


    billText: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.textDark,
        marginVertical: 12,
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginBottom: 6,
    },

    serviceRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },

    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#EAF0FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    serviceInfo: {
        flex: 1,
    },

    serviceTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textDark,
    },

    serviceSub: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },

    buttonRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 16,
    },

    outlineBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.textDark,
        borderRadius: 22,
        paddingVertical: 10,
        alignItems: "center",
    },

    outlineText: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.textDark,
    },

    primaryBtn: {
        flex: 1,
        backgroundColor: "#000",
        borderRadius: 22,
        paddingVertical: 10,
        alignItems: "center",
    },

    primaryText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#fff",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.textDark,
        marginTop: 24,
        marginBottom: 12,
    },

});
