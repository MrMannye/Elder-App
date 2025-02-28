/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from '@/src/utils/axios';

export interface MedicionesPaciente {
	ID: string;
	Nombre: string;
	Peso: number;
	Estatura: number;
	PorcentajeGrasa: number;
	IMC: number;
	PerimetroMuneca: number;
	PerimetroAntebrazo: number;
	PerimetroAbdominal: number;
}


interface MedicionesContextType {
	pacientes: MedicionesPaciente[];
	loading: boolean;
	error: Error | null;
}

export const MedicionesContext = createContext<MedicionesContextType | any>(undefined);

export const MedicionesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [medicionesPaciente, setMedicionesPaciente] = useState<MedicionesPaciente[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get('http://localhost:5000/pacientes/mediciones');
				setMedicionesPaciente(data.data);
				setLoading(false);
			} catch {
				setError(error);
				setLoading(false);
			}
		};
		fetchData();
	}, [error]);


	return (
		<MedicionesContext.Provider value={{ medicionesPaciente, loading, error }}>
			{children}
		</MedicionesContext.Provider>
	);
};
