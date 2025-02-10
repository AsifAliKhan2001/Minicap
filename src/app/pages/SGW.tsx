import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

const SGW = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: "SWG" });
  }, [navigation]);

  return (
    <View>
      <Text>SGW</Text>
    </View>
  );
};

export default SGW;
