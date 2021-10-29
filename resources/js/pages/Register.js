import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import * as yup from "yup";
import { useFormik } from "formik";
import { WebLayout, FullScreenLoader } from "../components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { apiClient } from "../utils";

const validationSchema = yup.object({
	name: yup.string("Enter you full name").required("Name is required"),
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
});

const Register = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setIsLoading(true);

			apiClient
				.register({
					...values,
					password_confirmation: values.password,
				})
				.then((res) => {
					dispatch(setUser(res.data.user));
					history.push("/");
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
	});

	return (
		<WebLayout>
			<FullScreenLoader open={isLoading} />
			<Container maxWidth="md" sx={{ py: 6 }}>
				<Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
					Create your Review Account
				</Typography>

				<form onSubmit={formik.handleSubmit}>
					<Paper sx={{ p: 4 }}>
						<Grid
							container
							justifyContent="end"
							rowSpacing={3}
							columnSpacing={4}
						>
							<Grid item xs={12} md={6}>
								<TextField
									autoFocus
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
								<TextField
									fullWidth
									id="name"
									name="name"
									label="Full Name"
									size="small"
									value={formik.values.name}
									onChange={formik.handleChange}
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
								/>
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
								<FormGroup>
									<FormControlLabel
										control={<Checkbox defaultChecked size="small" />}
										label={
											<Typography variant="caption">
												I want to receive exclusive offers and promotions.
											</Typography>
										}
									/>
								</FormGroup>
							</Grid>
							<Grid item xs={12} md={6}>
								<Button
									size="large"
									type="submit"
									fullWidth
									variant="contained"
								>
									Register
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</form>
			</Container>
		</WebLayout>
	);
};

export default Register;
