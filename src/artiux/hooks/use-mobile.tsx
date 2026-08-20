'use client';

import { useEffect, useState } from 'react';

type breakpoints = '768' | '998' | '1440';
export const useIsMobile = (width: breakpoints = '768') => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.matchMedia(`(max-width:${width}px )`).matches);
		};

		checkMobile();

		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return isMobile;
};
