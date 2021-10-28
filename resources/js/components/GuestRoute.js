import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ name, component: Component, path }) => {
	const user = useSelector(selectUser);

	return (
		<Route
			exact
			name={name}
			path={path}
			render={(props) =>
				!user ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default GuestRoute;
