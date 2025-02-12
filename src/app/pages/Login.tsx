import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
// Import UserViewModel methods 
import { UserViewModel } from "@/viewmodels/UserViewModel";

const Login = () => {
  const navigation = useNavigation();
  const [identifier, setIdentifier] = useState(""); // Handles both Student ID or Email
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Create an instance of UserViewModel
  const userViewModel = new UserViewModel();


  // Handle form submission

  const handleSubmit = async () => {
    if (!identifier || !password) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      const { user, token } = await userViewModel.login(identifier, password);
      console.log("Login successful:", { user, token });
  
      // Save the token (e.g., in AsyncStorage or SecureStore)
      // await SecureStore.setItemAsync("token", token);
  
      // Navigate to the home screen
      // navigation.navigate("Home");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message); // Show error to the user
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: "Login" });
  }, [navigation]);

  const handleSubmit = () => {
    // Add your login logic here
    console.log("Login submitted:", { identifier, password, rememberMe });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Blurred Container */}
      <BlurView intensity={20} style={styles.blurContainer}>
        <Text style={styles.loginTitle}>Student Login</Text>

        {/* Unified Input Field */}
        <View style={styles.inputGroup}>
          <FontAwesome
            name="user" // Changed from "id-badge"
            size={20}
            color="rgba(0, 0, 0, 0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Student ID or Email" // Updated placeholder
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={identifier} 
            onChangeText={setIdentifier} 
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <FontAwesome
            name="lock"
            size={20}
            color="rgba(0, 0, 0, 0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={styles.checkboxGroup}>
          <TouchableOpacity
            style={styles.rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <FontAwesome name="check" size={12} color="#fff" />}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Forgot password pressed")}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <View style={styles.registerLink}>
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.registerLinkText} onPress={() => console.log("Register pressed")}>
              Register here
            </Text>
          </Text>
        </View>
      </BlurView>
    </ScrollView>
  );
};

export default Login;

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
  loginTitle: {
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
  checkboxGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  rememberMeText: {
    color: "#000",
  },
  forgotPassword: {
    color: "#000",
    textDecorationLine: "underline",
  },
  loginButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  registerLink: {
    alignItems: "center",
  },
  registerText: {
    color: "#000",
  },
  registerLinkText: {
    color: "#007BFF",
    fontWeight: "600",
  },
});