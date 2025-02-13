/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DashboardCard from "../../shared/DashboardCard";
import { alpha } from "@mui/material/styles";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from "@mui/utils";
import { useDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/dashboard/DashboardSlice";
import { IconDotsVertical } from "@tabler/icons-react";
import { sub } from "date-fns";
import { Chance } from "chance";

const chance = new Chance();

export interface ProductType {
	cname: string;
	email: string;
	pname: string;
	pimg: string;
	rating: number;
	stock: boolean;
	photo: string;
	id: number | string;
	created: Date;
	description: string;
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}

	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}

		return a[1] - b[1];
	});

	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: string;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: "pname",
		numeric: false,
		disablePadding: false,
		label: "Products",
	},

	{
		id: "cname",
		numeric: false,
		disablePadding: false,
		label: "Customer",
	},

	{
		id: "description",
		numeric: false,
		disablePadding: false,
		label: "Reviews",
	},

	{
		id: "status",
		numeric: false,
		disablePadding: false,
		label: "Status",
	},

	{
		id: "created",
		numeric: false,
		disablePadding: false,
		label: "Date",
	},
	{
		id: "action",
		numeric: false,
		disablePadding: false,
		label: "Action",
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		order,
		orderBy,
		onRequestSort,
	} = props;
	const createSortHandler =
		(property: any) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							<Typography variant="h6">{headCell.label}</Typography>
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface EnhancedTableToolbarProps {
	numSelected: number;
	handleSearch: React.ChangeEvent<HTMLInputElement> | any;
	search: string;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const { numSelected, handleSearch, search } = props;

	return (
		(<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				borderRadius: 1,
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color="inherit"
					variant="subtitle2"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Box sx={{ flex: "1 1 100%" }}>
					<TextField
						placeholder="Search Product"
						size="small"
						onChange={handleSearch}
						value={search}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<Icon
											icon="solar:magnifer-linear"
											width="1.1rem"
											height="1.1rem"
										/>
									</InputAdornment>
								),
							}
						}}
					/>
				</Box>
			)}
			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<Icon
							icon="solar:trash-bin-minimalistic-outline"
							width="18"
							height="18"
						/>
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<Icon icon="solar:filter-linear" width="1.2rem" height="1.2rem" />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>)
	);
}

const LatestReviews = () => {
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<any>("id");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page] = React.useState(0);
	const [rowsPerPage] = React.useState(5);

	const dispatch = useDispatch();

	//Fetch Products
	React.useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const [rows, setRows] = React.useState<any>([
		{
			pimage: "/images/product-5.png",
			pname: "iPhone 13 pro max-Pacific Blue-128GB storage",
			cname: "Arlene McCoy",
			email: "macoy@arlene.com",
			rating: 3,
			stock: true,
			photo: "/images/user-1.jpg",
			id: 1,
			created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
			description: chance.paragraph({ sentences: 2 }),
		}]);
	const [search, setSearch] = React.useState("");


	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const filteredRows: ProductType[] = rows.filter((row: any) => {
			return row.pname.toLowerCase().includes(event.target.value);
		});
		setSearch(event.target.value);
		setRows(filteredRows);
	};

	// This is for the sorting
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: any
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// This is for select all the row
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n: any) => n.title);
			setSelected(newSelecteds);

			return;
		}
		setSelected([]);
	};

	// This is for the single row sleect
	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<DashboardCard
			title="Latest reviews"
			subtitle="Reviewd received across all channels"
			action={
				<EnhancedTableToolbar
					numSelected={selected.length}
					search={search}
					handleSearch={(event: any) => handleSearch(event)}
				/>
			}
		>
			<>
				<Box>
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
							size="medium"
						>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={rows.length}
							/>
							<TableBody>
								{stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row: any) => {
										const isItemSelected = isSelected(row.id);
										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, row.id)}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.id}
												selected={isItemSelected}
											>
												<TableCell>
													<Box display="flex" alignItems="center">
														<Avatar
															src={row.pimage}
															alt="product"
															sx={{ width: 60, height: 60 }}
														/>
														<Box
															sx={{
																ml: 2,
															}}
														>
															<Typography
																variant="h6"
																fontWeight="600"
																className="text-truncate-2"
															>
																{row.pname}
															</Typography>
														</Box>
													</Box>
												</TableCell>

												<TableCell>
													<Box display="flex" alignItems="center">
														<Avatar
															src={row.photo}
															alt="product"
															sx={{ width: 35, height: 35 }}
														/>
														<Box
															sx={{
																ml: 2,
															}}
														>
															<Typography variant="h6" fontWeight="600">
																{row.cname}
															</Typography>
															<Typography
																color="textSecondary"
																variant="subtitle2"
															>
																{row.email}
															</Typography>
														</Box>
													</Box>
												</TableCell>

												<TableCell>
													<Rating
														name="read-only"
														size="small"
														value={row.rating}
														readOnly
													/>
													<Typography
														fontWeight={500}
														variant="subtitle2"
														width="150px"
														className="text-truncate-2"
													>
														{row.description}
													</Typography>
												</TableCell>

												<TableCell>
													<Box display="flex" alignItems="center">
														<Box
															sx={{
																backgroundColor: row.stock
																	? (theme) => theme.palette.success.light
																	: (theme) => theme.palette.error.light,
																color: row.stock
																	? (theme) => theme.palette.success.main
																	: (theme) => theme.palette.error.main,
																p: "2px 7px",
																borderRadius: 2,
																border: "1px solid",
															}}
														>
															{" "}
															{row.stock ? "Confirmed" : "Pending"}
														</Box>
													</Box>
												</TableCell>

												<TableCell>
													<Typography fontWeight={500} variant="subtitle1">
														{format(new Date(row.created), "MMM d")}
													</Typography>
												</TableCell>
												<TableCell>
													<Tooltip title="Edit">
														<IconButton size="small">
															<IconDotsVertical size={18} />
														</IconButton>
													</Tooltip>
												</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height: 53 * emptyRows,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</>
		</DashboardCard>
	);
};


export default LatestReviews;