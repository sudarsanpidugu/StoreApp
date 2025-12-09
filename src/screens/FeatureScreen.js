import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

const providers = [
  {
    id: "1",
    name: "Crystal Clear Car Wash",
    price: "$10",
    rating: 4.5,
    image: require("../../assets/Image/provider/p1.jpg"),
  },
  {
    id: "2",
    name: "AquaShine Car Wash",
    price: "$10",
    rating: 4.2,
    image: require("../../assets/Image/provider/p2.jpg"),
  },
  {
    id: "3",
    name: "Prestige Auto Spa",
    price: "$10",
    rating: 4.8,
    image: require("../../assets/Image/provider/p3.jpg"),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Nearby Service Providers</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {providers.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ServiceDetails", { provider: item })}
          >
            <Image source={item.image} style={styles.cardImage} />

            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={styles.ratingRow}>
              <FontAwesome name="star" size={12} color="#FFB000" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>

            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    paddingVertical: 10,
  },
  bannerContainer: {
    width: "100%",
    height: 180,
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textDark,
    marginLeft: 12,
    marginBottom: 10,
  },
  card: {
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  cardImage: {
    width: "100%",
    height: 65,
    borderRadius: 10,
    marginBottom: 6,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 4,
    lineHeight: 16,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  ratingText: {
    fontSize: 11,
    marginLeft: 4,
    fontWeight: "600",
    color: "#444",
  },

  priceTag: {
    backgroundColor: "#E8F9E7",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  priceText: {
    fontSize: 12,
    fontWeight: "700",
    color: "green",
  },
});
