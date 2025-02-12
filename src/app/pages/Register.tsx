import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, router } from "expo-router";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Registration successful!");
      router.push("/pages/Login");
    }, 2000);
  };

  useEffect(() => {
    navigation.setOptions({ title: "Register" });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <Text style={styles.registerTitle}>Student Registration</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputGroup}>
          <FontAwesome name="user" size={20} color="rgba(0, 0, 0, 0.7)" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="envelope" size={20} color="rgba(0, 0, 0, 0.7)" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="lock" size={20} color="rgba(0, 0, 0, 0.7)" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="lock" size={20} color="rgba(0, 0, 0, 0.7)" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.registerButtonText}>{loading ? "Registering..." : "Register"}</Text>
        </TouchableOpacity>

        <View style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLinkText} onPress={() => router.push("/pages/Login")}>
              Login here
            </Text>
          </Text>
        </View>
      </BlurView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  blurContainer: {
    width: "90%",
    maxWidth: 420,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 30,
    overflow: "hidden",
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    color: "#000",
  },
  registerButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  loginLink: {
    alignItems: "center",
  },
  loginText: {
    color: "#000",
  },
  loginLinkText: {
    color: "#007BFF",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});