import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;
  let loc;

  if (props.location) {
    loc = props.location;

    imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-l+ff0f0f(${loc.longitude},${loc.latitude})/${loc.longitude},${loc.latitude},16,0/400x200?before_layer=bridge-major-link-2&access_token=${ENV.mapsApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        <Text>No location chosen yet!</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default MapPreview;
