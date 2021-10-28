import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Home } from "./pages";
import "./app.css";
import { useSelector } from "react-redux";
import { selectIsDark } from "./store/themeSlice";

export default function Root() {
	const isDark = useSelector(selectIsDark);
	const theme = createTheme({
		palette: {
			mode: isDark ? "dark" : "light",
			primary: {
				main: isDark ? "#B64FC8" : "#7952B3",
			},
			// background: {
			// 	default: isDark ? "rgba(255, 255, 255, 0.12)" : "#F8F9FA",
			// },
		},
		shape: {
			borderRadius: 10,
		},
		typography: {
			fontFamily: "Nunito, sans-serif",
			// fontSize: 12,
		},
		components: {
			MuiButton: {
				defaultProps: {
					disableElevation: true,
					disableRipple: true,
				},
			},
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}
