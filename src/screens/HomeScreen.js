import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Header from "../components/Header";
import colors from "../constants/colors";
import BannerSlider from "./BannerSlider";
import ActionStatsCards from "./ActionStatsCards";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        data={[1]} 
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={
          <>
            <BannerSlider />
            <ActionStatsCards />
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
