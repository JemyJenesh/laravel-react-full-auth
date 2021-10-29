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

import { apiClient } from "../utils";
import { showAlert } from "../store/alertSlice";

const validationSchema = yup.object({
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
});

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values, { resetForm }) => {
			setIsLoading(true);
			apiClient
				.forgotPassword(values)
				.then((res) => {
					console.log(res.data);
					if (res.status === 200) {
						dispatch(
							showAlert({
								message: "A password reset link has been sent to your email!",
								variant: "success",
							})
						);
						resetForm();
					}
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
					Forgot your password?
				</Typography>

				<form onSubmit={formik.handleSubmit}>
					<Paper sx={{ p: 4 }}>
						<Grid container rowSpacing={3} columnSpacing={4}>
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
								<Button
									size="large"
									fullWidth
									type="submit"
									variant="contained"
								>
									Send link
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</form>
			</Container>
		</WebLayout>
	);
};

export default ForgotPassword;
