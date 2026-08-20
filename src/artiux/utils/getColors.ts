export type Color = 'primary' | 'warning' | 'destructive' | 'success' | 'info';

export const getColors = (color: Color) => {
	const colorMap = {
		primary: { background: 'primary', foreground: 'primary-foreground' },
		warning: { background: 'warning', foreground: 'white' },
		destructive: { background: 'destructive', foreground: 'white' },
		success: { background: 'success', foreground: 'white' },
		info: { background: 'info', foreground: 'info-foreground' },
	};

	return colorMap[color];
};
