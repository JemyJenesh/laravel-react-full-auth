import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { NavLink } from "react-router-dom";
import { SearchForm, DarkThemeToggler } from ".";

export default function Nav() {
	return (
		<AppBar position="sticky" color="inherit" elevation={0}>
			<Toolbar component={Container} maxWidth="xl">
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					sx={{ flexBasis: "30%" }}
				>
					<Typography
						variant="h5"
						// component={NavLink}
						// to="/"
						// sx={{ textDecoration: "none" }}
					>
						Review
					</Typography>
				</Stack>
				<Box sx={{ flexBasis: "40%" }}>
					<SearchForm />
				</Box>
				<Stack
					direction="row"
					spacing={2}
					sx={{ ml: "auto" }}
					alignItems="center"
				>
					<DarkThemeToggler />
					<Button variant="outlined" component={NavLink} to="/login">
						Login
					</Button>
					<Button variant="contained" component={NavLink} to="/register">
						Register
					</Button>
				</Stack>
			</Toolbar>
			<Divider />
		</AppBar>
	);
}
