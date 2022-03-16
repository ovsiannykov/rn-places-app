import { LOCATION_TYPE } from "./actions";

const initialState = {
  location: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_TYPE:
      return { ...state, location: action.payload };
    default:
      return state;
  }
};

export default locationReducer;
