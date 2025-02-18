import React from "react";
import Breadcrumb from "@/src/shared/Breadcrumb";
import PageContainer from "@/src/components/PageContainer";
import InvoiceList from "@/src/components/invoice/index";
import { InvoiceProvider } from "@/src/context/InvoiceContext/index";
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

const InvoiceListing = () => {
	return (
		<InvoiceProvider>
			<PageContainer title="Invoice List" description="this is Invoice List">
				<Breadcrumb title="Pacientes" items={BCrumb} />
				<BlankCard>
					<CardContent>
						<InvoiceList />
					</CardContent>
				</BlankCard>
			</PageContainer>
		</InvoiceProvider>
	);
}
export default InvoiceListing;
