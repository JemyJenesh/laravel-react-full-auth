import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Home, Login, Register } from "./pages";
import "./app.css";
import { useSelector, useDispatch } from "react-redux";
import { selectIsDark } from "./store/themeSlice";
import { selectIsLoading, setUser } from "./store/userSlice";
import { GuestRoute } from "./components";

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

	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		axios
			.get("/api/user")
			.then((res) => {
				dispatch(setUser(res.data));
			})
			.catch(() => {
				dispatch(setUser(null));
			});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{isLoading ? (
				<Box
					sx={{
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<GuestRoute path="/login" component={Login} />
						<GuestRoute path="/register" component={Register} />
					</Switch>
				</BrowserRouter>
			)}
		</ThemeProvider>
	);
}
