import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../store/userSlice";

const AccountMenu = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const handleLogout = () => {
		axios
			.get("/api/logout")
			.then((res) => {
				dispatch(setUser(null));
			})
			.catch(
				(err) =>
					err.response &&
					console.log(Object.values(err.response.data.errors).flat())
			);
	};
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Fragment>
			<Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
				<Tooltip title="Account settings">
					<IconButton onClick={handleClick} size="small">
						<Avatar sx={{ width: 32, height: 32 }}>{user?.name[0]}</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem>
					<Avatar /> Profile
				</MenuItem>
				<MenuItem>
					<Avatar /> My account
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<PersonAdd fontSize="small" />
					</ListItemIcon>
					Add another account
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Fragment>
	);
};

export default AccountMenu;