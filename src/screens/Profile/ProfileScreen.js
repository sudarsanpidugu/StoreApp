import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [imageModal, setImageModal] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#0066FF", "#7abbfcff"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => setImageModal(true)}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../../../assets/Image/profile/user.png")}
              style={styles.avatar}
            />
            <View style={styles.editIcon}>
              <Ionicons name="camera-outline" size={18} color={colors.textLight} />
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>Dip Mondal</Text>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={18} color={colors.textLight} />
          <Text style={styles.infoText}>(+91) 123456</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={18} color={colors.textLight} />
          <Text style={styles.infoText}>mail@test.com</Text>
        </View>
      </LinearGradient>

      {/* Scroll Items */}
      <ScrollView style={styles.body}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Editprofile")}>
          <FontAwesome5 name="user-edit" size={18} color={colors.primary} />
          <Text style={styles.optionText}>Edit Profile</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.gray} />
        </TouchableOpacity>


        {/* <TouchableOpacity style={styles.option}>
          <Ionicons name="lock-closed-outline" size={18} color={colors.primary} />
          <Text style={styles.optionText}>Change Password</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.gray} />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("BookingHistory")}>
          <Ionicons name="receipt-outline" size={18} color={colors.primary} />
          <Text style={styles.optionText}>Booking History</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.gray} />
        </TouchableOpacity>
      </ScrollView>

      {/* Logout bottom fixed */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#ff4d4d" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Image upload modal */}
      <Modal visible={imageModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setImageModal(false)}
            >
              <Ionicons name="images-outline" size={22} color={colors.primary} />
              <Text style={styles.modalText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setImageModal(false)}
            >
              <Ionicons name="camera-outline" size={22} color={colors.primary} />
              <Text style={styles.modalText}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, { borderTopWidth: 1, borderColor: "#ddd" }]}
              onPress={() => setImageModal(false)}
            >
              <Text style={[styles.modalText, { color: "red" }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },

  avatarWrapper: { position: "relative", marginTop: 15 },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.textLight,
  },

  editIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: colors.secondary,
    padding: 6,
    borderRadius: 20,
  },

  name: { marginTop: 10, fontSize: 22, fontWeight: "700", color: colors.textLight },

  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },

  infoText: { marginLeft: 6, fontSize: 14, color: colors.textLight },

  body: { padding: 20, flex: 1 },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.textLight,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: colors.textDark,
  },

  logoutContainer: {
    padding: 18,
    backgroundColor: colors.background,
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#ffe6e6",
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff4d4d",
    marginLeft: 8,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  modalText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
  },
});
