import React, { useState, useRef, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const CampusMap = () => {
  const [isSWGCampus, setIsSWGCampus] = useState(true);
  const mapRef = useRef<MapView | null>(null);

  const SWGCampus = {
    latitude: 45.4973,
    longitude: -73.5789,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const LoyolaCampus = {
    latitude: 45.4581,
    longitude: -73.6405,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    const campus = isSWGCampus ? SWGCampus : LoyolaCampus;
    if (mapRef.current) {
      mapRef.current.animateToRegion(campus, 1000);
    }
  }, [isSWGCampus]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={(ref) => (mapRef.current = ref)}
        style={styles.map}
        initialRegion={isSWGCampus ? SWGCampus : LoyolaCampus}
        zoomEnabled={true}
        zoomControlEnabled={true}
      >
        <Marker
          coordinate={isSWGCampus ? SWGCampus : LoyolaCampus}
          title={isSWGCampus ? "SWG Campus" : "Loyola Campus"}
        />
      </MapView>
      <View style={styles.switchContainer}>
        <Text>SWG Campus</Text>
        <Switch
          value={!isSWGCampus}
          onValueChange={() => setIsSWGCampus(!isSWGCampus)}
        />
        <Text>Loyola Campus</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
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
  },
  map: {
    flex: 1,
  },
});

export default CampusMap;
