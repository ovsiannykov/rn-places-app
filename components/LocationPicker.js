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

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const [adress, setAdress] = useState(null);

  const mapPickedLocation = props.mapPickedLocation;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation.markerCoordinates);
    }
  }, [mapPickedLocation]);

  const navigation = useNavigation();

  async function GetCurrentLocation() {
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

      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = item.name;
        setAdress(address);
      }
    } else {
      Alert.alert("Oops..", "Failed to find location");
    }
    setIsFetching(false);
  }

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  const getLocationHandler = async () => {};

  const pickOnMapHandler = () => {
    navigation.navigate("MapScreen");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        adress={adress}
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
          onPress={getLocationHandler}
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
