import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import * as yup from "yup";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { WebLayout } from "../components";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../store/userSlice";
import apiClient from "../utils/apiClient";

const validationSchema = yup.object({
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup.string("Enter your password").required("Password is required"),
});

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			apiClient.login(values).then((res) => {
				dispatch(setUser(res.data.user));
				history.push("/");
			});
		},
	});

	return (
		<WebLayout>
			<Container maxWidth="md" sx={{ py: 6 }}>
				<Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
					Welcome to Inven!
				</Typography>

				<form onSubmit={formik.handleSubmit}>
					<Paper sx={{ p: 4 }}>
						<Grid
							container
							// justifyContent="end"
							// alignItems="end"
							rowSpacing={3}
							columnSpacing={4}
						>
							<Grid item xs={12} md={6}>
								<TextField
									fullWidth
									id="email"
									name="email"
									type="email"
									label="Email"
									size="small"
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Button
									size="large"
									fullWidth
									type="submit"
									variant="contained"
								>
									Login
								</Button>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									fullWidth
									id="password"
									name="password"
									type="password"
									label="Password"
									size="small"
									value={formik.values.password}
									onChange={formik.handleChange}
									error={
										formik.touched.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<Button
									size="large"
									fullWidth
									type="button"
									variant="outlined"
									component={NavLink}
									to="/register"
								>
									Register new account
								</Button>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<FormGroup>
										<FormControlLabel
											control={<Checkbox defaultChecked size="small" />}
											label={<Typography>Remember me</Typography>}
										/>
									</FormGroup>
									<Link
										underline="hover"
										component={NavLink}
										to="/forgot-password"
									>
										Forgot password
									</Link>
								</Box>
							</Grid>
						</Grid>
					</Paper>
				</form>
			</Container>
		</WebLayout>
	);
};

export default Login;
