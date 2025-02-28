/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useState } from "react";
import { PruebasContext, PruebasFuncionales } from "@/src/context/ContextPruebas";
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
	IconSortAscending,
	IconTrash,
	IconTruck,
} from "@tabler/icons-react";


function Pruebas() {
	const { pruebasFuncionales } = useContext(PruebasContext);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("All");
	const [, setSelectedProducts] = useState<any>([]);
	const [selectAll] = useState(false);

	const tabItem = ["All", "Diestro", "Zurdo", "Ambidiestro"];
	const [, setCurrentIndex] = useState(0);


	// Handle status filter change
	const handleClick = (status: string) => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % tabItem.length);
		setActiveTab(status);
	};

	// Filter invoices based on search term
	const filteredPacientes = pruebasFuncionales.filter(
		(pacient: PruebasFuncionales) => {
			return (
				(pacient.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
					pacient.Nombre.toLowerCase().includes(searchTerm.toLowerCase())) &&
				(activeTab === "All" || pacient.DominanciaMano === activeTab)
			);
		}
	);

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

	// Calculate the counts for different statuses
	const Shipped = pacientes.filter(
		(t: { DominanciaMano: string }) => t.DominanciaMano === "Diestro"
	).length;
	const Delivered = pacientes.filter(
		(t: { DominanciaMano: string }) => t.DominanciaMano === "Zurdo"
	).length;
	const Pending = pacientes.filter(
		(t: { DominanciaMano: string }) => t.DominanciaMano === "Ambidiestro"
	).length;


	return (
		(<Box>
			<Grid container spacing={3}>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						lg: 3
					}}>
					<Box bgcolor="primary.light" p={3} onClick={() => handleClick("All")} sx={{ cursor: "pointer" }}>
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
								<Typography>FRAIL</Typography>
								<Typography fontWeight={500}>
									{pruebasFuncionales.length} registros
								</Typography>
							</Box>
						</Stack>
					</Box>
				</Grid>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						lg: 3
					}}>
					<Box bgcolor="secondary.light" p={3} onClick={() => handleClick("Zurdo")} sx={{ cursor: "pointer" }}>
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
								<Typography>SARC</Typography>
								<Typography fontWeight={500}>{Shipped} registros</Typography>
							</Box>
						</Stack>
					</Box>
				</Grid>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						lg: 3
					}}>
					<Box bgcolor="success.light" p={3} onClick={() => handleClick("Diestro")} sx={{ cursor: "pointer" }}>
						<Stack direction="row" gap={2} alignItems="center">
							<Box
								width={38}
								height={38}
								bgcolor="success.main"
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
									<IconTruck width={22} />
								</Typography>
							</Box>
							<Box>
								<Typography>SF36</Typography>
								<Typography fontWeight={500}>{Delivered} registros</Typography>
							</Box>
						</Stack>
					</Box>
				</Grid>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						lg: 3
					}}>
					<Box bgcolor="warning.light" p={3} onClick={() => handleClick("Ambidiestro")} sx={{ cursor: "pointer" }}>
						<Stack direction="row" gap={2} alignItems="center">
							<Box
								width={38}
								height={38}
								bgcolor="warning.main"
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
									<IconSortAscending width={22} />
								</Typography>
							</Box>
							<Box>
								<Typography>FES1</Typography>
								<Typography fontWeight={500}>{Pending} registros</Typography>
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
									Fecha de Registro
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
							(paciente: PruebasFuncionales) => (
								<TableRow key={paciente.PacienteID}>
									<TableCell>
										<Typography variant="h6" fontSize="14px">
											{paciente.SARC_Puntuacion}
										</Typography>
									</TableCell>
									<TableCell>
										<Typography variant="h6" fontSize="14px">
											{paciente.FES1_RiesgoCaida}
										</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{paciente.SF36_SaludGeneral}</Typography>
									</TableCell>
									<TableCell>
										<Typography fontSize="14px">{formatSpanishDate(paciente.FechaRegistro)}</Typography>
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
export default Pruebas;
