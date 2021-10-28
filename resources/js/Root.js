import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Home } from "./pages";
import "./app.css";

const theme = createTheme({
	palette: {
		primary: {
			main: "#6f42c1",
		},
		background: {
			default: "#F8F9FA",
		},
	},
	shape: {
		borderRadius: 10,
	},
	typography: {
		fontFamily: "Nunito, sans-serif",
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

export default function Root() {
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
