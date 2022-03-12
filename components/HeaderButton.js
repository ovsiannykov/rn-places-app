import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";

const HeaderButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => navigation.navigate("NewPlaceScreen")}
    >
      <FontAwesome
        name="plus"
        size={24}
        color={Platform.OS === "android" ? "white" : Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default HeaderButton;
