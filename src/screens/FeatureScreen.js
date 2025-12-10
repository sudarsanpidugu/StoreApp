import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const providers = [
  {
    id: "1",
    name: "Crystal Clear Car Wash",
    desc: "We offer a variety of washes.",
    distance: "1.5 km",
    rating: 4.5,
    image: require("../../assets/Image/provider/p1.jpg"),
  },
  {
    id: "2",
    name: "AquaShine Car Wash",
    desc: "We offer a variety of washes.",
    distance: "2.3 km",
    rating: 4.7,
    image: require("../../assets/Image/provider/p2.jpg"),
  },
  {
    id: "3",
    name: "Prestige Auto Spa",
    desc: "We offer a variety of washes.",
    distance: "3.0 km",
    rating: 4.8,
    image: require("../../assets/Image/provider/p3.jpg"),
  },
];

const FeatureScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby Car Service Centers</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {providers.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.cardImg} />

            <View style={styles.content}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>

              <Text style={styles.desc} numberOfLines={1}>
                {item.desc}
              </Text>

              <View style={styles.row}>
                <Ionicons name="location" size={12} color="#007AFF" />
                <Text style={styles.distance}>{item.distance}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeatureScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 11,
  },

  // Compact card size
  card: {
    width: 125,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    marginVertical:5
  },

  cardImg: {
    width: "100%",
    height: 80, // small image
  },

  content: {
    padding: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },

  desc: {
    fontSize: 11,
    color: "#777",
    marginTop: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  distance: {
    fontSize: 11,
    color: "#444",
    marginLeft: 3,
  },

  rating: {
    fontSize: 11,
    color: "#444",
    fontWeight: "600",
    marginLeft: 3,
  },
});
