import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Header from "../components/Header";
import colors from "../constants/colors";
import BannerSlider from "./BannerSlider";
import ServicesScreen from "./ServicesScreen";
import PopularServiceProviders from "./PopularServiceProvider";
import FeatureScreen from "./FeatureScreen";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        data={[1]}  // dummy item to enable FlatList
        keyExtractor={(item) => item.toString()}
        renderItem={() => <PopularServiceProviders />}
        ListHeaderComponent={
          <>
            <BannerSlider />
            <FeatureScreen />
            <ServicesScreen />
          </>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
