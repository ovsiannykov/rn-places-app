import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const [image, setImage] = useState(null);

  const takeImageHandler = async () => {
    // No permissions request is necessary for launching the image library!!!
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.onImageTaken(result.uri);
    } else {
      Alert.alert("Oops...", "Failed to load image");
      setImage(null);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text>No image picked yet</Text>
        )}
      </View>
      <Button
        title="Take image"
        color={Colors.primary}
        onPress={takeImageHandler}
        style={{ marginBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#ccc",
    // borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default ImgPicker;
