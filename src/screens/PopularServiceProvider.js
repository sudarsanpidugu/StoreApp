import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

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

const PopularServiceProviders = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ServiceDetails", { provider: item })} // navigate here
    >
      <Image source={item.image} style={styles.image} />

      <View style={styles.midContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc}>{item.desc}</Text>

        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome
              key={i}
              name="star"
              size={14}
              color={i < Math.floor(item.rating) ? "#FFD700" : "#E0E0E0"}
            />
          ))}
        </View>
      </View>

      {/* Distance + Location Icon */}
      <View style={styles.locationWrapper}>
        <Entypo name="location-pin" size={20} color={colors.primary} />
        <Text style={styles.distanceText}>{item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Service Providers</Text>

      <FlatList
        data={providers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PopularServiceProviders;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: colors.textDark,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  midContent: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },
  desc: {
    fontSize: 12,
    color: "#777",
    marginVertical: 3,
  },
  ratingRow: {
    flexDirection: "row",
  },

  /* LOCATION SECTION */
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
    marginLeft: 2,
  },
});
