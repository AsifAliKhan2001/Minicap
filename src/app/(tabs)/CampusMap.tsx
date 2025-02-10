import React, { useState, useRef, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Campus } from "@/models/Campus";
import { OutdoorLocation } from "@/models/OutdoorLocation";
/*Importing react native logos, check website for options
https://oblador.github.io/react-native-vector-icons/
*/
import Icon from "react-native-vector-icons/MaterialIcons";

// Define outdoor locations
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

// Define campuses
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

interface CampusMapProps {
  campusId: string;
}

const CampusMap: React.FC<CampusMapProps> = ({ campusId }) => {
  const campus = campusId === SGWCampus.id ? SGWCampus : LoyolaCampus;
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
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {/* Campus Switch */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>SGW</Text>
            <Switch
              value={!isSGWCampus}
              onValueChange={() => setIsSGWCampus(!isSGWCampus)}
            />
            <Text style={styles.switchText}>LOY</Text>
          </View>

          {/* App Logo */}
          <Image source={require("../../assets/images/Concordia_Small_Logo.png")} style={styles.logo} />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Looking up some buildings.")}>
              <Icon name="search" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Accessibility settings.")}>
              <Icon name="settings-accessibility" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <CampusMap campusId={currentCampusId} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "rgba(146, 35, 56, 1)", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CampusSwitcher;
