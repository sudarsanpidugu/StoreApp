import React, { useContext, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { LocationContext } from "../../constants/LocationContext";

const { height } = Dimensions.get("window");

/* ---------------- FALLBACK LOCATION ---------------- */
const FALLBACK_LOCATION = {
    title: "Hyderabad",
    address: "Hyderabad, Telangana",
    latitude: 17.385044,
    longitude: 78.486671,
};

/* ---------------- CAR SERVICE CENTERS ---------------- */
const CAR_STORES = [
    {
        id: 1,
        name: "Car Care Hub",
        latitude: 17.3883,
        longitude: 78.4747,
    },
    {
        id: 2,
        name: "Auto Shine Service",
        latitude: 17.3792,
        longitude: 78.4876,
    },
    {
        id: 3,
        name: "Speedy Car Wash",
        latitude: 17.3921,
        longitude: 78.4912,
    },
];

/* ---------------- DISTANCE HELPER ---------------- */
const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const BookingDetailsScreen = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const mapRef = useRef(null);
    const { location } = useContext(LocationContext);
    const [isAccepted, setIsAccepted] = useState(false);

    const finalLocation = {
        ...FALLBACK_LOCATION,
        ...location,
    };

    const latitude = Number(finalLocation.latitude);
    const longitude = Number(finalLocation.longitude);

    /* -------- FIND NEAREST STORE -------- */
    const nearestStore = CAR_STORES.reduce((nearest, store) => {
        const dist = getDistanceKm(
            latitude,
            longitude,
            store.latitude,
            store.longitude
        );
        if (!nearest || dist < nearest.distance) {
            return { ...store, distance: dist };
        }
        return nearest;
    }, null);

    /* -------- LOCATE BUTTON -------- */
    const handleLocatePress = () => {
        mapRef.current?.animateToRegion(
            {
                latitude,
                longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            },
            800
        );
    };

    return (
        <View style={styles.container}>
            {/* STATUS BAR */}
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />


            {/* MAP */}
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* USER */}
                <Marker coordinate={{ latitude, longitude }}>
                    <Ionicons name="location" size={28} color={colors.primary} />
                </Marker>

                {/* STORES */}
                {CAR_STORES.map((store) => (
                    <Marker
                        key={store.id}
                        coordinate={{
                            latitude: store.latitude,
                            longitude: store.longitude,
                        }}
                    >
                        <View style={styles.storeMarker}>
                            <Ionicons name="car-sport-outline" size={18} color="#fff" />
                        </View>
                    </Marker>
                ))}

                {/* ROUTE */}
                {nearestStore && (
                    <Polyline
                        coordinates={[
                            { latitude, longitude },
                            {
                                latitude: nearestStore.latitude,
                                longitude: nearestStore.longitude,
                            },
                        ]}
                        strokeColor={colors.primary}
                        strokeWidth={4}
                    />
                )}
            </MapView>

            {/* BACK */}
            <SafeAreaView style={styles.backWrapper}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={22} color={colors.textDark} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* MAP ICON */}
            <View style={styles.mapIcons}>
                <TouchableOpacity
                    style={styles.mapIconBtn}
                    onPress={handleLocatePress}
                >
                    <Ionicons name="locate-outline" size={20} />
                </TouchableOpacity>
            </View>

            {/* BOTTOM CARD */}
            <View
                style={[
                    styles.bottomCard,
                    { paddingBottom: insets.bottom + 14 },
                ]}
            >
                {/* DRIVER */}
                <View style={styles.driverRow}>
                    <Image
                        source={require("../../../assets/Image/provider/p1.jpg")}
                        style={styles.avatar}
                    />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.driverName}>Jonathan Higgins</Text>
                        <Text style={styles.rating}>⭐ 4.8 (127)</Text>
                    </View>
                </View>

                {/* VEHICLE */}
                <View style={styles.infoRow}>
                    <Ionicons
                        name="car-sport-outline"
                        size={18}
                        color={colors.primary}
                    />
                    <Text style={styles.infoText}>
                        CLMV069 • Blue Tesla Diesel Taxi
                    </Text>
                </View>

                {/* LOCATION */}
                <View style={styles.locationCard}>
                    <View style={styles.locationLeft}>
                        <View style={styles.locationDot} />
                        <View>
                            <Text style={styles.locationTitle}>
                                {finalLocation.title}
                            </Text>
                            <Text style={styles.locationSub}>
                                {finalLocation.address}
                            </Text>

                            {nearestStore && (
                                <Text style={styles.distanceText}>
                                    Nearest service: {nearestStore.name} •{" "}
                                    {nearestStore.distance.toFixed(1)} km
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* CHANGE LOCATION */}
                {/* <TouchableOpacity
                    style={styles.changeLocationBtn}
                    onPress={() => navigation.navigate("Explore")}
                >
                    <Ionicons
                        name="location-outline"
                        size={18}
                        color={colors.primary}
                    />
                    <Text style={styles.changeLocationText}>
                        Change location
                    </Text>
                </TouchableOpacity> */}

                {/* ACTION BUTTON */}
                <View style={styles.actionRow}>
                    {!isAccepted ? (
                        <TouchableOpacity
                            style={styles.acceptBtn}
                            onPress={() => setIsAccepted(true)}
                        >
                            <Text style={styles.btnText}>Accept</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.completedBtn}
                            onPress={() => navigation.navigate("BookingHistory")}
                        >
                            <Text style={styles.btnText}>Completed</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default BookingDetailsScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: { flex: 1 },

    backWrapper: { position: "absolute", top: 0, left: 12 },

    backBtn: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 12,
        elevation: 4,
    },

    mapIcons: {
        position: "absolute",
        right: 12,
        top: height * 0.55,
    },

    mapIconBtn: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 12,
        elevation: 3,
    },

    storeMarker: {
        backgroundColor: colors.secondary,
        padding: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#fff",
    },

    bottomCard: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        padding: 16,
        elevation: 12,
    },

    driverRow: { flexDirection: "row", alignItems: "center" },

    avatar: { width: 44, height: 44, borderRadius: 22 },

    driverName: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.textDark,
    },

    rating: { fontSize: 12, color: colors.textSecondary },

    infoRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },

    infoText: {
        marginLeft: 8,
        fontWeight: "600",
        color: colors.textDark,
    },

    locationCard: {
        backgroundColor: colors.background,
        borderRadius: 16,
        padding: 14,
        marginTop: 14,
        borderWidth: 1,
        borderColor: colors.gray,
    },

    locationLeft: { flexDirection: "row", alignItems: "flex-start" },

    locationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
        marginTop: 6,
        marginRight: 12,
    },

    locationTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.textDark,
    },

    locationSub: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 4,
        lineHeight: 18,
    },

    distanceText: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "600",
        color: colors.secondary,
    },

    changeLocationBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: "#F0F6FF",
    },

    changeLocationText: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.primary,
    },

    actionRow: { marginTop: 16 },

    acceptBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },

    completedBtn: {
        backgroundColor: "#16A34A",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },

    btnText: { color: "#fff", fontWeight: "800" },
});
