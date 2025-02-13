'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from '@/src/utils/axios';

interface order {
	itemName: string;
	unitPrice: number;
	units: number;
	unitTotalPrice: number;
}

interface InvoiceList {
	id: number;
	billFrom: string;
	billFromEmail: string;
	billFromAddress: string;
	billFromPhone: number;
	billFromFax: number;
	billTo: string;
	billToEmail: string;
	billToAddress: string;
	billToPhone: number;
	billToFax: number;
	orders: order[];
	orderDate: Date;
	totalCost: number;
	vat: number;
	grandTotal: number;
	status: string;
	completed: boolean;
	isSelected: boolean;
}

interface InvoiceContextType {
	invoices: InvoiceList[];
	loading: boolean;
	error: Error | null;
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	deleteEmail: () => {},
	addInvoice: (newInvoice: InvoiceList) => void;
	updateInvoice: (updatedInvoice: InvoiceList) => void;
}

export const InvoiceContext = createContext<InvoiceContextType | any>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [invoices, setInvoices] = useState<InvoiceList[]>([]);
	const [loading, setLoading] = useState(true);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('/api/data/invoicedata');
				setInvoices(response.data);
				setLoading(false);
			} catch {
				// setError(error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Function to delete an invoice
	const deleteInvoice = async (id: number) => {
		try {

			await axios.delete('/api/data/invoicedata/deleteinvoice', { data: { invoiceId: id } });
			setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== id));
		} catch (error) {
			console.error('Error deleting invoice:', error);

		}
	};

	const addInvoice = async (newInvoice: InvoiceList) => {
		try {
			const response = await axios.post('/api/data/invoicedata/addinvoice', newInvoice);
			const addedInvoice = response.data;
			setInvoices((prevInvoices) => [...prevInvoices, addedInvoice]);
		} catch (error) {
			console.error('Error adding invoice:', error);
		}
	};

	//  Function to update an invoice
	const updateInvoice = async (updatedInvoice: InvoiceList) => {
		try {
			const response = await axios.put('/api/data/invoicedata/updateinvoice', updatedInvoice);
			const updated = response.data;
			setInvoices((prevInvoices) =>
				prevInvoices.map((invoice) => (invoice.id === updated.id ? updated : invoice))
			);
		} catch (error) {
			console.error('Error updating invoice:', error);
		}
	};

	return (
		<InvoiceContext.Provider value={{ invoices, loading, error, deleteInvoice, addInvoice, updateInvoice }}>
			{children}
		</InvoiceContext.Provider>
	);
};
