import React, { useState, useRef, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Campus } from "@/models/Campus";
import { OutdoorLocation } from "@/models/OutdoorLocation";

// Define two outdoor location objects of type OutdoorLocation
const outdoorLocationSGW: OutdoorLocation = {
  id: "loc-sgw",
  locationType: "outdoor",
  latitude: 45.4973,
  longitude: -73.5789,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const outdoorLocationLoyola: OutdoorLocation = {
  id: "loc-loyola",
  locationType: "outdoor",
  latitude: 45.4581,
  longitude: -73.6405,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

interface CampusMapProps {
  campusId: string;
}

// Define campuses using Campus model with an outdoorLocation UUID
const SGWCampus: Campus = {
  id: "sgw-uuid",
  name: "SGW Campus",
  outdoorLocation: "loc-sgw",
  buildingIds: [],
};

const LoyolaCampus: Campus = {
  id: "loyola-uuid",
  name: "Loyola Campus",
  outdoorLocation: "loc-loyola",
  buildingIds: [],
};

const CampusMap: React.FC<CampusMapProps> = ({ campusId }) => {
  const campus = campusId === SGWCampus.id ? SGWCampus : LoyolaCampus;
  // Look up the correct OutdoorLocation based on the campus' outdoorLocation id
  const region: Region = campus.outdoorLocation === "loc-sgw" ? outdoorLocationSGW : outdoorLocationLoyola;
  const mapRef = useRef<MapView | null>(null);

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
      <Marker coordinate={region} title={campus.name} />
    </MapView>
  );
};

const CampusSwitcher: React.FC = () => {
  const [isSGWCampus, setIsSGWCampus] = useState<boolean>(true);
  const currentCampusId = isSGWCampus ? SGWCampus.id : LoyolaCampus.id;

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
      <CampusMap campusId={currentCampusId} />
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


