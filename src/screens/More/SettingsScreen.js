import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import CommonHeader from "../../screens/More/CommonHeader";

const SettingsScreen = () => {
  const [pauseNotification, setPauseNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);

  const handleDeleteAccount = () => {
    console.log("Delete Account Pressed");
    // You can add confirmation alert here later
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      <CommonHeader title="Settings" />

      <View style={styles.body}>
        {/* Pause Notification */}
        <View style={styles.optionRow}>
          <View style={styles.leftRow}>
            <Ionicons name="notifications-off-outline" size={20} color={colors.primary} />
            <Text style={styles.optionText}>Pause Notifications</Text>
          </View>
          <Switch
            value={pauseNotification}
            onValueChange={(v) => setPauseNotification(v)}
            thumbColor={pauseNotification ? colors.primary : "#ccc"}
          />
        </View>

        {/* Email Notification */}
        <View style={styles.optionRow}>
          <View style={styles.leftRow}>
            <Ionicons name="mail-outline" size={20} color={colors.primary} />
            <Text style={styles.optionText}>Email Notifications</Text>
          </View>
          <Switch
            value={emailNotification}
            onValueChange={(v) => setEmailNotification(v)}
            thumbColor={emailNotification ? colors.primary : "#ccc"}
          />
        </View>

        {/* Biometric Authentication */}
        <View style={styles.optionRow}>
          <View style={styles.leftRow}>
            <Feather name="fingerprint" size={20} color={colors.primary} />
            <Text style={styles.optionText}>Biometric Authentication</Text>
          </View>
          <Switch
            value={biometricAuth}
            onValueChange={(v) => setBiometricAuth(v)}
            thumbColor={biometricAuth ? colors.primary : "#ccc"}
          />
        </View>

        {/* DELETE ACCOUNT */}
        <TouchableOpacity style={styles.deleteRow} onPress={handleDeleteAccount}>
          <MaterialIcons name="delete-outline" size={22} color="#FF3B30" />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.primary,
  },
  body: {
    padding: 18,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 3,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },

  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#ffe6e6",
  },
  deleteText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#FF3B30",
  },
});
