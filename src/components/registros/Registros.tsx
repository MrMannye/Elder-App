/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useState } from "react";
import { InvoiceContext, Paciente } from "@/src/context/ContextRegistros";
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
	Chip,
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


function Registros() {
	const { pacientes } = useContext(InvoiceContext);
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
	const filteredPacientes = pacientes.filter(
		(pacient: Paciente) => {
			const isSearchTerm = pacient.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
			if (activeTab === "New") return isNewPatient(pacient.FechaRegistro) && isSearchTerm;
			if (activeTab === "Tercera Edad") return isOlderThan60(pacient.FechaNacimiento) >= 60 && isSearchTerm;
			return isSearchTerm;
		})

	function formatSpanishDate(isoDate: string) {
		const date = new Date(isoDate);
		// Meses en español
		const meses = [
			"enero", "febrero", "marzo", "abril", "mayo", "junio",
			"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
		];
		const dia = date.getDate(); // Obtener día
		const mes = meses[date.getMonth()]; // Obtener mes
		const anio = date.getFullYear(); // Obtener año
		return `${dia} de ${mes} del ${anio}`;
	}

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
	const NewPatient = pacientes.filter(
		(t: { FechaRegistro: string }) => isNewPatient(t.FechaRegistro)
	).length;
	const Old = pacientes.filter(
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
								<Typography>Nuevos Pacientes</Typography>
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
								<Typography>Pacientes 3.ª Edad</Typography>
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
									Fecha de Nacimiento
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6" fontSize="14px">
									Ocupacion
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h6" fontSize="14px">
									Telefono
								</Typography>
							</TableCell>
							<TableCell >
								<Typography variant="h6" fontSize="14px">
									Dominancia Mano
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredPacientes.map(
							(paciente: Paciente) => (
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
										<Typography fontSize="14px">{formatSpanishDate(paciente.FechaNacimiento)}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.Ocupacion}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.Telefono}</Typography>
									</TableCell>
									<TableCell>
										{paciente.DominanciaMano === "Diestro" ? (
											<Chip
												color="primary"
												label={paciente.DominanciaMano}
												size="small"
											/>
										) : paciente.DominanciaMano === "Zurdo" ? (
											<Chip
												color="success"
												label={paciente.DominanciaMano}
												size="small"
											/>
										) : paciente.DominanciaMano === "Ambidiestro" ? (
											<Chip
												color="warning"
												label={paciente.DominanciaMano}
												size="small"
											/>
										) : (
											""
										)}
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
export default Registros;
