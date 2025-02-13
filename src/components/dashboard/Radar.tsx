import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import DashboardCard from "../../shared/DashboardCard";
import SkeletonProductsCard from "../../skeleton/ProductCard";

interface ProductsCardProps {
	isLoading: boolean;
}

function Radar({ isLoading }: ProductsCardProps) {
	const theme = useTheme();
	const primary = theme.palette.primary.main;

	// chart

	const optionsradarchart: any = {
		chart: {
			id: "pie-chart",
			fontFamily: "'Plus Jakarta Sans', sans-serif",
			toolbar: {
				show: false,
			},
		},
		colors: [primary],
		labels: ["January", "February", "March", "April", "May", "June"],
		tooltip: {
			theme: "dark",
		},
	};
	const seriesradarchart: any = [
		{
			name: "Sales",
			data: [80, 50, 30, 40, 100, 20],
		},
	];

	return (
		<>
			{isLoading ? (
				<SkeletonProductsCard />
			) : (
				<DashboardCard
					title="Products"
					subtitle="Last 7 days"
					action={
						<Box textAlign="right">
							<Typography variant="h5" display="block">
								432
							</Typography>
							<Box
								bgcolor="success.light"
								color="success.main"
								fontSize="12px"
								p="0px 7px"
								border="1px solid "
								borderRadius={2}
							>
								+26.5%
							</Box>
						</Box>
					}
				>
					<>
						<Box className="rounded-bars">
							<Chart
								options={optionsradarchart}
								series={seriesradarchart}
								type="radar"
								height="300px"
								width={"100%"}
							/>
						</Box>
					</>
				</DashboardCard>
			)}
		</>
	);
}

export default Radar