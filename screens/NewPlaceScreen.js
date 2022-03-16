import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as palcesActions from "../store/places-actions";
import ImgPicker from "../components/ImgPicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = ({ navigation, route }, props) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  // useEffect(() => {
  //   if (?route.params.pickedLocation) {
  //     mapPickedLocation = route.params.pickedLocation;
  //   }
  // }, [route.params?.pickedLocation]);

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitleValue(text);
  };

  const savePlaceHandler = (titleValue, selectedImage) => {
    if (titleValue && selectedImage) {
      dispatch(palcesActions.addPlace(titleValue, selectedImage));
      navigation.goBack();
    } else {
      Alert.alert("Opps...", "Fill in all the fields!");
    }
  };

  const imageTakeHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImgPicker onImageTaken={imageTakeHandler} />
        <LocationPicker />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
