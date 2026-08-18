'use client';

import { animate, stagger } from 'animejs';
import { useEffect, useRef, useState } from 'react';

const HOLD_DURATION = 1300;

interface PageLoaderProps {
	onFinish?: () => void;
}

const PageLoader = ({ onFinish }: PageLoaderProps) => {
	const [visible, setVisible] = useState(true);
	const overlayRef = useRef<HTMLDivElement>(null);
	const lettersRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		animate(lettersRef.current?.querySelectorAll('span') ?? [], {
			opacity: [0, 1],
			translateY: [20, 0],
			delay: stagger(40),
			duration: 600,
			easing: 'easeOutQuad',
		});

		const timer = setTimeout(() => {
			animate(overlayRef.current as HTMLDivElement, {
				translateY: ['0%', '-100%'],
				duration: 1000,
				easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
				onComplete: () => {
					document.body.style.overflow = '';
					setVisible(false);
					onFinish?.();
				},
			});
		}, HOLD_DURATION);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!visible) return null;

	return (
		<div ref={overlayRef} className='fixed inset-0 z-[100] flex items-center justify-center bg-black'>
			<h1 ref={lettersRef} className='flex text-5xl font-bold text-white sm:text-7xl'>
				{'ArtIux Lab'.split('').map((char, i) => (
					<span key={i} className='inline-block opacity-0'>
						{char === ' ' ? ' ' : char}
					</span>
				))}
			</h1>
		</div>
	);
};

export default PageLoader;
