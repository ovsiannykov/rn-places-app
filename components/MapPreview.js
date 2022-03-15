import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    const loc = props.location;

    imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-l+ff0f0f(${loc.longitude},${loc.latitude})/${loc.longitude},${loc.latitude},16,0/400x200?before_layer=bridge-major-link-2&access_token=${ENV.mapsApiKey}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        <Text>No location chosen yet!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
