import React from "react";
import Breadcrumb from "@/src/shared/Breadcrumb";
import PageContainer from "@/src/components/PageContainer";
import Mediciones from "@/src/components/registros/Mediciones";
import { MedicionesProvider } from "@/src/context/ContexMediciones";
import BlankCard from "@/src/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
	{
		to: "/",
		title: "Registros",
	},
	{
		title: "Mediciones",
	},
];

const Page = () => {
	return (
		<MedicionesProvider>
			<PageContainer title="Mediciones" description="Colección de registros de pacientes">
				<Breadcrumb title="Mediciones" items={BCrumb} />
				<BlankCard>
					<CardContent>
						<Mediciones />
					</CardContent>
				</BlankCard>
			</PageContainer>
		</MedicionesProvider>
	);
}
export default Page;
