'use client'

import dynamic from "next/dynamic";

import PageContainer from "@/src/components/PageContainer";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import Customers from "@/src/components/dashboard/Customers";
import Products from "@/src/components/dashboard/Products";
import LatestReviews from "@/src/components/dashboard/LatestReviews";
import Radar from "@/src/components/dashboard/Radar";


export default function Home() {

	return (
		<PageContainer title="Dashboard" description="this is Dashboard">
			<Box>
				<Grid container spacing={3}>
					<Grid
						size={{
							xs: 12,
							lg: 12
						}}>
						<LatestReviews />
					</Grid>
					<Grid
						size={{
							xs: 12,
							lg: 12
						}}>
						<Grid container spacing={3}>
							<Grid
								size={{
									xs: 12,
									sm: 6,
									lg: 4
								}}>
								<Customers isLoading={false} />
							</Grid>
							<Grid
								size={{
									xs: 12,
									sm: 6,
									lg: 4
								}}>
								<Products isLoading={false} />
							</Grid>
							<Grid
								size={{
									xs: 12,
									sm: 6,
									lg: 4
								}}>
								<Radar isLoading={false} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</PageContainer>
	);
}
