import React from "react";
import Breadcrumb from "@/src/shared/Breadcrumb";
import PageContainer from "@/src/components/PageContainer";
import Registros from "@/src/components/registros/Registros";
import { InvoiceProvider } from "@/src/context/ContextRegistros";
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

const Page = () => {
	return (
		<InvoiceProvider>
			<PageContainer title="Registros" description="Colección de registros de pacientes">
				<Breadcrumb title="Pacientes" items={BCrumb} />
				<BlankCard>
					<CardContent>
						<Registros />
					</CardContent>
				</BlankCard>
			</PageContainer>
		</InvoiceProvider>
	);
}
export default Page;
