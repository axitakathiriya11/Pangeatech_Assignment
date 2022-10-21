import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "../utils/chartReducer";

export default configureStore({
  reducer: {
    chart: chartReducer,
  },
});
