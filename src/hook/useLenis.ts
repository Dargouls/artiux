'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

export function useLenis() {
	useEffect(() => {
		const lenis = new Lenis({ lerp: 0.1 });

		const raf = (time: number) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		requestAnimationFrame(raf);

		return () => lenis.destroy();
	}, []);
}
