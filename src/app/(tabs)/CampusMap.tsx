import React, { useState, useRef, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Campus } from "../../models/Campus";

// Mapping outdoor location UUIDs to actual Region coordinates
const locationMapping: Record<string, Region> = {
  "loc-sgw": {  // Updated key
    latitude: 45.4973,
    longitude: -73.5789,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  "loc-loyola": {
    latitude: 45.4581,
    longitude: -73.6405,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }
};

interface CampusMapProps {
  campus: Campus;
  title: string;
}

// Define campuses using Campus model with an outdoorLocation UUID
const SGWCampus: Campus = { // Updated name and id
  id: "sgw-uuid", // Replace with a valid UUID
  name: "SGW Campus",
  outdoorLocation: "loc-sgw", // Updated to match the location mapping
  buildingIds: [],
};

const LoyolaCampus: Campus = {
  id: "loyola-uuid", // Replace with a valid UUID
  name: "Loyola Campus",
  outdoorLocation: "loc-loyola", // Only store the location UUID
  buildingIds: [],
};

const CampusMap: React.FC<CampusMapProps> = ({ campus, title }) => {
  const mapRef = useRef<MapView | null>(null);
  const region: Region = locationMapping[campus.outdoorLocation];

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [region]);

  return (
    <MapView
      ref={(ref) => (mapRef.current = ref)}
      style={styles.map}
      initialRegion={region}
      pitchEnabled={false}
      rotateEnabled={false}
      zoomEnabled={true}
      zoomControlEnabled={true}
    >
      <Marker coordinate={region} title={title} />
    </MapView>
  );
};

const CampusSwitcher: React.FC = () => {
  const [isSGWCampus, setIsSGWCampus] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>SGW Campus</Text> {/* Updated label */}
        <Switch
          value={!isSGWCampus}
          onValueChange={() => setIsSGWCampus(!isSGWCampus)}
        />
        <Text>Loyola Campus</Text>
      </View>
      <CampusMap
        campus={isSGWCampus ? SGWCampus : LoyolaCampus}
        title={isSGWCampus ? "SGW Campus" : "Loyola Campus"}
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


