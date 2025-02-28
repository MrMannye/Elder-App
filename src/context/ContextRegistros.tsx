/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from '@/src/utils/axios';

export interface Paciente {
	ID: number;                   // Identificador único del paciente
	Nombre: string;               // Nombre del paciente
	FechaNacimiento: string;      // Fecha de nacimiento en formato YYYY-MM-DD
	FechaRegistro: string;        // Fecha de registro en formato YYYY-MM-DD               // Edad calculada en años
	Telefono?: string;            // Número de teléfono (opcional)
	Ocupacion?: string;           // Ocupación del paciente (opcional)
	DominanciaMano: 'Diestro' | 'Zurdo' | 'Ambidiestro';  // Dominancia manual
}

interface PacientContextType {
	pacientes: Paciente[];
	loading: boolean;
	error: Error | null;
}

export const InvoiceContext = createContext<PacientContextType | any>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [pacientes, setPacients] = useState<Paciente[]>([]);
	const [loading, setLoading] = useState(true);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get('http://localhost:5000/pacientes');
				setPacients(data.data);
				setLoading(false);
			} catch {
				// setError(error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);


	return (
		<InvoiceContext.Provider value={{ pacientes, loading, error }}>
			{children}
		</InvoiceContext.Provider>
	);
};
