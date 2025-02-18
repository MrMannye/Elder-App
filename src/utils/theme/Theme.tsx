import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import { useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { AppState } from '@/store/store';
import components from './Components';
import typography from './Typography';
import { shadows } from './Shadows';

import { LightThemeColors } from './LightThemeColors';
import { baselightTheme } from './DefaultColors';
import * as locales from '@mui/material/locale';

export const BuildTheme = (config: any = {}) => {
	const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
	const customizer = useSelector((state: AppState) => state.customizer);
	const defaultTheme = baselightTheme;
	const defaultShadow = shadows;
	const themeSelect = themeOptions;
	const baseMode = {
		palette: {
			mode: customizer.activeMode,
		},
		shape: {
			borderRadius: customizer.borderRadius,
		},
		shadows: defaultShadow,
		typography: typography,
	};
	const theme = createTheme(
		_.merge({}, baseMode, defaultTheme, locales, themeSelect, {
			direction: config.direction,
		}),
	);
	theme.components = components(theme);

	return theme;
};

const ThemeSettings = () => {
	const activDir = useSelector((state: AppState) => state.customizer.activeDir);
	const activeTheme = useSelector((state: AppState) => state.customizer.activeTheme);
	const theme = BuildTheme({
		direction: activDir,
		theme: activeTheme,
	});
	useEffect(() => {
		document.dir = activDir;
	}, [activDir]);

	return theme;
};


export { ThemeSettings };
