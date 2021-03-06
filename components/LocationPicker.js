import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";
import { addLocation } from "../store/location/actions";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const [mapLocation, setMapLocation] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mapPickedLocation = props.mapPickedLocation;

  useEffect(() => {
    if (mapPickedLocation) {
      setMapLocation(mapPickedLocation.markerCoordinates);
    }
  }, [mapPickedLocation]);

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  const GetCurrentLocation = async () => {
    setIsFetching(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      setPickedLocation(coords);
    } else {
      Alert.alert("Oops..", "Failed to find location");
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("MapScreen", { initialLocation: pickedLocation });
  };

  useEffect(() => {
    if (mapLocation == null) {
      dispatch(addLocation(pickedLocation));
    } else {
      dispatch(addLocation(mapLocation));
    }
  }, [mapLocation]);

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={mapLocation == null ? pickedLocation : mapLocation}
        onPress={pickOnMapHandler}
      />

      {isFetching ? (
        <View>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <Text></Text>
      )}
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={async () => {
            await dispatch(addLocation(null));
            setMapLocation(null);
            await GetCurrentLocation();
          }}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
