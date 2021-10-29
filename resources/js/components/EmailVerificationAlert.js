import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { FullScreenLoader } from ".";
import { apiClient } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { showAlert } from "../store/alertSlice";

export default function EmailVerificationAlert() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = () => {
		setIsLoading(true);
		apiClient
			.emailVerification()
			.then(() => {
				dispatch(
					showAlert({
						message: "Email verification link sent!",
						variant: "success",
					})
				);
			})
			.finally(() => setIsLoading(false));
	};

	if (user && !user.email_verified_at)
		return (
			<>
				<FullScreenLoader open={isLoading} />
				<Alert
					sx={{ borderRadius: 0 }}
					severity="warning"
					action={
						<Button color="inherit" size="small" onClick={handleClick}>
							Resend link
						</Button>
					}
				>
					Please verify your email!
				</Alert>
			</>
		);

	return null;
}
