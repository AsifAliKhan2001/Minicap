import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

// SWG Campus Map Component
const SWGCampusMap = () => {
  const SWGCampus = {
    latitude: 45.4973,
    longitude: -73.5789,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView style={styles.map} initialRegion={SWGCampus}>
      <Marker coordinate={SWGCampus} title="SWG Campus" />
    </MapView>
  );
};

// Loyola Campus Map Component
const LoyolaCampusMap = () => {
  const LoyolaCampus = {
    latitude: 45.4581,
    longitude: -73.6405,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView style={styles.map} initialRegion={LoyolaCampus}>
      <Marker coordinate={LoyolaCampus} title="Loyola Campus" />
    </MapView>
  );
};

// Parent Component that Switches Between Maps
const CampusSwitcher = () => {
  const [isSWGCampus, setIsSWGCampus] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>SWG Campus</Text>
        <Switch
          value={!isSWGCampus}
          onValueChange={() => setIsSWGCampus(!isSWGCampus)}
        />
        <Text>Loyola Campus</Text>
      </View>
      {isSWGCampus ? <SWGCampusMap /> : <LoyolaCampusMap />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    position: "absolute",
    top: 10,
    left: "33%",
    transform: [{ translateX: -50 }],
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CampusSwitcher;
