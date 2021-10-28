import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isLoading: true,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
		},
	},
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;

export default userSlice.reducer;
