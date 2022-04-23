import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <View>
      {places.length ? (
        <FlatList
          style={{ height: "100%" }}
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <PlaceItem
              image={itemData.item.imageUri}
              title={itemData.item.title}
              address={itemData.item.address}
              onSelect={() => {
                navigation.navigate("PlaceDetailscreen", {
                  placeTitle: itemData.item.title,
                  placeId: itemData.item.id,
                });
              }}
            />
          )}
        />
      ) : (
        <Text style={styles.noItems}>No items</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noItems: {
    textAlign: "center",
    alignItems: "center",
    color: "gray",
    marginTop: 20,
  },
});

export default PlacesListScreen;
