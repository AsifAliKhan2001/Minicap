import React, { useState, useRef, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

// Define TypeScript Interface for Props
interface CampusMapProps {
  campus: Region;
  title: string;
}

// Campus Coordinates with Type Safety
const SWGCampus: Region = {
  latitude: 45.4973,
  longitude: -73.5789,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const LoyolaCampus: Region = {
  latitude: 45.4581,
  longitude: -73.6405,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

// Reusable Map Component
const CampusMap: React.FC<CampusMapProps> = ({ campus, title }) => {
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(campus, 1000); // Smooth transition on switch
    }
  }, [campus]);

  return (
    <MapView
      ref={(ref) => (mapRef.current = ref)}
      style={styles.map}
      initialRegion={campus}
      pitchEnabled={false} // Prevents 3D tilt when zooming
      rotateEnabled={false} // Prevents rotation of the map
      zoomEnabled={true} // Allows zooming but stays in 2D
      zoomControlEnabled={true} // Optional: Enables zoom buttons
    >
      <Marker coordinate={campus} title={title} />
    </MapView>
  );
};

// Parent Component that Switches Between Maps
const CampusSwitcher: React.FC = () => {
  const [isSWGCampus, setIsSWGCampus] = useState<boolean>(true);

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
      <CampusMap
        campus={isSWGCampus ? SWGCampus : LoyolaCampus}
        title={isSWGCampus ? "SWG Campus" : "Loyola Campus"}
      />
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
    ...StyleSheet.absoluteFillObject, // Ensures full screen coverage
  },
});

export default CampusSwitcher;


