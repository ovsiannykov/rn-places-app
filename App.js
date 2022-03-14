import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import placesReducer from "./store/places-reducer";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initialized database 🎉");
  })
  .catch((err) => {
    console.log("Initializing db failed 😢");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
}
