import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CampusSwitcher from "../../app/(tabs)/CampusMap";
import MapView, { Marker } from "react-native-maps";

// Mock MapView and Marker to avoid rendering issues in tests
jest.mock("react-native-maps", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: React.forwardRef(
      (
        props: React.JSX.IntrinsicAttributes &
          React.ClassAttributes<HTMLDivElement> &
          React.HTMLAttributes<HTMLDivElement>,
        ref: React.LegacyRef<HTMLDivElement> | undefined
      ) => <div ref={ref} {...props} data-testid="map-view" />
    ),
    Marker: (
      props: React.JSX.IntrinsicAttributes &
        React.ClassAttributes<HTMLDivElement> &
        React.HTMLAttributes<HTMLDivElement>
    ) => <div {...props} data-testid="marker" />,
  };
});

describe("CampusSwitcher Component", () => {
  it("starts with SGW Campus selected", async () => {
    const { getByText, getByTestId } = render(<CampusSwitcher />);

    expect(getByText("SGW Campus")).toBeTruthy();
    expect(getByTestId("map-view")).toBeTruthy();
    expect(getByTestId("marker")).toBeTruthy();
  });

  it("switches between SGW and Loyola Campus", async () => {
    const { getByText, getByTestId } = render(<CampusSwitcher />);

    const switchElement = getByTestId("campus-switch");

    // Starts at SGW
    expect(getByText("SGW Campus")).toBeTruthy();

    // Switch to Loyola
    fireEvent(switchElement, "valueChange", true);
    await waitFor(() => expect(getByText("Loyola Campus")).toBeTruthy());

    // Switch back to SGW
    fireEvent(switchElement, "valueChange", false);
    await waitFor(() => expect(getByText("SGW Campus")).toBeTruthy());
  });

  it("updates the map region when the campus changes", async () => {
    const { getByTestId } = render(<CampusSwitcher />);
    const switchElement = getByTestId("campus-switch");

    // Move to Loyola
    fireEvent(switchElement, "valueChange", true);
    await waitFor(() => {
      expect(getByTestId("map-view").props.initialRegion).toMatchObject({
        latitude: 45.4581,
        longitude: -73.6405,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });

    // Move back to SGW
    fireEvent(switchElement, "valueChange", false);
    await waitFor(() => {
      expect(getByTestId("map-view").props.initialRegion).toMatchObject({
        latitude: 45.4973,
        longitude: -73.5789,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });
  });
});
