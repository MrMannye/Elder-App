'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "@/store/hooks";
import { Icon } from "@iconify/react";
import Notifications from "./Notification";
import Profile from "./Profile";
import Search from "./Search";
import Language from "./Language";
import { AppState } from "@/store/store";
import { IconButton } from '@mui/material';
import { setDarkMode } from '@/store/customizer/CustomizerSlice';

const Header = () => {
	const smUp = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

	// drawer
	const customizer = useSelector((state: AppState) => state.customizer);
	const dispatch = useDispatch();

	const AppBarStyled = styled(AppBar)(({ theme }) => ({
		boxShadow: '0 2px 6px rgba(37,83,185,.1)',
		background: theme.palette.background.paper,
		justifyContent: "center",
		backdropFilter: "blur(4px)",
		// [theme.breakpoints.up("lg")]: {
		minHeight: customizer.TopbarHeight,
		// },
		borderRadius: 13,
	}));
	const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
		width: "100%",
		color: theme.palette.text.secondary,
		minHeight: customizer.TopbarHeight,
	}));

	return (
		<AppBarStyled position="sticky" color="default">
			<ToolbarStyled>
				<Box flexGrow={1} />
				<Stack spacing={2} direction="row" alignItems="center">
					{smUp ? <Search /> : ""}
					<Language />
					<Notifications />
					<Profile />
				</Stack>
			</ToolbarStyled>
		</AppBarStyled>
	);
};

export default Header;
