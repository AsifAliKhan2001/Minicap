import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Region, Circle } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location"; // Import Location module
import { Campus } from "@/models/Campus"; // Corrected import path
import { OutdoorLocation } from "@/models/OutdoorLocation"; // Corrected import path

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

// Define campuses using Campus model with an outdoorLocation ObjectId
const SGWCampus: Campus = {
  id: "sgw-ObjectId",
  name: "SGW Campus",
  outdoorLocation: "loc-sgw",
  buildingIds: [],
};

const LoyolaCampus: Campus = {
  id: "loyola-ObjectId",
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
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const foregroundStatus =
          await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus.status !== "granted") {
          setLocationError("Permission to access location was denied");
          return;
        }

        setPermissionGranted(true);
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (err) {
        console.error("Error getting location:", err);
        setLocationError("Error getting location");
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [region]);

  const updateUserLocation = async () => {
    try {
      setIsRefreshing(true);
      setLocationError(null);

      if (!permissionGranted) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationError("Location permission required");
          return;
        }
        setPermissionGranted(true);
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setUserLocation(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      console.error("Error updating location:", error);
      setLocationError("Failed to get current location");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <View style={styles.mapContainer}>
      {locationError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{locationError}</Text>
        </View>
      ) : null}
      <MapView
        testID="map-view"
        ref={(ref) => (mapRef.current = ref)}
        style={styles.map}
        initialRegion={region}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
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
      </MapView>
      <TouchableOpacity
        style={[
          styles.refreshButton,
          isRefreshing && styles.refreshButtonDisabled,
        ]}
        onPress={updateUserLocation}
        disabled={isRefreshing}
      >
        {isRefreshing ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.buttonText}>My Location</Text>
        )}
      </TouchableOpacity>
    </View>
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
          testID="campus-switch"
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
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  refreshButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
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
    flex: 1,
  },
  errorContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
    zIndex: 2,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
  refreshButtonDisabled: {
    backgroundColor: "rgba(0, 0, 255, 0.4)",
  },
});

export default CampusSwitcher;
