import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

const OtpLoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(true);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Countdown timer
  useEffect(() => {
    let interval = null;
    if (otpSent && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, canResend]);

  const handleSendOtp = () => {
    if (mobile.length < 10) return alert("Enter valid mobile number");
    setOtpSent(true);
    setTimer(30);
    setCanResend(false);
  };

const handleVerify = () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length < 4) {
    alert("Please enter valid 4 digit OTP");
    return;
  }

  if (enteredOtp !== "1234") {
    alert("Invalid OTP, try again");
    return;
  }

  console.log("Verified OTP:", enteredOtp);
  navigation.navigate("Signup"); 
};


  const handleOTPChange = (value, index) => {
    if (!/^[0-9]$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/Image/backgrounds/car.png")}
        style={styles.background}
        resizeMode="contain"
      >
        <View style={styles.overlay} />

        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={styles.title}>OTP Login</Text>

          {otpSent && (
            <Text style={styles.otpMessage}>
              OTP sent to {mobile.slice(0, 2)}******{mobile.slice(-2)}
            </Text>
          )}

          {!otpSent && (
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={22} color={colors.primary} />
              <TextInput
                style={styles.input}
                placeholder="Mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
                placeholderTextColor="#999"
              />
            </View>
          )}

          {otpSent && (
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleOTPChange(value, index)}
                />
              ))}
            </View>
          )}

          {otpSent && (
            <View style={styles.resendRow}>
              <TouchableOpacity disabled={!canResend} onPress={handleSendOtp}>
                <Text style={[styles.resendText, { opacity: canResend ? 1 : 0.4 }]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>

              {!canResend && (
                <Text style={styles.timerText}>00:{timer < 10 ? `0${timer}` : timer}</Text>
              )}
            </View>
          )}

          <TouchableOpacity onPress={() => (otpSent ? handleVerify() : handleSendOtp())}>
            <LinearGradient colors={[colors.primary, colors.primary]} style={styles.button}>
              <Text style={styles.buttonText}>
                {otpSent ? "Verify OTP" : "Send OTP"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OtpLoginScreen;

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  container: { flex: 1, justifyContent: "center", padding: 22 },
  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    color: colors.primary,
    marginBottom: 5,
  },
  otpMessage: {
    textAlign: "center",
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 15,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    height: 52,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10, color: colors.textDark },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: colors.primary,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  resendText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  timerText: { fontSize: 14, fontWeight: "600", color: colors.textDark },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 30,
    elevation: 8,
  },
  buttonText: {
    color: colors.textLight,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
