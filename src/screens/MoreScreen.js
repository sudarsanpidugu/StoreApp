import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import CommonHeader from "./More/CommonHeader";

const MoreScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonHeader title="More" />

      {/* OPTIONS LIST */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 18 }}>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("SettingsScreen")}>
          <Ionicons name="settings-outline" size={20} color={colors.primary} />
          <Text style={styles.optionText}>Settings</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("FaqScreen")}>
          <Feather name="help-circle" size={20} color={colors.primary} />
          <Text style={styles.optionText}>FAQs</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ContactScreen")}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <Text style={styles.optionText}>Contact Us</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("TermsScreen")}>
          <MaterialIcons name="policy" size={20} color={colors.primary} />
          <Text style={styles.optionText}>Terms & Conditions</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("PrivacyScreen")}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
          <Text style={styles.optionText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("RateUsScreen")}>
          <Ionicons name="star-outline" size={20} color={colors.primary} />
          <Text style={styles.optionText}>Rate Us</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ShareAppScreen")}>
          <Feather name="share-2" size={20} color={colors.primary} />
          <Text style={styles.optionText}>Share App</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#999" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.primary,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
  },

  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
});
