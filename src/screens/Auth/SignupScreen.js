import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSignup = () => {
    navigation.navigate("Main");
  }
  const handleVerifyOtp = () => {
    setShowOtpModal(false);
    navigation.navigate("Main");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          {/* TOP IMAGE */}
          <Image
            source={require("../../../assets/Image/backgrounds/car.png")}
            style={styles.headerImage}
          />

          <Text style={styles.title}>Additional Details</Text>
          <Text style={styles.subtitle}>Fill your information below</Text>

          {/* FULL NAME */}
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={22} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.inputField}
              placeholder="Full Name"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* VEHICLE NUMBER */}
          <View style={styles.inputRow}>
            <Ionicons name="car-outline" size={22} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.inputField}
              placeholder="Vehicle Number"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* EMAIL */}
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={22} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
            />
          </View>




          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/*  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>*/}
        </View>
      </ScrollView>

      {/* OTP Modal */}
      <Modal visible={showOtpModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowOtpModal(false)}>
              <Ionicons name="close-circle" size={32} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Verification Code</Text>
            <Text style={styles.modalSubtitle}>Enter the OTP sent to your phone</Text>

            <TextInput
              style={styles.otpInput}
              placeholder="••••"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(v) => setOtp(v)}
            />

            <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyOtp}>
              <Text style={styles.verifyText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  card: {
    padding: 20,
  },

  headerImage: {
    width: 230,
    height: 130,
    alignSelf: "center",
    objectFit: "contain",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.textDark,
    marginBottom: 25,
  },

  input: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: colors.textLight,
    color: colors.textDark,
  },

  icon: {
    marginRight: 10,
  },

  inputRow: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.textLight,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: colors.textDark,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: colors.textLight,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  loginText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    color: colors.textDark,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "85%",
    backgroundColor: colors.textLight,
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textDark,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    width: "50%",
    padding: 14,
    fontSize: 22,
    borderRadius: 10,
    textAlign: "center",
    color: colors.textDark,
    marginBottom: 22,
  },
  verifyBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  verifyText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: "bold",
  },
});
