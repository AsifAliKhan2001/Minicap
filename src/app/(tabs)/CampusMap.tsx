import React, { useState, useRef, useEffect } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Region, Circle } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

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
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setPermissionGranted(true);
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 1 },
          (location) => {
            setUserLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        );
      } else {
        console.error("Location permission not granted");
      }
    };

    requestLocationPermission();
  }, []);

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
  refreshButton: {
    position: "absolute",
    bottom: 20, // Adjust this value to position the button lower
    left: "50%",
    transform: [{ translateX: -50 }],
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 255, 0.7)", // Optional: Add background color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white", // Text color for the button
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
    ...StyleSheet.absoluteFillObject, // Ensures full screen coverage
  },
});

export default CampusSwitcher;
