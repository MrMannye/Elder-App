/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useState } from "react";
import { MedicionesContext, MedicionesPaciente } from "@/src/context/ContexMediciones";
import {
	Table,
	TextField,
	Button,
	Tooltip,
	IconButton,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Box,
	Typography,
	Grid2 as Grid, Stack,
	InputAdornment,
} from "@mui/material";
import Link from "next/link";
import {
	IconEdit,
	IconEye,
	IconListDetails,
	IconSearch,
	IconShoppingBag,
	IconTrash,
} from "@tabler/icons-react";


function Mediciones() {
	const { medicionesPaciente } = useContext(MedicionesContext);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("All");
	const [, setSelectedProducts] = useState<any>([]);
	const [selectAll] = useState(false);

	const tabItem = ['All', "New", "Tercera Edad"];
	const [, setCurrentIndex] = useState(0);


	// Handle status filter change
	const handleClick = (status: string) => {
		if (activeTab === status) {
			setCurrentIndex(0);
			setActiveTab("All");
		} else {
			const index = tabItem.findIndex((item) => item === status);
			setCurrentIndex(index);
			setActiveTab(status);
		}
	};

	// Filter invoices based on search term
	const filteredPacientes = medicionesPaciente.filter(
		(pacient: MedicionesPaciente) => {
			const isSearchTerm = pacient.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
			return isSearchTerm;
		})

	function isOlderThan60(date: string) {
		const birthDate = new Date(date);
		const today = new Date();
		const age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			return age - 1;
		}
		return age;
	}

	function isNewPatient(date: string) {
		const today = new Date();
		const currentDate = new Date(date);
		const diffTime = Math.abs(today.getTime() - currentDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays <= 7;
	}

	// Calculate the counts for different statuses
	const NewPatient = medicionesPaciente.filter(
		(t: { FechaRegistro: string }) => isNewPatient(t.FechaRegistro)
	).length;
	const Old = medicionesPaciente.filter(
		(t: { FechaNacimiento: string }) => isOlderThan60(t.FechaNacimiento) >= 60
	).length;


	return (
		(<Box>
			<Grid container spacing={3}>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						lg: 6
					}}>
					<Box bgcolor="primary.light" p={3} onClick={() => handleClick("New")} sx={{ cursor: "pointer", opacity: activeTab === 'New' ? 0.5 : 1 }}>
						<Stack direction="row" gap={2} alignItems="center">
							<Box
								width={38}
								height={38}
								bgcolor="primary.main"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<Typography
									color="primary.contrastText"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<IconListDetails width={22} />
								</Typography>
							</Box>
							<Box>
								<Typography>Mediciones Antropometricas</Typography>
								<Typography fontWeight={500}>
									{NewPatient} registros
								</Typography>
							</Box>
						</Stack>
					</Box>
				</Grid>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						lg: 6
					}}>
					<Box bgcolor="secondary.light" p={3} onClick={() => handleClick("Tercera Edad")} sx={{ cursor: "pointer", opacity: activeTab === 'Tercera Edad' ? 0.5 : 1 }}>
						<Stack direction="row" gap={2} alignItems="center">
							<Box
								width={38}
								height={38}
								bgcolor="secondary.main"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<Typography
									color="primary.contrastText"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<IconShoppingBag width={22} />
								</Typography>
							</Box>
							<Box>
								<Typography>Mediciones Fisiologicas</Typography>
								<Typography fontWeight={500}>{Old} registros</Typography>
							</Box>
						</Stack>
					</Box>
				</Grid>
			</Grid>
			<Stack
				mt={3}
				justifyContent="space-between"
				direction={{ xs: "column", sm: "row" }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
			>
				<TextField
					id="search"
					type="text"
					size="small"
					variant="outlined"
					placeholder="Search"
					value={searchTerm}
					onChange={(e: any) => setSearchTerm(e.target.value)}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconSearch size={"16"} />
								</InputAdornment>
							),
						}
					}}
				/>
				<Box display="flex" gap={1}>
					{selectAll && (
						<Button
							variant="outlined"
							color="error"
							startIcon={<IconTrash width={18} />}
						>
							Delete All
						</Button>
					)}
					<Button
						variant="contained"
						color="primary"
						component={Link}
						href="/apps/invoice/create"
					>
						New Invoice
					</Button>
				</Box>
			</Stack>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ whiteSpace: { xs: "nowrap", md: "unset" } }}>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography variant="h6" fontSize="14px">
									Id
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6" fontSize="14px">
									Nombre
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6" fontSize="14px">
									Peso
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6" fontSize="14px">
									Estatura
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6" fontSize="14px">
									Porcentaje Grasa
								</Typography>
							</TableCell>
							<TableCell >
								<Typography variant="h6" fontSize="14px">
									IMC
								</Typography>
							</TableCell>
							<TableCell >
								<Typography variant="h6" fontSize="14px">
									PMuneca
								</Typography>
							</TableCell>
							<TableCell >
								<Typography variant="h6" fontSize="14px">
									PAntebrazo
								</Typography>
							</TableCell>
							<TableCell >
								<Typography variant="h6" fontSize="14px">
									PAbdominal
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredPacientes.map(
							(paciente: MedicionesPaciente) => (
								<TableRow key={paciente.ID}>
									<TableCell>
										<Typography variant="h6" fontSize="14px">
											{paciente.ID}
										</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6" fontSize="14px">
											{paciente.Nombre}
										</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{(paciente.Peso)}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.Estatura}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.PorcentajeGrasa}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.IMC}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.PerimetroMuneca}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.PerimetroAntebrazo}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.PerimetroAbdominal}</Typography>
									</TableCell>
									<TableCell align="center">
										<Tooltip title="Edit Invoice">
											<IconButton
												color="success"
												component={Link}
												href={`/apps/invoice/edit/${paciente.ID}`}
											>
												<IconEdit width={22} />
											</IconButton>
										</Tooltip>
										<Tooltip title="View Invoice">
											<IconButton
												color="primary"
												component={Link}
												href={`/apps/invoice/detail/${paciente.ID}`}
											>
												<IconEye width={22} />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete Invoice">
											<IconButton
												color="error"
												onClick={() => {
													setSelectedProducts([paciente.ID]);
												}}
											>
												<IconTrash width={22} />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
			</Box>
		</Box >)
	);
}
export default Mediciones;
