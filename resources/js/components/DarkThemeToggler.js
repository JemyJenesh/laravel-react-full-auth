import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import { useSelector, useDispatch } from "react-redux";

import { selectIsDark, toggleTheme } from "../store/themeSlice";

export default function DarkThemeToggler() {
	const isDark = useSelector(selectIsDark);
	const dispatch = useDispatch();

	const handleClick = () => dispatch(toggleTheme());
	return (
		<IconButton onClick={handleClick}>
			{isDark ? <Brightness7Icon /> : <Brightness4Icon />}
		</IconButton>
	);
}
