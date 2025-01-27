import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Login" });
  }, [navigation]);

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
