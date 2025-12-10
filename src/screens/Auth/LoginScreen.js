import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../constants/colors";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.card}>

          {/* Top Image */}
          <Image
            source={require("../../../assets/Image/backgrounds/car.png")}
            style={styles.headerImage}
          />

          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="call" size={22} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

         {/* <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>*/}

         {/* <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>*/}

          <TouchableOpacity onPress={() => navigation.navigate("OtpLogin")}>
            <LinearGradient
              colors={[colors.primary, colors.primary]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login /Register</Text>
            </LinearGradient>
          </TouchableOpacity>

        {/*  <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.loginText}>
              Don’t have an account? <Text style={styles.register}>Register</Text>
            </Text>
          </TouchableOpacity>*/}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 22,
    backgroundColor: colors.background,
  },
  card: {
    padding: 20,
  },
  headerImage: {
    width: 230,
    height: 130,
    alignSelf: "center",
    objectFit:"contain",
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
    color: colors.textSecondary,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginTop: 18,
    backgroundColor: colors.white,
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.textDark,
  },
  forgotContainer: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 30,
    elevation: 4,
  },
  buttonText: {
    color: colors.textLight,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 15,
    color: colors.textSecondary,
  },
  register: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
