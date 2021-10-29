import Container from "@mui/material/Container";
import { Nav } from ".";

export default function WebLayout({ children }) {
	return (
		<>
			<Nav />
			<Container maxWidth="xl" sx={{ py: 2 }}>
				{children}
			</Container>
		</>
	);
}
