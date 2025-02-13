'use client'

import React from 'react'
import Sidebar from "@/src/layout/sidebar/Sidebar";
import Header from "@/src/layout/header/Header";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { useSelector } from "@/store/hooks";
import { useTheme, styled } from "@mui/material/styles";
import { AppState } from "@/store/store";

import { ThemeProvider } from "@mui/material/styles";
import { ThemeSettings } from "@/src/utils/theme/Theme";
import CssBaseline from "@mui/material/CssBaseline";


const PageWrapper = styled("div")(() => ({
	display: "flex",
	flexGrow: 1,
	paddingBottom: "60px",
	flexDirection: "column",
	zIndex: 1,
	backgroundColor: "transparent",
	height: "100dvh",
}));

function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const customizer = useSelector((state: AppState) => state.customizer);
	const theme = useTheme();
	const themeSettings = ThemeSettings();
	return (
		<ThemeProvider theme={themeSettings}>
			<CssBaseline>
				<div className="flex min-h-screen w-full p-5">
					<title>Elder Evaluation</title>
					<Box width="100%">
						{/* ------------------------------------------- */}
						{/* Sidebar */}
						{/* ------------------------------------------- */}
						<Sidebar />
						<PageWrapper
							className="page-wrapper"
							sx={{
								...(customizer.isCollapse && {
									[theme.breakpoints.up("lg")]: {
										ml: `${customizer.MiniSidebarWidth}px`,
									},
								}),
								...(!customizer.isCollapse &&
									!customizer.isHorizontal && {
									[theme.breakpoints.up("lg")]: {
										ml: `${customizer.SidebarWidth}px`,
										marginY: "20px",
									},
								}),
							}}
						>
							<Container
								sx={{
									maxWidth: "100%!important",
									paddingX: "45px!important",
								}}
							>
								{/* ------------------------------------------- */}
								{/* Header */}
								{/* ------------------------------------------- */}
								<Header />

								{/* ------------------------------------------- */}
								{/* PageContent */}
								{/* ------------------------------------------- */}

								<Box
									sx={{
										height: "calc(100% - 20px)",
										paddingTop: "20px",
									}}
								>
									{children}
								</Box>

								{/* ------------------------------------------- */}
								{/* End Page */}
								{/* ------------------------------------------- */}
							</Container>
						</PageWrapper>
					</Box>
				</div>
			</CssBaseline>
		</ThemeProvider>
	)
}

export default Layout