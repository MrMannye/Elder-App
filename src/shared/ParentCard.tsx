'use client'
import React, { JSX } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';

type Props = {
	title: string;
	footer?: string | JSX.Element;
	codeModel?: any | any[];
	children: JSX.Element;
};

const ParentCard = ({ title, children, footer, codeModel }: Props) => {
	const customizer = useSelector((state: AppState) => state.customizer);

	const theme = useTheme();
	const borderColor = theme.palette.divider;

	return (
		<Card
			sx={{ padding: 0, border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none' }}
			elevation={customizer.isCardShadow ? 9 : 0}
			variant={!customizer.isCardShadow ? 'outlined' : undefined}
		>
			<CardHeader title={title} action={codeModel} />
			<CardContent sx={{ margin: 0, padding: 0 }}>{children}</CardContent>
			{footer ? (
				<>
					<Divider />
					<Box p={3}>{footer}</Box>
				</>
			) : (
				''
			)}
		</Card>
	);
};

export default ParentCard;
