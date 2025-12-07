import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const slideAnim = useRef(new Animated.Value(-300)).current; // car slide
  const fadeText = useRef(new Animated.Value(0)).current;      // fade title
  const scaleText = useRef(new Animated.Value(0.7)).current;   // scale title
  const progress = useRef(new Animated.Value(0)).current;      // progress bar

  useEffect(() => {
    // Run Animations Parallel
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeText, {
        toValue: 1,
        duration: 1200,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleText, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 100,
        duration: 3000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      navigation.replace("Login");
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Animated.Image
        source={require("../../assets/Image/backgrounds/car.png")}
        style={[
          styles.logo,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      />

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeText,
            transform: [{ scale: scaleText }],
          },
        ]}
      >
        AutoStore
      </Animated.Text>

      <Text style={styles.loadingText}>Loading...</Text>

      {/* Progress bar */}
      <View style={styles.progressBackground}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",   // WHITE BACKGROUND
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  logo: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 0,
  },

  title: {
    fontSize: 42,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 10,
  },

  loadingText: {
    fontSize: 16,
    color: "#444",
    marginTop: 5,
    marginBottom: 25,
  },

  progressBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#E9E9E9",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
});
