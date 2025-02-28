import React from "react";
import Breadcrumb from "@/src/shared/Breadcrumb";
import PageContainer from "@/src/components/PageContainer";
import Pruebas from "@/src/components/registros/Pruebas";
import { PruebasProvider } from "@/src/context/ContextPruebas";
import BlankCard from "@/src/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
	{
		to: "/",
		title: "Registros",
	},
	{
		title: "Expedientes",
	},
];

const Analisis = () => {
	return (
		<PruebasProvider>
			<PageContainer title="Analisis" description="Colección de registros de pacientes">
				<Breadcrumb title="Analisis" items={BCrumb} />
				<BlankCard>
					<CardContent>
						<Pruebas />
					</CardContent>
				</BlankCard>
			</PageContainer>
		</PruebasProvider>
	);
}
export default Analisis;
