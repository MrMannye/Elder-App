import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from '@/store/hooks';
import { AppState } from '@/store/store';

const Languages = [
	{
		flagname: 'English (UK)',
		icon: "/images/flag/icon-flag-en.svg",
		value: 'en',
	},
	{
		flagname: '中国人 (Chinese)',
		icon: "/images/flag/icon-flag-cn.svg",
		value: 'ch',
	},
	{
		flagname: 'français (French)',
		icon: "/images/flag/icon-flag-fr.svg",
		value: 'fr',
	},

	{
		flagname: 'عربي (Arabic)',
		icon: "/images/flag/icon-flag-sa.svg",
		value: 'ar',
	},
];

const Language = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const dispatch = useDispatch();
	const open = Boolean(anchorEl);
	const customizer = useSelector((state: AppState) => state.customizer);
	const currentLang =
		Languages.find((_lang) => _lang.value === customizer.isLanguage) || Languages[1];
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				aria-label="more"
				id="long-button" className="btn-rounded-circle-40"
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true" color="inherit"
				onClick={handleClick}
				sx={{ p: 2, width: 40, borderRadius: 999 }}
			>
				<Avatar src={'/vercel.svg'} alt={currentLang.value} sx={{ width: 20, height: 20, filter: 'invert(100%)' }} />
			</Button>
		</>
	);
};

export default Language;
