import { Nav } from ".";

export default function WebLayout({ children }) {
	return (
		<>
			<Nav />
			{children}
		</>
	);
}
