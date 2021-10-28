import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isDark: JSON.parse(localStorage.getItem("isDark")) ?? false,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.isDark = !state.isDark;
			localStorage.setItem("isDark", state.isDark);
		},
	},
});

export const { toggleTheme } = themeSlice.actions;

export const selectIsDark = (state) => state.theme.isDark;

export default themeSlice.reducer;
