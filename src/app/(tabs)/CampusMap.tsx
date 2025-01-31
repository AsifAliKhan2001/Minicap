import React from "react";
import MapView from "react-native-maps";
import { Box } from "@gluestack-ui/themed";

export default function CampusMap() {
  return (
    <Box flex={1}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 45.495,
          longitude: -73.578,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      />
    </Box>
  );
}
