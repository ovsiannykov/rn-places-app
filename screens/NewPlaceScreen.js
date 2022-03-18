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
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";

import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";
import ImgPicker from "../components/ImgPicker";
import LocationPicker from "../components/LocationPicker";
import { addLocation } from "../store/location/actions";

const NewPlaceScreen = ({ navigation }, props) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState();
  const receivedLocation = useSelector((state) => state.location.location);

  useEffect(() => {
    if (receivedLocation) {
      setSelectedLocation(receivedLocation);
    }
  }, [receivedLocation]);

  const route = useRoute();

  useEffect(() => {
    if (route && route.params) {
      setLocation(route.params);
    }
  }, [route]);

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitleValue(text);
  };

  const savePlaceHandler = async () => {
    // if (titleValue && selectedImage && selectedLocation) {
    //   dispatch(
    //     placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    //   );
    //   navigation.goBack();
    // } else {
    //   Alert.alert("Opps");
    // }
    await dispatch(
      placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    );
    await dispatch(addLocation(null));
    navigation.goBack();
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
          placeholder="Place"
        />
        <ImgPicker onImageTaken={imageTakeHandler} />
        <LocationPicker mapPickedLocation={location} />
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
