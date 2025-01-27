import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

const Loyola = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Loyola" });
  }, [navigation]);

  return (
    <View>
      <Text>Loyola</Text>
    </View>
  );
};

export default Loyola;
