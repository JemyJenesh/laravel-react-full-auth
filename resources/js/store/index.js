import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "./alertSlice";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";

const store = configureStore({
	reducer: {
		alert: alertReducer,
		theme: themeReducer,
		user: userReducer,
	},
});

export default store;
