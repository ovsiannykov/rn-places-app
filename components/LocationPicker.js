import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

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

      // const { latitude, longitude } = coords;
      // let response = await Location.reverseGeocodeAsync({
      //   latitude,
      //   longitude,
      // });
      //
      // for (let item of response) {
      //   let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
      //   alert(address);
      // }
    } else {
      Alert.alert("Oops..", "Failed to find location");
    }
    setIsFetching(false);
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} />
      {isFetching ? (
        <View>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <Text></Text>
      )}

      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={GetCurrentLocation}
      />
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
  },
});

export default LocationPicker;
