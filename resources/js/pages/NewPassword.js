import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import * as yup from "yup";
import { useFormik } from "formik";
import { WebLayout, FullScreenLoader } from "../components";
import { useDispatch } from "react-redux";
import { showAlert } from "../store/alertSlice";
import { apiClient } from "../utils";
import { useUrlQuery } from "../hooks";

const validationSchema = yup.object({
	password: yup
		.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
	password_confirmation: yup
		.string("Retype password")
		.oneOf([yup.ref("password"), null], "Passwords don't match.")
		.required("Password confirmation is required"),
});

const NewPassword = () => {
	const query = useUrlQuery();
	const email = query.get("email");
	const token = query.get("token");
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			password: "",
			password_confirmation: "",
			email: email,
		},
		validationSchema: validationSchema,
		onSubmit: (values, { resetForm }) => {
			setIsLoading(true);

			apiClient
				.resetPassword({
					...values,
					token,
				})
				.then((res) => {
					resetForm();
					dispatch(
						showAlert({
							message: "Password changed! You can now go back to login.",
							variant: "success",
						})
					);
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
					Change your password!
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
									autoComplete="off"
									fullWidth
									id="password"
									name="password"
									type="password"
									label="New password"
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
								<TextField
									inputProps={{ readOnly: true }}
									autoComplete="off"
									fullWidth
									id="email"
									name="email"
									type="email"
									label="Email"
									size="small"
									value={formik.values.email}
									onChange={formik.handleChange}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									autoComplete="off"
									fullWidth
									id="password_confirmation"
									name="password_confirmation"
									type="password"
									label="Confirm Password"
									size="small"
									value={formik.values.password_confirmation}
									onChange={formik.handleChange}
									error={
										formik.touched.password_confirmation &&
										Boolean(formik.errors.password_confirmation)
									}
									helperText={
										formik.touched.password_confirmation &&
										formik.errors.password_confirmation
									}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Button
									size="large"
									type="submit"
									fullWidth
									variant="contained"
								>
									Change password
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</form>
			</Container>
		</WebLayout>
	);
};

export default NewPassword;
