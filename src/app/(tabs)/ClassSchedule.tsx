import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ClassSchedule = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Class Schedule</Text>
    </SafeAreaView>
  );
};

export default ClassSchedule;
