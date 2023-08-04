import { configureStore } from "@reduxjs/toolkit";
import apiCallReducer from "../slices/apiCallSlice";
export default configureStore({
  reducer: {
    apiCall: apiCallReducer,
  },
});
