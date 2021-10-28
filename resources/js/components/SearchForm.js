import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useSelector } from "react-redux";
import { selectIsDark } from "../store/themeSlice";

const SearchForm = () => {
	const isDark = useSelector(selectIsDark);
	return (
		<Box
			component="form"
			sx={{
				display: "flex",
				pl: 2,
				pr: 1,
				alignItems: "center",
				background: (theme) =>
					isDark ? theme.palette.divider : theme.palette.action.hover,
				borderRadius: 10,
			}}
		>
			<SearchIcon fontSize="small" />
			<InputBase
				fullWidth
				type="search"
				sx={{
					px: 1,
					py: 0.75,
					borderRadius: 10,
				}}
				placeholder="Search…"
				inputProps={{ "aria-label": "search" }}
			/>
		</Box>
	);
};

export default SearchForm;
