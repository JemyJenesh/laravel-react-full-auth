import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";

export default function FullScreenLoader({ modal = true, open = false }) {
	if (!open) return null;
	if (modal) {
		return (
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}
	return (
		<Paper
			sx={{
				zIndex: 99999,
				position: "fixed",
				inset: 0,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				// height: "100vh",
			}}
		>
			<CircularProgress />
		</Paper>
	);
}
