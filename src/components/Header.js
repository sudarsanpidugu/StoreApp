import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />

            <LinearGradient
                colors={["#0066FF", "#7abbfcff"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.wrapper}
            >
                <View style={styles.row}>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-outline" size={22} color={colors.textLight} />
                        <Text style={styles.locationText}>Hyderabad</Text>
                    </View>

                    {/* 🔔 Bell Navigation */}
                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name="notifications-outline" size={26} color={colors.textLight} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color={colors.primary} />
                    <TextInput
                        placeholder="Search products, services..."
                        placeholderTextColor={colors.gray}
                        style={styles.searchInput}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Header;


const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#0066FF",
    },
    wrapper: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,  // FIX
        paddingVertical: 14,
        paddingHorizontal: 18,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    locationText: {
        color: colors.textLight,
        fontSize: 18,
        fontWeight: "600",
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background,
        borderRadius: 40,
        paddingHorizontal: 12,
        marginTop: 15,
        height: 48,
    },
    searchInput: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 16,
        color: colors.textDark,
    },
});
