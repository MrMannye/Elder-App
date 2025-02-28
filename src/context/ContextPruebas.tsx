/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from '@/src/utils/axios';

export interface PruebasFuncionales {
	PacienteID: string; // Relación con la tabla Pacientes
	FechaRegistro: string; // Fecha de Registro/Actualización en formato ISO
	FRAIL_Puntuacion?: number; // Resultado de FRAIL
	SARC_Puntuacion?: number; // Resultado de SARC-F
	SF36_FuncionFisica?: number; // Resultado de función física (SF-36)
	SF36_RolFisico?: number; // Resultado de rol físico (SF-36)
	SF36_DolorCorporal?: number; // Resultado de dolor corporal (SF-36)
	SF36_SaludGeneral?: number; // Resultado de salud general (SF-36)
	SF36_Vitalidad?: number; // Resultado de vitalidad (SF-36)
	SF36_FuncionSocial?: number; // Resultado de función social (SF-36)
	SF36_RolEmocional?: number; // Resultado de rol emocional (SF-36)
	SF36_SaludMental?: number; // Resultado de salud mental (SF-36)
	FES1_RiesgoCaida?: number; // Resultado de Riesgo de Caída (FES-1)
	UPGO_Equilibrio?: number; // Resultado escala Tinetti Equilibrio (UP&GO)
	UPGO_Marcha?: number; // Resultado escala Tinetti Marcha (UP&GO)
}


interface PruebasContextType {
	pacientes: PruebasFuncionales[];
	loading: boolean;
	error: Error | null;
}

export const PruebasContext = createContext<PruebasContextType | any>(undefined);

export const PruebasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [pruebasFuncionales, setPruebasFuncionales] = useState<PruebasFuncionales[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get('http://localhost:5000/pacientes');
				setPruebasFuncionales(data.data);
				setLoading(false);
			} catch {
				setError(error);
				setLoading(false);
			}
		};
		fetchData();
	}, [error]);


	return (
		<PruebasContext.Provider value={{ pruebasFuncionales, loading, error }}>
			{children}
		</PruebasContext.Provider>
	);
};
