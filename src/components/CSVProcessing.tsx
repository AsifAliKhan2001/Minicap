import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { readString } from "react-native-csv";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Building } from "../viewmodels/Building"; // Import Building interface

const CSVProcessing = () => {
  // ✅ Use correct type for useState
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const asset = Asset.fromModule(
          require("../../assets/BUILDING_LIST.csv")
        );
        await asset.downloadAsync();

        if (!asset.localUri) throw new Error("CSV file path is undefined");

        console.log("CSV File URI:", asset.localUri); // Debug log

        const csvData = await FileSystem.readAsStringAsync(asset.localUri);
        console.log("CSV Data Loaded:", csvData.substring(0, 200)); // Debug log

        // ✅ Now parse the CSV after ensuring data is available
        readString(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result: { data: Building[] }) => {
            setBuildings(result.data.slice(0, 5)); // ✅ Show only the first 5 buildings
          },
        });
      } catch (error) {
        console.error("❌ Error reading CSV file:", error);
      }
    };

    loadCSV();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Buildings</Text>
      <FlatList
        data={buildings}
        keyExtractor={(item) => item.Building}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.heading}>{item.BuildingName}</Text>
            <Text>Campus: {item.Campus}</Text>
            <Text>Address: {item.Address}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffffff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#000" },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  heading: { fontSize: 18, fontWeight: "bold", color: "#000" },
});

export default CSVProcessing;
