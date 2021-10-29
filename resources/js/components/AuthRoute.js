import { useSelector } from "react-redux";
import { selectIsLoading, selectUser } from "../store/userSlice";
import { Route, Redirect } from "react-router";

const AuthRoute = ({ component: Component, path }) => {
	const user = useSelector(selectUser);
	const isLoading = useSelector(selectIsLoading);

	if (isLoading) return null;

	return (
		<Route
			exact
			path={path}
			render={(props) =>
				user ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default AuthRoute;
