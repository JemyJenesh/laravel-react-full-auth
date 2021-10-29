import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { useSelector, useDispatch } from "react-redux";
import { selectAlert, closeAlert } from "../store/alertSlice";

export default function GlobalAlert() {
	const { open, message, variant } = useSelector(selectAlert);
	const dispatch = useDispatch();

	const handleClick = () => dispatch(closeAlert());

	useEffect(() => {
		const timeId = setTimeout(() => {
			handleClick();
		}, 10000);

		return () => {
			clearTimeout(timeId);
		};
	}, [open]);

	return (
		<Collapse in={open}>
			<Alert
				sx={{ borderRadius: 0 }}
				severity={variant}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={handleClick}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
			>
				{message}
			</Alert>
		</Collapse>
	);
}
