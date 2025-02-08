import React, { useState, useRef, useEffect } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Region, Circle } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location"; // Import Location module
import { Campus } from "./models/Campus"; // Corrected import path
import { OutdoorLocation } from "./models/OutdoorLocation"; // Corrected import path

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
  const region: Region =
    campus.outdoorLocation === "loc-sgw"
      ? outdoorLocationSGW
      : outdoorLocationLoyola;
  const mapRef = useRef<MapView | null>(null);
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setPermissionGranted(true);
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        console.error("Location permission not granted");
      }
    };

    requestLocationPermission();
  }, []);

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
      <Marker
        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        title={campus.name}
      />
      {permissionGranted && userLocation && (
        <Marker
          coordinate={userLocation}
          title="Your Location"
          pinColor="blue"
        />
      )}
      {userLocation && (
        <Circle
          center={userLocation}
          radius={10}
          fillColor="rgba(0, 0, 255, 0.5)"
          strokeColor="rgba(0, 0, 255, 1)"
        />
      )}
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={async () => {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }}
      >
        <Text style={styles.buttonText}>Refresh Location</Text>
      </TouchableOpacity>
    </MapView>
  );
};

const CampusSwitcher: React.FC = () => {
  const [isSGWCampus, setIsSGWCampus] = useState<boolean>(true);
  const currentCampusId = isSGWCampus ? SGWCampus.id : LoyolaCampus.id;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>SGW Campus</Text>
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
  refreshButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
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
    ...StyleSheet.absoluteFillObject,
  },
});

export default CampusSwitcher;
