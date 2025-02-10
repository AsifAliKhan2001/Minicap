import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", alignItems: "center" }}>
        Welcome to {"\n"}
        the Concordia{"\n"}
        Student Navigation App
      </Text>
    </SafeAreaView>
  );
};

export default Home;
