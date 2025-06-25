'use client';

import { useEffect, useState } from 'react';

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.matchMedia('(max-width: 768px)').matches);
		};

		checkMobile();

		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return isMobile;
};
