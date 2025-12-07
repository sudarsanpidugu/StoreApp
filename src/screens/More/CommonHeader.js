// CommonHeader.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const CommonHeader = ({ title, rightComponent }) => {
  const navigation = useNavigation();

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <LinearGradient
        colors={[colors.primary, "#4ca3ff"]}
        style={styles.headerGradient}
      >
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>

          {/* RIGHT SIDE BUTTON */}
          <View style={{ width: 30, alignItems: "flex-end" }}>
            {rightComponent ? rightComponent : null}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  headerGradient: {
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginLeft: -12,
  },
});
