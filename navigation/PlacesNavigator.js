import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import PlacesListScreen from "../screens/PlacesListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import PlaceDetailscreen from "../screens/PlaceDetailScreen";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const PlacesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <Stack.Screen
        name="PlacesListScreen"
        component={PlacesListScreen}
        options={{ title: "All Places", headerRight: () => <HeaderButton /> }}
      />
      <Stack.Screen name="NewPlaceScreen" component={NewPlaceScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen
        name="PlaceDetailscreen"
        component={PlaceDetailscreen}
        options={({ route }) => ({
          title: route.params.placeTitle,
        })}
      />
    </Stack.Navigator>
  );
};

export default PlacesNavigator;
