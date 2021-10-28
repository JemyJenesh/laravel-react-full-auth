import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	open: false,
	message: "Dummy alert is open! Please close it.",
	variant: "warning",
};

export const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		showAlert: (state, action) => {
			state.open = true;
			state.message = action.payload.message;
			state.variant = action.payload.variant;
		},
		closeAlert: (state) => {
			state.open = false;
		},
	},
});

export const { showAlert, closeAlert } = alertSlice.actions;

export const selectAlert = (state) => state.alert;

export default alertSlice.reducer;
