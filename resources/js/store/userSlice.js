import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
	user: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
