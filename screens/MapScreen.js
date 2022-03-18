import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import { addLocation } from "../store/location/actions";

const MapScreen = ({ navigation }, props) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [initialLocation, setInitialLocation] = useState();
  const [readonly, setReadonly] = useState(false);

  const dispatch = useDispatch();

  const route = useRoute();

  useEffect(() => {
    if (route && route.params) {
      setInitialLocation(route.params.initialLocation);
      setReadonly(route.params.readonly);
    }
  }, [route]);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.latitude : 37.78,
    longitude: initialLocation ? initialLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const savePickedLocationHandler = () => {
    navigation.navigate("NewPlaceScreen", { markerCoordinates });
    dispatch(addLocation(markerCoordinates));
  };

  return (
    <View style={{ height: "100%" }}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}
      >
        {markerCoordinates && (
          <Marker title="Picked Location" coordinate={markerCoordinates} />
        )}
        {readonly ? (
          <Marker title="Picked Location" coordinate={initialLocation} />
        ) : null}
      </MapView>

      {!readonly ? (
        <TouchableOpacity
          style={styles.saveContainer}
          onPress={savePickedLocationHandler}
        >
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 1,
  },
  saveContainer: {
    height: 80,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  saveText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
});

export default MapScreen;
